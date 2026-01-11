<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { Pagination } from '@ark-ui/vue/pagination'
import styles from 'styles/pagination.module.css'
</script>

<template>
  <Pagination.Root :count="100" :page-size="10" :class="styles.Root">
    <Pagination.Context v-slot="pagination">
      <div :class="styles.Controls">
        <button :class="styles.Trigger" @click="pagination.goToFirstPage()">
          <ChevronsLeft />
        </button>
        <button :class="styles.Trigger" @click="pagination.goToPrevPage()">
          <ChevronLeft />
        </button>
        <p :class="styles.Text" style="min-width: 120px; text-align: center">
          Page {{ pagination.page }} of {{ pagination.totalPages }}
        </p>
        <button :class="styles.Trigger" @click="pagination.goToNextPage()">
          <ChevronRight />
        </button>
        <button :class="styles.Trigger" @click="pagination.goToLastPage()">
          <ChevronsRight />
        </button>
      </div>
    </Pagination.Context>
  </Pagination.Root>
</template>
