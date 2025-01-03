<script setup lang="ts">
const props = defineProps<{
    githubUrl: string;
}>();

const { projectInfo, error, fetchProjectInfo } = useGitHubCard(props.githubUrl);

fetchProjectInfo();
</script>

<template>
    <div v-if="projectInfo">
        <div
            class="flex flex-col overflow-hidden bg-zinc-900 relative w-full justify-center rounded-lg">
            <div class="p-6 flex flex-col justify-between h-full">
                <div class="flex justify-between items-center gap-6 h-full mb-2">
                    <div class="flex flex-col gap-2">
                        <a href="https://github.com/withastro/roadmap" rel="noopener noreferrer" target="_blank"
                            class="flex gap-1 text-xl flex-wrap leading-none font-bold">
                            <span class="text-zinc-500">{{ projectInfo.owner }}</span>
                            <span class="text-zinc-500">/</span>
                            <span class="text-orange-500">{{ projectInfo.repo }}</span>
                        </a>
                        <a href="https://github.com/withastro/roadmap/pull/1035" rel="noopener noreferrer"
                            target="_blank" class="text-base text-zinc-500">
                            <span class="mr-2">PR #{{ projectInfo.prNumber }}</span>
                            <span class="leading-tight">{{ projectInfo.title }}</span>
                        </a>
                    </div>
                </div>
                <div class="flex justify-between mt-4">
                    <div class="flex gap-2.5 items-center">
                        <div>
                            <img class="w-6 h-6 rounded-full" :src="projectInfo.projectAvatarUrl">
                        </div>
                        <span class="text-base text-zinc-500">@{{ projectInfo.projectAuthor }}</span>
                    </div>
                </div>                
            </div>

            <UIcon name="ri:github-fill" class="text-[10em] text-zinc-500 absolute -top-10 -right-10" />
        </div>
    </div>
    <div v-if="error">
        <p>Error: {{ error }}</p>
    </div>
</template>
