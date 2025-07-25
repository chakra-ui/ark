<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'
</script>

<Pagination.Root count={100} pageSize={10}>
  <Pagination.Context>
    {#snippet render(pagination)}
      <div>
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

        <div>
          <p>
            Showing {pagination().pageRange.start + 1}-{pagination().pageRange.end} of {pagination().count} results
          </p>
          <p>
            Page {pagination().page} of {pagination().totalPages}
          </p>
        </div>
      </div>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
