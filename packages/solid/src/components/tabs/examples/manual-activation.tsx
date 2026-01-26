import { Tabs } from '@ark-ui/solid/tabs'
import styles from 'styles/tabs.module.css'

export const ManualActivation = () => (
  <Tabs.Root class={styles.Root} activationMode="manual" defaultValue="account">
    <Tabs.List class={styles.List}>
      <Tabs.Trigger class={styles.Trigger} value="account">
        Account
      </Tabs.Trigger>
      <Tabs.Trigger class={styles.Trigger} value="password">
        Password
      </Tabs.Trigger>
      <Tabs.Trigger class={styles.Trigger} value="billing">
        Billing
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content class={styles.Content} value="account">
      Make changes to your account here.
    </Tabs.Content>
    <Tabs.Content class={styles.Content} value="password">
      Change your password here.
    </Tabs.Content>
    <Tabs.Content class={styles.Content} value="billing">
      Manage your billing and payment details.
    </Tabs.Content>
  </Tabs.Root>
)
