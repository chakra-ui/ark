import { Tabs, useTabs } from '@ark-ui/react/tabs'
import styles from 'styles/tabs.module.css'

export const RootProvider = () => {
  const tabs = useTabs({ defaultValue: 'account' })

  return (
    <div className="stack">
      <output>selected: {tabs.value}</output>
      <Tabs.RootProvider className={styles.Root} value={tabs}>
        <Tabs.List className={styles.List}>
          <Tabs.Trigger className={styles.Trigger} value="account">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Trigger} value="password">
            Password
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Trigger} value="billing">
            Billing
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
      </Tabs.RootProvider>
    </div>
  )
}
