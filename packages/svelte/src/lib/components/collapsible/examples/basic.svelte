<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronDownIcon } from 'lucide-svelte'
</script>

<Collapsible.Root>
  <Collapsible.Trigger>
    Toggle
    <Collapsible.Indicator>
      <ChevronDownIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible.Root>
