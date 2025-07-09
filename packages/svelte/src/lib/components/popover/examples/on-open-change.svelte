<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
  import { ChevronRightIcon } from 'lucide-svelte'
</script>

<Popover.Root onOpenChange={(open) => alert(open ? 'opened' : 'closed')}>
  <Popover.Trigger>
    Click Me
    <Popover.Indicator>
      <ChevronRightIcon />
    </Popover.Indicator>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Title>Title</Popover.Title>
      <Popover.Description>Description</Popover.Description>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
