import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import { ChevronDownIcon } from 'lucide-solid'
import styles from 'styles/navigation-menu.module.css'

export const Basic = () => (
  <NavigationMenu.Root class={styles.Root}>
    <NavigationMenu.List class={styles.List}>
      <NavigationMenu.Item class={styles.Item} value="features">
        <NavigationMenu.Trigger class={styles.Trigger}>
          Features
          <span class={styles.TriggerIcon}>
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content class={styles.Content}>
          <NavigationMenu.Indicator class={styles.Indicator}>
            <NavigationMenu.Arrow class={styles.Arrow} />
          </NavigationMenu.Indicator>
          <NavigationMenu.Link class={styles.ContentLink} href="#overview">
            Overview
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#features">
            Features
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item class={styles.Item} value="docs">
        <NavigationMenu.Trigger class={styles.Trigger}>
          Documentation
          <span class={styles.TriggerIcon}>
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content class={styles.Content}>
          <NavigationMenu.Indicator class={styles.Indicator}>
            <NavigationMenu.Arrow class={styles.Arrow} />
          </NavigationMenu.Indicator>
          <NavigationMenu.Link class={styles.ContentLink} href="#introduction">
            Introduction
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#installation">
            Installation
          </NavigationMenu.Link>
          <NavigationMenu.Link class={styles.ContentLink} href="#components">
            Components
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item class={styles.Item} value="about">
        <NavigationMenu.Link class={styles.Link} href="#about">
          About
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
