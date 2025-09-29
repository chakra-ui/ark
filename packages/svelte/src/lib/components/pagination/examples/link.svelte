<script lang="ts">
  import { Pagination, usePagination } from '@ark-ui/svelte/pagination'

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

<Pagination.RootProvider value={pagination}>
  <a {...pagination().getPrevTriggerProps()}>Previous</a>
  {#each pagination().pages as page, index (index)}
    {#if page.type === 'page'}
      <a {...pagination().getItemProps(page)}>{page.value}</a>
    {:else}
      <span {...pagination().getEllipsisProps({ index })}>&#8230;</span>
    {/if}
  {/each}
  <a {...pagination().getNextTriggerProps()}>Next</a>
</Pagination.RootProvider>
