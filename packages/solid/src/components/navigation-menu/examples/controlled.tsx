import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import { ChevronDownIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/navigation-menu.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal('')

  return (
    <div class="stack">
      <output>value: {value()}</output>
      <NavigationMenu.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
        <NavigationMenu.List class={styles.List}>
          <NavigationMenu.Item class={styles.Item} value="features">
            <NavigationMenu.Trigger class={styles.Trigger}>
              Features
              <span class={styles.TriggerIcon}>
                <ChevronDownIcon />
              </span>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content class={styles.Content}>
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
              <NavigationMenu.Link class={styles.ContentLink} href="#introduction">
                Introduction
              </NavigationMenu.Link>
              <NavigationMenu.Link class={styles.ContentLink} href="#installation">
                Installation
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
    </div>
  )
}
