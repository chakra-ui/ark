<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronDownIcon } from 'lucide-svelte'
</script>

<Collapsible.Root lazyMount unmountOnExit>
  <Collapsible.Trigger>
    Toggle (lazy + unmount)
    <Collapsible.Indicator>
      <ChevronDownIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>This content is lazy mounted and unmounted on exit</Collapsible.Content>
</Collapsible.Root>
