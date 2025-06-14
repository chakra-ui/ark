<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
</script>

<Editable.Root placeholder="-">
  <Editable.Context>
    {#snippet render(editable)}
      <Editable.Label>Value is {editable().valueText}</Editable.Label>
    {/snippet}
  </Editable.Context>
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>

  <Editable.Control>
    <Editable.EditTrigger>Edit</Editable.EditTrigger>
    <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
    <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
  </Editable.Control>
</Editable.Root>
