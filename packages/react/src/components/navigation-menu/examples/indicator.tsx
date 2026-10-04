import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/navigation-menu.module.css'

export const Indicator = () => (
  <NavigationMenu.Root className={styles.Root}>
    <NavigationMenu.List className={styles.List}>
      <NavigationMenu.Item className={styles.Item} value="products">
        <NavigationMenu.Trigger className={styles.Trigger}>
          Products
          <span className={styles.TriggerIcon}>
            <ChevronDownIcon />
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
            <ChevronDownIcon />
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

      <NavigationMenu.Indicator className={styles.Indicator} />
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
