<script setup lang="ts">
import { Pagination, usePagination } from '@ark-ui/vue/pagination'

const pagination = usePagination({
  type: 'link',
  count: 100,
  pageSize: 10,
  siblingCount: 2,
})

const getHref = (page: number | null) => (page != null ? `/page=${page}` : '/')
</script>

<template>
  <Pagination.RootProvider :value="pagination">
    <a v-bind="pagination.getPrevTriggerProps()" :href="getHref(pagination.previousPage)">Previous</a>
    <template v-for="(page, index) in pagination.pages" :key="index">
      <a v-if="page.type === 'page'" v-bind="pagination.getItemProps(page)" :href="getHref(page.value)">
        {{ page.value }}
      </a>
      <span v-else v-bind="pagination.getEllipsisProps({ index })">&#8230;</span>
    </template>
    <a v-bind="pagination.getNextTriggerProps()" :href="getHref(pagination.nextPage)">Next</a>
  </Pagination.RootProvider>
</template>
