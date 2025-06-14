<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'

  let value = $state('Click to edit')
</script>

<Editable.Root bind:value>
  <Editable.Label>Label</Editable.Label>
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

<p>Value: {value}</p>
