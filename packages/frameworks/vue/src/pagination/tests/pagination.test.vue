<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationNextTrigger,
  PaginationItem,
  PaginationPrevTrigger,
} from '../'
</script>
<template>
  <Pagination v-slot="{ pages }" :count="5000" :page-size="10" :sibling-count="2">
    <PaginationPrevTrigger>
      Previous <span className="visually-hidden">Page</span>
    </PaginationPrevTrigger>
    <template v-for="(page, index) in pages">
      <PaginationItem v-if="page.type === 'page'" :key="page" :value="page.value">
        {{ page.value }}
      </PaginationItem>
      <PaginationEllipsis v-else :key="index" :index="index"> &#8230; </PaginationEllipsis>
    </template>
    <PaginationNextTrigger>
      Next <span className="visually-hidden">Page</span>
    </PaginationNextTrigger>
  </Pagination>
</template>
