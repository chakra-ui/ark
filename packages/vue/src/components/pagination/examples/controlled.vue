<script setup lang="ts">
import { Pagination } from '@ark-ui/vue/pagination'
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
  <Pagination.Root :count="5000" :page-size="10" :sibling-count="2" v-model:page="currentPage">
    <Pagination.PrevTrigger>Previous Page</Pagination.PrevTrigger>
    <Pagination.Context v-slot="api">
      <template v-for="(page, index) in api.pages" :key="index">
        <Pagination.Item v-if="page.type === 'page'" v-bind="page">
          {{ page.value }}
        </Pagination.Item>
        <Pagination.Ellipsis v-else :index="index">&#8230;</Pagination.Ellipsis>
      </template>
    </Pagination.Context>
    <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
  </Pagination.Root>
</template>
