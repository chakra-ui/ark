<script lang="ts">
  import { JsonTreeView } from '../index.ts'

  const props: { data: object } = $props()

  let data = $state(props.data)
  let expandedValue = $state<string[]>([])
  let selectedValue = $state<string[]>([])
</script>

<JsonTreeView.Root {data} bind:expandedValue bind:selectedValue>
  <JsonTreeView.Tree />
</JsonTreeView.Root>
<output data-testid="expanded">{expandedValue.length}</output>
<output data-testid="selected">{selectedValue.length}</output>
<button type="button" onclick={() => (expandedValue = [])}>collapse</button>
<button type="button" onclick={() => (data = { replaced: true })}>replace</button>
