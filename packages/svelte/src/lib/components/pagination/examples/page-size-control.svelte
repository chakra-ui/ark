<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { Pagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'
</script>

<Pagination.Root count={100} defaultPageSize={10} class={styles.Root}>
  <Pagination.Context>
    {#snippet render(pagination)}
      <div class="hstack">
        <label for="page-size" class={styles.Text}>Items per page:</label>
        <select
          id="page-size"
          class={styles.PageSizeSelect}
          value={pagination().pageSize}
          onchange={(e) => pagination().setPageSize(Number(e.currentTarget.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div class={styles.Controls}>
        <Pagination.PrevTrigger class={styles.Trigger}>
          <ChevronLeft />
        </Pagination.PrevTrigger>

        {#each pagination().pages as page, index}
          {#if page.type === 'page'}
            <Pagination.Item {...page} class={styles.Item}>{page.value}</Pagination.Item>
          {:else}
            <Pagination.Ellipsis {index} class={styles.Ellipsis}>&#8230;</Pagination.Ellipsis>
          {/if}
        {/each}

        <Pagination.NextTrigger class={styles.Trigger}>
          <ChevronRight />
        </Pagination.NextTrigger>
      </div>

      <p class={styles.Text}>
        Page {pagination().page} of {pagination().totalPages}
      </p>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
