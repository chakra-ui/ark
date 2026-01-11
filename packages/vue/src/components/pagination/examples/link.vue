<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Pagination, usePagination } from '@ark-ui/vue/pagination'
import styles from 'styles/pagination.module.css'

const pagination = usePagination({
  type: 'link',
  count: 100,
  pageSize: 10,
  siblingCount: 2,
  getPageUrl: ({ page }) => `/page=${page}`,
})
</script>

<template>
  <Pagination.RootProvider :value="pagination" :class="styles.Root">
    <div :class="styles.Controls">
      <a :class="styles.Trigger" v-bind="pagination.getPrevTriggerProps()">
        <ChevronLeft />
      </a>
      <template v-for="(page, index) in pagination.pages" :key="index">
        <a v-if="page.type === 'page'" :class="styles.Item" v-bind="pagination.getItemProps(page)">
          {{ page.value }}
        </a>
        <span v-else :class="styles.Ellipsis" v-bind="pagination.getEllipsisProps({ index })">&#8230;</span>
      </template>
      <a :class="styles.Trigger" v-bind="pagination.getNextTriggerProps()">
        <ChevronRight />
      </a>
    </div>
  </Pagination.RootProvider>
</template>
