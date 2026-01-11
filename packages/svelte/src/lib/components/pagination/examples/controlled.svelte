<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { Pagination } from '@ark-ui/svelte/pagination'
  import styles from 'styles/pagination.module.css'

  let page = $state(1)
</script>

<Pagination.Root count={5000} pageSize={10} siblingCount={2} bind:page class={styles.Root}>
  <div class={styles.Controls}>
    <Pagination.PrevTrigger class={styles.Trigger}>
      <ChevronLeft />
    </Pagination.PrevTrigger>
    <Pagination.Context>
      {#snippet render(pagination)}
        {#each pagination().pages as page, index (index)}
          {#if page.type === 'page'}
            <Pagination.Item {...page} class={styles.Item}>
              {page.value}
            </Pagination.Item>
          {:else}
            <Pagination.Ellipsis {index} class={styles.Ellipsis}>&#8230;</Pagination.Ellipsis>
          {/if}
        {/each}
      {/snippet}
    </Pagination.Context>
    <Pagination.NextTrigger class={styles.Trigger}>
      <ChevronRight />
    </Pagination.NextTrigger>
  </div>
</Pagination.Root>
