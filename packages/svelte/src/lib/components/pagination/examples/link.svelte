<script lang="ts">
  import { Pagination, usePagination } from '@ark-ui/svelte/pagination'

  const id = $props.id()
  const pagination = usePagination({
    id,
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
  })

  const getHref = (page: number | null) => (page != null ? `/page=${page}` : '/')
</script>

<Pagination.RootProvider value={pagination}>
  <a {...pagination().getPrevTriggerProps()} href={getHref(pagination().previousPage)}>Previous</a>
  {#each pagination().pages as page, index (index)}
    {#if page.type === 'page'}
      <a {...pagination().getItemProps(page)} href={getHref(page.value)}>
        {page.value}
      </a>
    {:else}
      <span {...pagination().getEllipsisProps({ index })}>&#8230;</span>
    {/if}
  {/each}
  <a {...pagination().getNextTriggerProps()} href={getHref(pagination().nextPage)}>Next</a>
</Pagination.RootProvider>
