<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'
</script>

<Pagination.Root count={100} pageSize={10} page={2} type="link" getPageUrl={({ page }) => `/page/${page}`}>
  <Pagination.FirstTrigger>First</Pagination.FirstTrigger>
  <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
  <Pagination.Context>
    {#snippet render(pagination)}
      {#each pagination().pages as page, index (index)}
        {#if page.type === 'page'}
          <Pagination.Item {...page}>{page.value}</Pagination.Item>
        {:else}
          <Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
        {/if}
      {/each}
    {/snippet}
  </Pagination.Context>
  <Pagination.NextTrigger target="_blank" rel="noreferrer">Next</Pagination.NextTrigger>
  <Pagination.LastTrigger>Last</Pagination.LastTrigger>
</Pagination.Root>
