import { Tabs } from '@ark-ui/react/tabs'
import styles from 'styles/tabs.module.css'

export const Indicator = () => (
  <Tabs.Root className={styles.Root} defaultValue="account">
    <Tabs.List className={styles.List}>
      <Tabs.Trigger className={styles.TriggerIndicator} value="account">
        Account
      </Tabs.Trigger>
      <Tabs.Trigger className={styles.TriggerIndicator} value="password">
        Password
      </Tabs.Trigger>
      <Tabs.Trigger className={styles.TriggerIndicator} value="billing">
        Billing
      </Tabs.Trigger>
      <Tabs.Indicator className={styles.Indicator} />
    </Tabs.List>
    <Tabs.Content className={styles.Content} value="account">
      Make changes to your account here.
    </Tabs.Content>
    <Tabs.Content className={styles.Content} value="password">
      Change your password here.
    </Tabs.Content>
    <Tabs.Content className={styles.Content} value="billing">
      Manage your billing and payment details.
    </Tabs.Content>
  </Tabs.Root>
)
