<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
</script>

<Editable.Root placeholder="Placeholder">
  <Editable.Label>Label</Editable.Label>
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>
</Editable.Root>
