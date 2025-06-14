<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronDownIcon } from 'lucide-svelte'
</script>

<Collapsible.Root defaultOpen>
  <Collapsible.Trigger>
    Toggle (initially open)
    <Collapsible.Indicator>
      <ChevronDownIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>This content is initially visible</Collapsible.Content>
</Collapsible.Root>
