<script lang="ts">
  import { JsonTreeView, useJsonTreeView } from '../index.ts'

  let data = $state<object>({ original: 1 })
  const id = $props.id()
  const jsonTreeView = useJsonTreeView(() => ({ id, data }))
</script>

<JsonTreeView.RootProvider value={jsonTreeView}>
  <JsonTreeView.Tree />
</JsonTreeView.RootProvider>
<button type="button" onclick={() => (data = { replaced: true })}>replace</button>
