<script setup lang="ts">
import { ref } from 'vue'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
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
      <PaginationListItem>
        <PaginationPrevPageTrigger>
          Previous <span className="visually-hidden">Page</span>
        </PaginationPrevPageTrigger>
      </PaginationListItem>

      <!-- eslint-disable-next-line vue/no-v-for-template-key -->
      <template v-for="(page, index) in paginationRef?.context.pages" :key="index">
        <PaginationListItem>
          <PaginationPageTrigger v-if="page.type === 'page'" :value="page.value" :type="page.type">
            {{ page.value }}
          </PaginationPageTrigger>
          <PaginationEllipsis v-else :index="index"> &#8230; </PaginationEllipsis>
        </PaginationListItem>
      </template>
      <PaginationListItem>
        <PaginationNextPageTrigger>
          Next <span className="visually-hidden">Page</span>
        </PaginationNextPageTrigger>
      </PaginationListItem>
    </PaginationList>
  </Pagination>
</template>
