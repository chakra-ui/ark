<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Pagination, usePagination } from '@ark-ui/vue/pagination'
import styles from 'styles/pagination.module.css'

const pagination = usePagination({ count: 5000, pageSize: 10, siblingCount: 2 })
</script>

<template>
  <div class="stack">
    <button :class="styles.Trigger" @click="pagination.goToNextPage()">Next Page</button>

    <Pagination.RootProvider :value="pagination" :class="styles.Root">
      <div :class="styles.Controls">
        <Pagination.PrevTrigger :class="styles.Trigger">
          <ChevronLeft />
        </Pagination.PrevTrigger>
        <Pagination.Context v-slot="pagination">
          <template v-for="(page, index) in pagination.pages" :key="index">
            <Pagination.Item v-if="page.type === 'page'" v-bind="page" :class="styles.Item">
              {{ page.value }}
            </Pagination.Item>
            <Pagination.Ellipsis v-else :index="index" :class="styles.Ellipsis">&#8230;</Pagination.Ellipsis>
          </template>
        </Pagination.Context>
        <Pagination.NextTrigger :class="styles.Trigger">
          <ChevronRight />
        </Pagination.NextTrigger>
      </div>
    </Pagination.RootProvider>
  </div>
</template>
