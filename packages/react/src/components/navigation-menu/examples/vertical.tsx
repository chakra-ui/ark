import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/navigation-menu-vertical.module.css'

export const Vertical = () => (
  <NavigationMenu.Root className={styles.Root} orientation="vertical">
    <NavigationMenu.List className={styles.List}>
      <NavigationMenu.Item className={styles.Item} value="products">
        <NavigationMenu.Trigger className={styles.Trigger}>
          Products
          <span className={styles.TriggerIcon}>
            <ChevronRightIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.Content}>
          <NavigationMenu.Link className={styles.ContentLink} href="#analytics">
            Analytics
          </NavigationMenu.Link>
          <NavigationMenu.Link className={styles.ContentLink} href="#commerce">
            Commerce
          </NavigationMenu.Link>
          <NavigationMenu.Link className={styles.ContentLink} href="#payments">
            Payments
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item className={styles.Item} value="resources">
        <NavigationMenu.Trigger className={styles.Trigger}>
          Resources
          <span className={styles.TriggerIcon}>
            <ChevronRightIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className={styles.Content}>
          <NavigationMenu.Link className={styles.ContentLink} href="#blog">
            Blog
          </NavigationMenu.Link>
          <NavigationMenu.Link className={styles.ContentLink} href="#changelog">
            Changelog
          </NavigationMenu.Link>
          <NavigationMenu.Link className={styles.ContentLink} href="#support">
            Support
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item className={styles.Item} value="docs">
        <NavigationMenu.Link className={styles.Link} href="#docs">
          Documentation
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
