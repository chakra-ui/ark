<script lang="ts">
  import { JsonTreeView, type JsonTreeViewRootProps } from '../index.ts'

  const props: Omit<JsonTreeViewRootProps, 'children'> = $props()
</script>

<JsonTreeView.Root {...props}>
  <JsonTreeView.Tree />
</JsonTreeView.Root>
