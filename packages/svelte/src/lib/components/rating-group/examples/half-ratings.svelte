<script lang="ts">
  import { RatingGroup } from '@ark-ui/svelte/rating-group'
  import { StarHalfIcon, StarIcon } from 'lucide-svelte'
</script>

<RatingGroup.Root count={5} defaultValue={3} allowHalf>
  <RatingGroup.Label>Label</RatingGroup.Label>
  <RatingGroup.Control>
    <RatingGroup.Context>
      {#snippet render({ items })}
        {#each items as item (item)}
          <RatingGroup.Item index={item}>
            <RatingGroup.ItemContext>
              {#snippet render({ half, highlighted })}
                {#if half}
                  <StarHalfIcon fill="current" />
                {:else if highlighted}
                  <StarIcon fill="current" />
                {:else}
                  <StarIcon />
                {/if}
              {/snippet}
            </RatingGroup.ItemContext>
          </RatingGroup.Item>
        {/each}
      {/snippet}
    </RatingGroup.Context>
    <RatingGroup.HiddenInput />
  </RatingGroup.Control>
</RatingGroup.Root>
