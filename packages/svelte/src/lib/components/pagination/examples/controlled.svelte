<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'

  let page = $state(1)
</script>

<Pagination.Root count={5000} pageSize={10} siblingCount={2} bind:page>
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
