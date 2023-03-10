<script setup lang="ts">
import { ref } from 'vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
} from './'
import './pagination.css'
import type { UsePaginationReturn } from './use-pagination'

const paginationRef = ref<{ context: UsePaginationReturn }>()
</script>
<template>
  <Pagination ref="paginationRef" :count="5000" :page-size="10" :sibling-count="2">
    <PaginationList>
      <PaginationPrevPageTrigger>
        <button>Previous <span className="visually-hidden">Page</span></button>
      </PaginationPrevPageTrigger>
      <template v-for="(page, index) in paginationRef?.context.pages">
        <PaginationPageTrigger v-if="page.type === 'page'" :value="page.value">
          <button>{{ page.value }}</button>
        </PaginationPageTrigger>
        <PaginationEllipsis v-else :index="index"> &#8230; </PaginationEllipsis>
      </template>
      <PaginationNextPageTrigger>
        <button>Next <span className="visually-hidden">Page</span></button>
      </PaginationNextPageTrigger>
    </PaginationList>
  </Pagination>
</template>
