<script setup lang="ts">
import { Pagination } from '../..'
</script>

<template>
  <Pagination.Root v-slot="{ pages }" :count="5000" :page-size="10" :sibling-count="2">
    <Pagination.PrevTrigger>Previous Page</Pagination.PrevTrigger>
    <template v-for="(page, index) in pages">
      <Pagination.Item v-if="page.type === 'page'" :key="page" :value="page.value">
        {{ page.value }}
      </Pagination.Item>
      <Pagination.Ellipsis v-else :key="index" :index="index"> &#8230; </Pagination.Ellipsis>
    </template>
    <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
  </Pagination.Root>
</template>
