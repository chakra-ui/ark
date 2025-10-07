<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRight } from 'lucide-svelte'
</script>

<Collapsible.Root disabled>
  <Collapsible.Trigger>
    Toggle
    <Collapsible.Indicator>
      <ChevronRight />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible.Root>
