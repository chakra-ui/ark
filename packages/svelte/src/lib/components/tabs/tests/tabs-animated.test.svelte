<script lang="ts">
  import { Tabs } from '@ark-ui/svelte/tabs'

  const animated = 'animation-name: exit; animation-duration: 200ms'
</script>

<Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account" style={animated}>Account panel</Tabs.Content>
  <Tabs.Content value="password" style={animated}>Password panel</Tabs.Content>
</Tabs.Root>
