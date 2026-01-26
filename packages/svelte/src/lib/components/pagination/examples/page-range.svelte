<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { Pagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'
</script>

<Pagination.Root count={100} pageSize={10} class={styles.Root}>
  <Pagination.Context>
    {#snippet render(pagination)}
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

      <div class="stack">
        <p class={styles.Text}>
          Showing {pagination().pageRange.start + 1}-{pagination().pageRange.end} of {pagination().count} results
        </p>
        <p class={styles.Text}>
          Page {pagination().page} of {pagination().totalPages}
        </p>
      </div>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
