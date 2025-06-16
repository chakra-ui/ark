<script lang="ts">
  import { Pagination, usePagination } from '@ark-ui/svelte/pagination'

  const id = $props.id()
  const pagination = usePagination({
    id,
    count: 5000,
    pageSize: 10,
    siblingCount: 2,
  })
</script>

<button onclick={() => pagination().goToNextPage()}>Next Page</button>

<Pagination.RootProvider value={pagination}>
  <Pagination.PrevTrigger>Previous Page</Pagination.PrevTrigger>

  {#each pagination().pages as page, index (index)}
    {#if page.type === 'page'}
      <Pagination.Item {...page}>
        {page.value}
      </Pagination.Item>
    {:else}
      <Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
    {/if}
  {/each}

  <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
</Pagination.RootProvider>
