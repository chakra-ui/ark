<script lang="ts">
  import { Tabs } from '@ark-ui/svelte/tabs'

  let value = $state<string | null>('react')
</script>

<Tabs.Root bind:value>
  <Tabs.List>
    <Tabs.Trigger value="react">React</Tabs.Trigger>
    <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
    <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="react">React Content</Tabs.Content>
  <Tabs.Content value="vue">Vue Content</Tabs.Content>
  <Tabs.Content value="solid">Solid Content</Tabs.Content>
</Tabs.Root>
