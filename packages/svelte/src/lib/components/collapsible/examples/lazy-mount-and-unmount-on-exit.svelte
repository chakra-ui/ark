<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'
</script>

<Collapsible.Root lazyMount unmountOnExit>
  <Collapsible.Trigger>
    Toggle (lazy + unmount)
    <Collapsible.Indicator>
      <ChevronRightIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>This content is lazy mounted and unmounted on exit</Collapsible.Content>
</Collapsible.Root>
