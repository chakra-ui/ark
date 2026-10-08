<script lang="ts">
  import { Editable } from '../index.ts'

  let edit = $state(false)
</script>

<Editable.Root defaultValue="Ark" bind:edit>
  <Editable.Label>Name</Editable.Label>
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>
  <Editable.Control>
    <Editable.EditTrigger>Edit</Editable.EditTrigger>
  </Editable.Control>
</Editable.Root>
<output data-testid="edit">{String(edit)}</output>
<button type="button" onclick={() => (edit = false)}>stop</button>
