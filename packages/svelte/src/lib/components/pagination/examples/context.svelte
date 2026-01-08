<script lang="ts">
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-svelte'
  import { Pagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'
</script>

<Pagination.Root count={100} pageSize={10} class={styles.Root}>
  <Pagination.Context>
    {#snippet render(pagination)}
      <div class={styles.Controls}>
        <button class={styles.Trigger} onclick={() => pagination().goToFirstPage()}>
          <ChevronsLeft />
        </button>
        <button class={styles.Trigger} onclick={() => pagination().goToPrevPage()}>
          <ChevronLeft />
        </button>
        <p class={styles.Text} style="min-width: 120px; text-align: center;">
          Page {pagination().page} of {pagination().totalPages}
        </p>
        <button class={styles.Trigger} onclick={() => pagination().goToNextPage()}>
          <ChevronRight />
        </button>
        <button class={styles.Trigger} onclick={() => pagination().goToLastPage()}>
          <ChevronsRight />
        </button>
      </div>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
