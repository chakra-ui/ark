<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Pagination } from '@ark-ui/vue/pagination'
import styles from 'styles/pagination.module.css'
</script>

<template>
  <Pagination.Root :count="100" :default-page-size="10" :class="styles.Root">
    <Pagination.Context v-slot="pagination">
      <div class="hstack">
        <label :class="styles.Text">Items per page:</label>
        <select
          :class="styles.PageSizeSelect"
          :value="pagination.pageSize"
          @change="(event) => pagination.setPageSize(Number((event.currentTarget as HTMLSelectElement).value))"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>

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

      <p :class="styles.Text">Page {{ pagination.page }} of {{ pagination.totalPages }}</p>
    </Pagination.Context>
  </Pagination.Root>
</template>
