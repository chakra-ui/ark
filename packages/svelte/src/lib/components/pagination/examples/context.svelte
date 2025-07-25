<script lang="ts">
  import { Pagination } from '@ark-ui/svelte/pagination'
</script>

<Pagination.Root count={100} pageSize={10}>
  <Pagination.Context>
    {#snippet render(pagination)}
      <div>
        <button onclick={() => pagination().goToFirstPage()}>First</button>
        <button onclick={() => pagination().goToPrevPage()}>Previous</button>
        <button onclick={() => pagination().setPage(5)}>Go to Page 5</button>
        <button onclick={() => pagination().goToNextPage()}>Next</button>
        <button onclick={() => pagination().goToLastPage()}>Last</button>

        <p>Page {pagination().page} of {pagination().totalPages}</p>
        <p>Items {pagination().pageRange.start + 1}-{pagination().pageRange.end}</p>

        <button onclick={() => pagination().setPageSize(20)}>20 per page</button>
      </div>
    {/snippet}
  </Pagination.Context>
</Pagination.Root>
