<script setup lang="ts">
import { Pagination } from '@ark-ui/vue/pagination'

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <Pagination.Root :count="items.length" :pageSize="10">
    <Pagination.Context v-slot="pagination">
      <div>
        <div>
          <h3>Current Page Items:</h3>
          <ul>
            <li v-for="item in pagination.slice(items)" :key="item">{{ item }}</li>
          </ul>
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
      </div>
    </Pagination.Context>
  </Pagination.Root>
</template>
