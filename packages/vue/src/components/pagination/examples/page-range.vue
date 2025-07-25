<script setup lang="ts">
import { Pagination } from '@ark-ui/vue/pagination'
</script>

<template>
  <Pagination.Root :count="100" :pageSize="10">
    <Pagination.Context v-slot="pagination">
      <div>
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

        <div>
          <p>
            Showing {{ pagination.pageRange.start + 1 }}-{{ pagination.pageRange.end }} of
            {{ pagination.count }} results
          </p>
          <p>Page {{ pagination.page }} of {{ pagination.totalPages }}</p>
        </div>
      </div>
    </Pagination.Context>
  </Pagination.Root>
</template>
