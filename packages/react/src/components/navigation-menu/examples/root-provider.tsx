import { NavigationMenu, useNavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/navigation-menu.module.css'

export const RootProvider = () => {
  const navigationMenu = useNavigationMenu()

  return (
    <div className="stack">
      <output>open: {navigationMenu.value}</output>

      <NavigationMenu.RootProvider value={navigationMenu} className={styles.Root}>
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
      </NavigationMenu.RootProvider>
    </div>
  )
}
