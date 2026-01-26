import { Tabs } from '@ark-ui/react/tabs'
import { useState } from 'react'
import styles from 'styles/tabs.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<string | null>('account')
  return (
    <Tabs.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
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
    </Tabs.Root>
  )
}
