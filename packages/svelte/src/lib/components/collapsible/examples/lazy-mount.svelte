<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'
</script>

<Collapsible.Root lazyMount>
  <Collapsible.Trigger>
    Toggle (lazy mount)
    <Collapsible.Indicator>
      <ChevronRightIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>This content is only mounted when opened</Collapsible.Content>
</Collapsible.Root>
