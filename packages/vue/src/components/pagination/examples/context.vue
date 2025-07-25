<script setup lang="ts">
import { Pagination } from '@ark-ui/vue/pagination'
</script>

<template>
  <Pagination.Root :count="100" :pageSize="10">
    <Pagination.Context v-slot="pagination">
      <div>
        <button @click="pagination.goToFirstPage()">First</button>
        <button @click="pagination.goToPrevPage()">Previous</button>
        <button @click="pagination.setPage(5)">Go to Page 5</button>
        <button @click="pagination.goToNextPage()">Next</button>
        <button @click="pagination.goToLastPage()">Last</button>

        <p>Page {{ pagination.page }} of {{ pagination.totalPages }}</p>
        <p>Items {{ pagination.pageRange.start + 1 }}-{{ pagination.pageRange.end }}</p>

        <button @click="pagination.setPageSize(20)">20 per page</button>
      </div>
    </Pagination.Context>
  </Pagination.Root>
</template>
