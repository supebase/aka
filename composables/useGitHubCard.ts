interface GitHubProjectInfo {
  owner: string;
  repo: string;
  title: string;
  prNumber: number;
  stage: string;
  description: string;
  prAuthor: string; // PR 的作者
  avatarUrl: string; // PR 作者的头像
  projectAuthor: string; // 仓库的作者
  projectAvatarUrl: string; // 仓库作者的头像
}

export function useGitHubCard(githubUrl: string) {
  const projectInfo = ref<GitHubProjectInfo | null>(null);
  const error = ref<string | null>(null);

  const fetchProjectInfo = async () => {
    try {
      const urlParts = githubUrl.replace('https://github.com/', '').split('/');
      if (urlParts.length < 2) {
        throw new Error('Invalid GitHub URL');
      }

      const [owner, repo] = urlParts;

      // 获取 Pull Request 数据
      const { data: pullData, error: pullError } = await useAsyncData(() =>
        fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`).then((res) => res.json())
      );

      if (pullError.value) {
        throw new Error(pullError.value.message);
      }

      const pullRequest = pullData.value[0]; // 最新的 PR 数据

      // 获取仓库信息
      const { data: repoData, error: repoError } = await useAsyncData(() =>
        fetch(`https://api.github.com/repos/${owner}/${repo}`).then((res) => res.json())
      );

      if (repoError.value) {
        throw new Error(repoError.value.message);
      }

      projectInfo.value = {
        owner,
        repo,
        title: pullRequest.title,
        prNumber: pullRequest.number,
        stage: pullRequest.labels.find((label: any) => label.name.includes('RFC'))?.name || 'N/A',
        description: pullRequest.body,
        prAuthor: pullRequest.user.login,
        avatarUrl: pullRequest.user.avatar_url,
        projectAuthor: repoData.value.owner.login,
        projectAvatarUrl: repoData.value.owner.avatar_url,
      };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    }
  };

  return {
    projectInfo,
    error,
    fetchProjectInfo,
  };
}
