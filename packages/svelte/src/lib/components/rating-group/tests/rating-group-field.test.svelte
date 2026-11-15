<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { RatingGroup } from '@ark-ui/svelte/rating-group'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <RatingGroup.Root count={3}>
    <RatingGroup.Control>
      {#each [1, 2, 3] as index (index)}
        <RatingGroup.Item {index} />
      {/each}
    </RatingGroup.Control>
    <RatingGroup.HiddenInput />
  </RatingGroup.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
