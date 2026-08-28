<script lang="ts">
  import { Tabs } from '@ark-ui/svelte/tabs'
  import styles from 'styles/tabs.module.css'
</script>

<Tabs.Root class={styles.Root} defaultValue="account">
  <Tabs.List class={styles.List}>
    <Tabs.Trigger class={styles.Trigger} value="account">
      {#snippet asChild(props)}
        <a href="#account" {...props()}>Account</a>
      {/snippet}
    </Tabs.Trigger>
    <Tabs.Trigger class={styles.Trigger} value="password">
      {#snippet asChild(props)}
        <a href="#password" {...props()}>Password</a>
      {/snippet}
    </Tabs.Trigger>
    <Tabs.Trigger class={styles.Trigger} value="billing">
      {#snippet asChild(props)}
        <a href="#billing" {...props()}>Billing</a>
      {/snippet}
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content class={styles.Content} value="account">Make changes to your account here.</Tabs.Content>
  <Tabs.Content class={styles.Content} value="password">Change your password here.</Tabs.Content>
  <Tabs.Content class={styles.Content} value="billing">Manage your billing and payment details.</Tabs.Content>
</Tabs.Root>
