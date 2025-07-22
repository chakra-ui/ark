<script lang="ts">
  import { JsonTreeView, useJsonTreeView } from '@ark-ui/svelte/json-tree-view'
  import { ChevronRight } from 'lucide-svelte'

  const jsonTreeView = useJsonTreeView({
    data: {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      tags: ['tag1', 'tag2', 'tag3'],
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
    },
  })
</script>

<JsonTreeView.RootProvider value={jsonTreeView}>
  <JsonTreeView.Tree>
    {#snippet arrow()}
      <ChevronRight />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.RootProvider>