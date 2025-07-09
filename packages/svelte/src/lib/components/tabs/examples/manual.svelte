<script lang="ts">
  import { Tabs } from '@ark-ui/svelte/tabs'
</script>

<Tabs.Root activationMode="manual" defaultValue="react">
  <Tabs.List>
    <Tabs.Trigger value="react">React</Tabs.Trigger>
    <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
    <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
    <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="react">React Content</Tabs.Content>
  <Tabs.Content value="vue">Vue Content</Tabs.Content>
  <Tabs.Content value="solid">Solid Content</Tabs.Content>
  <Tabs.Content value="svelte">Svelte Content</Tabs.Content>
</Tabs.Root>
