import { Tabs } from '@ark-ui/react/tabs'
import styles from 'styles/tabs.module.css'

export const Links = () => (
  <Tabs.Root className={styles.Root} defaultValue="account">
    <Tabs.List className={styles.List}>
      <Tabs.Trigger className={styles.Trigger} value="account" asChild>
        <a href="#account">Account</a>
      </Tabs.Trigger>
      <Tabs.Trigger className={styles.Trigger} value="password" asChild>
        <a href="#password">Password</a>
      </Tabs.Trigger>
      <Tabs.Trigger className={styles.Trigger} value="billing" asChild>
        <a href="#billing">Billing</a>
      </Tabs.Trigger>
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
