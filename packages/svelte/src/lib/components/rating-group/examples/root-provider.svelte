<script lang="ts">
  import { RatingGroup, useRatingGroup } from '@ark-ui/svelte/rating-group'
  import { StarIcon } from 'lucide-svelte'

  const id = $props.id()
  const ratingGroup = useRatingGroup({ id, count: 5, defaultValue: 3 })
</script>

<button onclick={() => ratingGroup().clearValue()}>Clear</button>

<RatingGroup.RootProvider value={ratingGroup}>
  <RatingGroup.Label>Label</RatingGroup.Label>
  <RatingGroup.Control>
    <RatingGroup.Context>
      {#snippet render(ratingGroup)}
        {#each ratingGroup().items as item}
          <RatingGroup.Item index={item}>
            <RatingGroup.ItemContext>
              {#snippet render(itemState)}
                {#if itemState().highlighted}
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
</RatingGroup.RootProvider>
