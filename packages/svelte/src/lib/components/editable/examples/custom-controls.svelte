<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
</script>

<Editable.Root placeholder="Placeholder" defaultValue="Chakra">
  <Editable.Label>Label</Editable.Label>
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>
  <Editable.Context>
    {#snippet render(editable)}
      <Editable.Control>
        {#if editable().editing}
          <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
        {:else}
          <Editable.EditTrigger>Edit</Editable.EditTrigger>
        {/if}
      </Editable.Control>
    {/snippet}
  </Editable.Context>
</Editable.Root>
