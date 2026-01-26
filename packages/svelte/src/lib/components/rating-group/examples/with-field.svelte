<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { RatingGroup } from '@ark-ui/svelte/rating-group'
  import { StarIcon } from 'lucide-svelte'
  import field from 'styles/field.module.css'
  import styles from 'styles/rating-group.module.css'
</script>

<Field.Root class={field.Root}>
  <RatingGroup.Root class={styles.Root} defaultValue={3}>
    <RatingGroup.Label class={styles.Label}>Label</RatingGroup.Label>
    <RatingGroup.Control class={styles.Control}>
      <RatingGroup.Context>
        {#snippet render(ratingGroup)}
          {#each ratingGroup().items as item}
            <RatingGroup.Item class={styles.Item} index={item}>
              <RatingGroup.ItemContext>
                {#snippet render(itemState)}
                  <span class={styles.ItemIndicator} data-highlighted={itemState().highlighted ? '' : undefined}>
                    <StarIcon data-bg="" />
                    <StarIcon data-fg="" fill="currentColor" />
                  </span>
                {/snippet}
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          {/each}
        {/snippet}
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
  <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Error Info</Field.ErrorText>
</Field.Root>
