<script lang="ts">
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-svelte'
  import { Pagination } from '@ark-ui/svelte/pagination'
</script>

<Pagination.Root count={5000} pageSize={20} siblingCount={2}>
  <Pagination.FirstTrigger>
    <ChevronsLeft />
  </Pagination.FirstTrigger>

  <Pagination.PrevTrigger>
    <ChevronLeft />
  </Pagination.PrevTrigger>

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

  <Pagination.NextTrigger>
    <ChevronRight />
  </Pagination.NextTrigger>

  <Pagination.LastTrigger>
    <ChevronsRight />
  </Pagination.LastTrigger>
</Pagination.Root>
