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
  type PaginationContext,
  type PaginationProps,
} from '../'

import '../pagination.css'

const currentPage = ref<PaginationProps['modelValue']>(1)
</script>
<template>
  <div>Currently Selected Page: {{ currentPage }}</div>
  <Pagination
    v-slot="{ pages }: PaginationContext"
    :count="5000"
    :page-size="10"
    :sibling-count="2"
    v-model="currentPage"
  >
    <PaginationList>
      <PaginationPrevPageTrigger>
        Previous <span className="visually-hidden">Page</span>
      </PaginationPrevPageTrigger>
      <template v-for="(page, index) in pages">
        <PaginationPageTrigger v-if="page.type === 'page'" :value="page.value">
          {{ page.value }}
        </PaginationPageTrigger>
        <PaginationEllipsis v-else :index="index"> &#8230; </PaginationEllipsis>
      </template>
      <PaginationListItem>
        <PaginationNextPageTrigger>
          Next <span className="visually-hidden">Page</span>
        </PaginationNextPageTrigger>
      </PaginationListItem>
    </PaginationList>
  </Pagination>
</template>
