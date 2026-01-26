import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/navigation-menu.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className="stack">
      <output>value: {value}</output>
      <NavigationMenu.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
        <NavigationMenu.List className={styles.List}>
          <NavigationMenu.Item className={styles.Item} value="features">
            <NavigationMenu.Trigger className={styles.Trigger}>
              Features
              <span className={styles.TriggerIcon}>
                <ChevronDownIcon />
              </span>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.Content}>
              <NavigationMenu.Link className={styles.ContentLink} href="#overview">
                Overview
              </NavigationMenu.Link>
              <NavigationMenu.Link className={styles.ContentLink} href="#features">
                Features
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item className={styles.Item} value="docs">
            <NavigationMenu.Trigger className={styles.Trigger}>
              Documentation
              <span className={styles.TriggerIcon}>
                <ChevronDownIcon />
              </span>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.Content}>
              <NavigationMenu.Link className={styles.ContentLink} href="#introduction">
                Introduction
              </NavigationMenu.Link>
              <NavigationMenu.Link className={styles.ContentLink} href="#installation">
                Installation
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item className={styles.Item} value="about">
            <NavigationMenu.Link className={styles.Link} href="#about">
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  )
}
