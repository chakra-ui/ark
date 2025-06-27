<script lang="ts">
  import { Editable, useEditable } from '@ark-ui/svelte/editable'

  const editable = useEditable({ placeholder: 'Placeholder' })
</script>

<button onclick={() => editable().edit()}>Edit</button>

<Editable.RootProvider value={editable}>
  <Editable.Label>Label</Editable.Label>
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>
</Editable.RootProvider>
