<script setup lang="ts">
import { Pagination } from '@ark-ui/vue/pagination'
</script>

<template>
  <Pagination.Root :count="100" :defaultPageSize="10">
    <Pagination.Context v-slot="pagination">
      <div>
        <div>
          <label>Items per page:</label>
          <select
            :value="pagination.pageSize"
            @change="(event) => pagination.setPageSize(Number((event.currentTarget as HTMLSelectElement).value))"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>

        <div>
          <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>

          <template v-for="(page, index) in pagination.pages" :key="index">
            <Pagination.Item v-if="page.type === 'page'" :value="page.value" :type="page.type">
              {{ page.value }}
            </Pagination.Item>
            <Pagination.Ellipsis v-else :index="index">&#8230;</Pagination.Ellipsis>
          </template>

          <Pagination.NextTrigger>Next</Pagination.NextTrigger>
        </div>

        <p>Page {{ pagination.page }} of {{ pagination.totalPages }}</p>
      </div>
    </Pagination.Context>
  </Pagination.Root>
</template>
