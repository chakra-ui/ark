<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Pagination } from '@ark-ui/vue/pagination'
import styles from 'styles/pagination.module.css'
</script>

<template>
  <Pagination.Root :count="100" :page-size="10" :class="styles.Root">
    <Pagination.Context v-slot="pagination">
      <div :class="styles.Controls">
        <Pagination.PrevTrigger :class="styles.Trigger">
          <ChevronLeft />
        </Pagination.PrevTrigger>

        <template v-for="(page, index) in pagination.pages" :key="index">
          <Pagination.Item v-if="page.type === 'page'" v-bind="page" :class="styles.Item">
            {{ page.value }}
          </Pagination.Item>
          <Pagination.Ellipsis v-else :index="index" :class="styles.Ellipsis">&#8230;</Pagination.Ellipsis>
        </template>

        <Pagination.NextTrigger :class="styles.Trigger">
          <ChevronRight />
        </Pagination.NextTrigger>
      </div>

      <div class="stack">
        <p :class="styles.Text">
          Showing {{ pagination.pageRange.start + 1 }}-{{ pagination.pageRange.end }} of {{ pagination.count }} results
        </p>
        <p :class="styles.Text">Page {{ pagination.page }} of {{ pagination.totalPages }}</p>
      </div>
    </Pagination.Context>
  </Pagination.Root>
</template>
