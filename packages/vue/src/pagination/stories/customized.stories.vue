<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
  type PaginationContext,
} from '../'

import '../pagination.css'
</script>
<template>
  <Pagination
    v-slot="{ pages }: PaginationContext"
    :count="5000"
    :page-size="10"
    :sibling-count="3"
    dir="ltr"
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
