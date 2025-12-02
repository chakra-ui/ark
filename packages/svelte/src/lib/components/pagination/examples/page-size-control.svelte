<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'
</script>

<Pagination.Root count={100} defaultPageSize={10}>
  <Pagination.Context>
    {#snippet render(pagination)}
      <div>
        <div>
          <label for="page-size">Items per page:</label>
          <select
            id="page-size"
            value={pagination().pageSize}
            onchange={(e) => pagination().setPageSize(Number(e.currentTarget.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
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

        <p>
          Page {pagination().page} of {pagination().totalPages}
        </p>
      </div>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
