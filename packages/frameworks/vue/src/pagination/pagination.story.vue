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
  <Story>
    <Variant title="Basic">
      <Pagination v-slot="{ pages }" :count="5000" :page-size="10" :sibling-count="2">
        <PaginationList>
          <PaginationPrevPageTrigger>Previous Page</PaginationPrevPageTrigger>
          <template v-for="(page, index) in pages">
            <PaginationPageTrigger v-if="page.type === 'page'" :key="page" :value="page.value">
              {{ page.value }}
            </PaginationPageTrigger>
            <PaginationEllipsis v-else :key="index" :index="index"> &#8230; </PaginationEllipsis>
          </template>
          <PaginationListItem>
            <PaginationNextPageTrigger>Next Page</PaginationNextPageTrigger>
          </PaginationListItem>
        </PaginationList>
      </Pagination>
    </Variant>
  </Story>
</template>
