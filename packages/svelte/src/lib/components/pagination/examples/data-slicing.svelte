<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'

  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)
</script>

<Pagination.Root count={items.length} pageSize={10}>
  <Pagination.Context>
    {#snippet render(pagination)}
      <div>
        <div>
          <h3>Current Page Items:</h3>
          <ul>
            {#each pagination().slice(items) as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>

        <div>
          <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>

          {#each pagination().pages as page, index}
            {#if page.type === 'page'}
              <Pagination.Item {...page}>{page.value}</Pagination.Item>
            {:else}
              <Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
            {/if}
          {/each}

          <Pagination.NextTrigger>Next</Pagination.NextTrigger>
        </div>
      </div>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
