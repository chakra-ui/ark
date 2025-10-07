<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'
</script>

<Collapsible.Root unmountOnExit>
  <Collapsible.Trigger>
    Toggle (unmount on exit)
    <Collapsible.Indicator>
      <ChevronRightIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>This content is unmounted when closed</Collapsible.Content>
</Collapsible.Root>
