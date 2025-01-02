<template>
  <div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="status === 'error'">Error: {{ error?.statusCode }}</div>
    <div v-else class="space-y-20">
      <div v-for="({ year, posts }, index) in sortedGroupedPosts" :key="index" class="relative">
        <div class="text-9xl text-transparent text-stroke absolute -top-16 -left-10 -z-10 select-none pointer-events-none opacity-5">{{ year }}</div>
        <div v-for="post in posts" :key="post.id" class="py-2">
          <div class="text-lg text-zinc-200 font-medium">{{ post.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $directus, $readItems } = useNuxtApp();

const { data: posts, status, error } = await useAsyncData('posts', () => {
  return $directus.request(
    $readItems('posts', {
      fields: ['*.*'],
      sort: '-date_created',
    })
  )
})

// 按年份分组帖子
const groupedPosts = computed(() => {
  if (!posts.value) return {}
  return posts.value.reduce((acc, post) => {
    const year = new Date(post.date_created).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
})

// 对分组后的帖子按年份排序并转换为数组
const sortedGroupedPosts = computed(() => {
  if (!groupedPosts.value) return []

  // 获取年份并按降序排列
  const sortedYears = Object.keys(groupedPosts.value).sort((a, b) =>
    Number(b) - Number(a)
  )

  // 构建排序后的数组
  return sortedYears.map(year => ({
    year: Number(year), // 确保年份是数字类型
    posts: groupedPosts.value[year],
  }))
})
</script>