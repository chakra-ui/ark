<script setup lang="ts">
import { Pagination, usePagination } from '@ark-ui/vue/pagination'

const pagination = usePagination({
  type: 'link',
  count: 100,
  pageSize: 10,
  siblingCount: 2,
  getPageUrl: ({ page }) => `/page=${page}`,
})
</script>

<template>
  <Pagination.RootProvider :value="pagination">
    <a v-bind="pagination.getPrevTriggerProps()">Previous</a>
    <template v-for="(page, index) in pagination.pages" :key="index">
      <a v-if="page.type === 'page'" v-bind="pagination.getItemProps(page)">
        {{ page.value }}
      </a>
      <span v-else v-bind="pagination.getEllipsisProps({ index })">&#8230;</span>
    </template>
    <a v-bind="pagination.getNextTriggerProps()">Next</a>
  </Pagination.RootProvider>
</template>
