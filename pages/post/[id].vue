<template>
	<h1>{{post.title}}</h1>
	<div v-html="post.content"></div>

    <div v-if="post.github_link" class="mt-8">
        <CommonGithub :githubUrl="post.github_link" />
    </div>
</template>

<script setup>
const { $directus, $readItem } = useNuxtApp()
const route = useRoute()

const { data: post } = await useAsyncData('post', () => {
  return $directus.request(
    $readItem('posts', route.params.id, {
      fields: ['*', { '*': ['*'] }]
    })
  )
})
</script>