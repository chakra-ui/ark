<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { Pagination, usePagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'

  const id = $props.id()
  const pagination = usePagination({
    id,
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
    getPageUrl: ({ page }) => `/page=${page}`,
  })
</script>

<Pagination.RootProvider value={pagination} class={styles.Root}>
  <div class={styles.Controls}>
    <a class={styles.Trigger} {...pagination().getPrevTriggerProps()}>
      <ChevronLeft />
    </a>
    {#each pagination().pages as page, index (index)}
      {#if page.type === 'page'}
        <a class={styles.Item} {...pagination().getItemProps(page)}>{page.value}</a>
      {:else}
        <span class={styles.Ellipsis} {...pagination().getEllipsisProps({ index })}>&#8230;</span>
      {/if}
    {/each}
    <a class={styles.Trigger} {...pagination().getNextTriggerProps()}>
      <ChevronRight />
    </a>
  </div>
</Pagination.RootProvider>
