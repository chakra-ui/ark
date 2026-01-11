<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { Pagination, usePagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'

  const id = $props.id()
  const pagination = usePagination({
    id,
    count: 5000,
    pageSize: 10,
    siblingCount: 2,
  })
</script>

<div class="stack">
  <button class={styles.Trigger} onclick={() => pagination().goToNextPage()}>Next Page</button>

  <Pagination.RootProvider value={pagination} class={styles.Root}>
    <div class={styles.Controls}>
      <Pagination.PrevTrigger class={styles.Trigger}>
        <ChevronLeft />
      </Pagination.PrevTrigger>

      {#each pagination().pages as page, index (index)}
        {#if page.type === 'page'}
          <Pagination.Item {...page} class={styles.Item}>
            {page.value}
          </Pagination.Item>
        {:else}
          <Pagination.Ellipsis {index} class={styles.Ellipsis}>&#8230;</Pagination.Ellipsis>
        {/if}
      {/each}

      <Pagination.NextTrigger class={styles.Trigger}>
        <ChevronRight />
      </Pagination.NextTrigger>
    </div>
  </Pagination.RootProvider>
</div>
