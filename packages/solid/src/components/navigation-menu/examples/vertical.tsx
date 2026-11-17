import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/navigation-menu-vertical.module.css'

export const Vertical = () => (
  <NavigationMenu.Root class={styles.Root} orientation="vertical">
    <NavigationMenu.List class={styles.List}>
      <NavigationMenu.Item class={styles.Item} value="products">
        <NavigationMenu.Trigger class={styles.Trigger}>
          Products
          <span class={styles.TriggerIcon}>
            <ChevronRightIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content class={styles.Content}>
          <NavigationMenu.Link class={styles.ContentLink} href="#analytics">
            Analytics
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#commerce">
            Commerce
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#payments">
            Payments
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item class={styles.Item} value="resources">
        <NavigationMenu.Trigger class={styles.Trigger}>
          Resources
          <span class={styles.TriggerIcon}>
            <ChevronRightIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content class={styles.Content}>
          <NavigationMenu.Link class={styles.ContentLink} href="#blog">
            Blog
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#changelog">
            Changelog
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#support">
            Support
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item class={styles.Item} value="docs">
        <NavigationMenu.Link class={styles.Link} href="#docs">
          Documentation
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
