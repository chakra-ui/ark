<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { Pagination } from '@ark-ui/vue/pagination'
import styles from 'styles/pagination.module.css'
</script>

<template>
  <Pagination.Root :count="5000" :page-size="20" :sibling-count="2" :class="styles.Root">
    <div :class="styles.Controls">
      <Pagination.FirstTrigger :class="styles.Trigger">
        <ChevronsLeft />
      </Pagination.FirstTrigger>

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

      <Pagination.LastTrigger :class="styles.Trigger">
        <ChevronsRight />
      </Pagination.LastTrigger>
    </div>
  </Pagination.Root>
</template>
