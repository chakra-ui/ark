<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronDownIcon } from 'lucide-svelte'
</script>

<Collapsible.Root lazyMount>
  <Collapsible.Trigger>
    Toggle (lazy mount)
    <Collapsible.Indicator>
      <ChevronDownIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>This content is only mounted when opened</Collapsible.Content>
</Collapsible.Root>
