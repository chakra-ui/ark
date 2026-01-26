<script lang="ts">
  import { Tabs } from '@ark-ui/svelte/tabs'
  import styles from 'styles/tabs.module.css'
</script>

<Tabs.Root class={styles.Root} lazyMount unmountOnExit defaultValue="account">
  <Tabs.List class={styles.List}>
    <Tabs.Trigger class={styles.TriggerIndicator} value="account">Account</Tabs.Trigger>
    <Tabs.Trigger class={styles.TriggerIndicator} value="password">Password</Tabs.Trigger>
    <Tabs.Trigger class={styles.TriggerIndicator} value="billing">Billing</Tabs.Trigger>
    <Tabs.Indicator class={styles.Indicator} />
  </Tabs.List>
  <Tabs.Content class={styles.Content} value="account">Make changes to your account here.</Tabs.Content>
  <Tabs.Content class={styles.Content} value="password">Change your password here.</Tabs.Content>
  <Tabs.Content class={styles.Content} value="billing">Manage your billing and payment details.</Tabs.Content>
</Tabs.Root>
