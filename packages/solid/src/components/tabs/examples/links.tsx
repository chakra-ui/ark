import { Tabs } from '@ark-ui/solid/tabs'
import styles from 'styles/tabs.module.css'

export const Links = () => (
  <Tabs.Root class={styles.Root} defaultValue="account">
    <Tabs.List class={styles.List}>
      <Tabs.Trigger
        class={styles.Trigger}
        value="account"
        asChild={(props) => (
          <a href="#account" {...props()}>
            Account
          </a>
        )}
      />
      <Tabs.Trigger
        class={styles.Trigger}
        value="password"
        asChild={(props) => (
          <a href="#password" {...props()}>
            Password
          </a>
        )}
      />
      <Tabs.Trigger
        class={styles.Trigger}
        value="billing"
        asChild={(props) => (
          <a href="#billing" {...props()}>
            Billing
          </a>
        )}
      />
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
