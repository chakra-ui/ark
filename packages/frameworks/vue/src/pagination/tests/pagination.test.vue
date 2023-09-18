<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
} from '../'
</script>
<template>
  <Pagination v-slot="{ pages }" :count="5000" :page-size="10" :sibling-count="2">
    <PaginationList>
      <PaginationPrevPageTrigger>
        Previous <span className="visually-hidden">Page</span>
      </PaginationPrevPageTrigger>
      <template v-for="(page, index) in pages">
        <PaginationPageTrigger v-if="page.type === 'page'" :key="page" :value="page.value">
          {{ page.value }}
        </PaginationPageTrigger>
        <PaginationEllipsis v-else :key="index" :index="index"> &#8230; </PaginationEllipsis>
      </template>
      <PaginationListItem>
        <PaginationNextPageTrigger>
          Next <span className="visually-hidden">Page</span>
        </PaginationNextPageTrigger>
      </PaginationListItem>
    </PaginationList>
  </Pagination>
</template>
