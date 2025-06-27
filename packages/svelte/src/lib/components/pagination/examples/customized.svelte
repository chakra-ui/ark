<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'
</script>

<Pagination.Root
  count={5000}
  pageSize={20}
  siblingCount={3}
  translations={{
    nextTriggerLabel: 'Next',
    prevTriggerLabel: 'Prev',
    itemLabel: (details) => `Page ${details.page}`,
  }}
>
  <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>
  <Pagination.Context>
    {#snippet render(pagination)}
      {#each pagination().pages as page, index (index)}
        {#if page.type === 'page'}
          <Pagination.Item {...page}>
            {page.value}
          </Pagination.Item>
        {:else}
          <Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
        {/if}
      {/each}
    {/snippet}
  </Pagination.Context>
  <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
</Pagination.Root>
