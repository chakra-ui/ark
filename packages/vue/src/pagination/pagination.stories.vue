<script setup lang="ts">
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
</script>
<template>
  <Pagination v-slot="{ pages }" :count="5000" :page-size="10" :sibling-count="2">
    <PaginationList>
      <PaginationPrevPageTrigger>
        <button>Previous <span className="visually-hidden">Page</span></button>
      </PaginationPrevPageTrigger>
      <template v-for="(page, index) in pages">
        <PaginationPageTrigger v-if="page.type === 'page'" :value="page.value">
          <button>{{ page.value }}</button>
        </PaginationPageTrigger>
        <PaginationEllipsis v-else :index=" index "> &#8230; </PaginationEllipsis>
      </template>
      <PaginationListItem>
        <PaginationNextPageTrigger>
          Next <span className="visually-hidden">Page</span>
        </PaginationNextPageTrigger>
      </PaginationListItem>
    </PaginationList>
  </Pagination>
</template>
