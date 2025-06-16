<script lang="ts">
  import { RatingGroup } from '@ark-ui/svelte/rating-group'
  import { StarIcon } from 'lucide-svelte'

  let value = $state(0)
</script>

<RatingGroup.Root count={5} bind:value allowHalf>
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
</RatingGroup.Root>
