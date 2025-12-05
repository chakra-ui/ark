<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { Pagination } from '@ark-ui/vue/pagination'
</script>

<template>
  <Pagination.Root :count="5000" :page-size="20" :sibling-count="2">
    <Pagination.FirstTrigger>
      <ChevronsLeft />
    </Pagination.FirstTrigger>

    <Pagination.PrevTrigger>
      <ChevronLeft />
    </Pagination.PrevTrigger>

    <Pagination.Context v-slot="pagination">
      <template v-for="(page, index) in pagination.pages" :key="index">
        <Pagination.Item v-if="page.type === 'page'" v-bind="page">
          {{ page.value }}
        </Pagination.Item>
        <Pagination.Ellipsis v-else :index="index">&#8230;</Pagination.Ellipsis>
      </template>
    </Pagination.Context>

    <Pagination.NextTrigger>
      <ChevronRight />
    </Pagination.NextTrigger>

    <Pagination.LastTrigger>
      <ChevronsRight />
    </Pagination.LastTrigger>
  </Pagination.Root>
</template>
