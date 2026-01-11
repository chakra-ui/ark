<script lang="ts">
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-svelte'
  import { Pagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'
</script>

<Pagination.Root count={5000} pageSize={20} siblingCount={2} class={styles.Root}>
  <div class={styles.Controls}>
    <Pagination.FirstTrigger class={styles.Trigger}>
      <ChevronsLeft />
    </Pagination.FirstTrigger>

    <Pagination.PrevTrigger class={styles.Trigger}>
      <ChevronLeft />
    </Pagination.PrevTrigger>

    <Pagination.Context>
      {#snippet render(pagination)}
        {#each pagination().pages as page, index (index)}
          {#if page.type === 'page'}
            <Pagination.Item {...page} class={styles.Item}>
              {page.value}
            </Pagination.Item>
          {:else}
            <Pagination.Ellipsis {index} class={styles.Ellipsis}>&#8230;</Pagination.Ellipsis>
          {/if}
        {/each}
      {/snippet}
    </Pagination.Context>

    <Pagination.NextTrigger class={styles.Trigger}>
      <ChevronRight />
    </Pagination.NextTrigger>

    <Pagination.LastTrigger class={styles.Trigger}>
      <ChevronsRight />
    </Pagination.LastTrigger>
  </div>
</Pagination.Root>
