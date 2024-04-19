<script setup lang="ts">
import {
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '..'
</script>
<template>
  <PaginationRoot :count="100" :page-size="10" :sibling-count="2">
    <PaginationPrevTrigger>
      Previous <span className="visually-hidden">Page</span>
    </PaginationPrevTrigger>
    <PaginationContext v-slot="pagination">

    <template v-for="(page, index) in pagination.pages">
      <PaginationItem v-if="page.type === 'page'" :key="index" :value="page.value" :type="page.type">
        {{ page.value }}
      </PaginationItem>
      <PaginationEllipsis v-else :key="'e' + index" :index="index"> &#8230; </PaginationEllipsis>
    </template>
    </PaginationContext>
    <PaginationNextTrigger>
      Next <span className="visually-hidden">Page</span>
    </PaginationNextTrigger>
  </PaginationRoot>
</template>
