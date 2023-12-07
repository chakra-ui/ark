<script setup lang="ts">
import { Pagination } from '../'
</script>
<template>
  <Pagination.Root v-slot="{ pages }" :count="100" :page-size="10" :sibling-count="2">
    <Pagination.PrevTrigger>
      Previous <span className="visually-hidden">Page</span>
    </Pagination.PrevTrigger>
    <template v-for="(page, index) in pages">
      <Pagination.Item v-if="page.type === 'page'" :key="page" :value="page.value">
        {{ page.value }}
      </Pagination.Item>
      <Pagination.Ellipsis v-else :key="index" :index="index"> &#8230; </Pagination.Ellipsis>
    </template>
    <Pagination.NextTrigger>
      Next <span className="visually-hidden">Page</span>
    </Pagination.NextTrigger>
  </Pagination.Root>
</template>
