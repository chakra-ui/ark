<script setup lang="ts">
import { Pagination, usePagination } from '@ark-ui/vue/pagination'

const pagination = usePagination({ count: 100, pageSize: 10, siblingCount: 2 })
</script>

<template>
  <button @click="pagination.goToNextPage()">Next Page</button>

  <Pagination.RootProvider :value="pagination">
    <Pagination.PrevTrigger>
      Previous
      <span className="visually-hidden">Page</span>
    </Pagination.PrevTrigger>
    <Pagination.Context v-slot="pagination">
      <template v-for="(page, index) in pagination.pages">
        <Pagination.Item
          v-if="page.type === 'page'"
          :key="index"
          :value="page.value"
          :type="page.type"
        >
          {{ page.value }}
        </Pagination.Item>
        <Pagination.Ellipsis v-else :key="'e' + index" :index="index">&#8230;</Pagination.Ellipsis>
      </template>
    </Pagination.Context>
    <Pagination.NextTrigger>
      Next
      <span className="visually-hidden">Page</span>
    </Pagination.NextTrigger>
  </Pagination.RootProvider>
</template>
