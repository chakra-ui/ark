import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import {
  AccessibilityIcon,
  ChevronDownIcon,
  ClapperboardIcon,
  LayersIcon,
  ListChecksIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
} from 'lucide-solid'
import { For } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import styles from 'styles/navigation-menu.module.css'

const overviewSections = [
  {
    label: 'Get started',
    links: [
      { href: '#quick-start', title: 'Quick Start', description: 'Install and assemble', icon: RocketIcon },
      { href: '#styling', title: 'Styling', description: 'CSS, CSS-in-JS, or utilities', icon: PaletteIcon },
    ],
  },
  {
    label: 'Learn',
    links: [
      {
        href: '#accessibility',
        title: 'Accessibility',
        description: 'Keyboard and ARIA support',
        icon: AccessibilityIcon,
      },
      { href: '#releases', title: 'Releases', description: "What's new in Ark UI", icon: SparklesIcon },
    ],
  },
]

const guideLinks = [
  { href: '#animation', title: 'Animation', description: 'CSS or JavaScript', icon: ClapperboardIcon },
  { href: '#composition', title: 'Composition', description: 'Replace and compose parts', icon: LayersIcon },
  { href: '#forms', title: 'Forms', description: 'Native and library forms', icon: ListChecksIcon },
]

export const Basic = () => (
  <NavigationMenu.Root class={styles.Root}>
    <NavigationMenu.List class={styles.List}>
      <NavigationMenu.Item class={styles.Item} value="overview">
        <NavigationMenu.Trigger class={styles.Trigger}>
          Overview
          <span class={styles.TriggerIcon}>
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content class={styles.Content}>
          <div class={styles.MenuColumns}>
            <For each={overviewSections}>
              {(section) => (
                <div class={styles.MenuSection}>
                  <span class={styles.MenuLabel}>{section.label}</span>
                  <For each={section.links}>
                    {(item) => (
                      <NavigationMenu.Link class={styles.LinkCard} href={item.href}>
                        <span class={styles.LinkIcon}>
                          <Dynamic component={item.icon} />
                        </span>
                        <span class={styles.LinkCopy}>
                          <span class={styles.LinkTitle}>{item.title}</span>
                          <span class={styles.LinkDescription}>{item.description}</span>
                        </span>
                      </NavigationMenu.Link>
                    )}
                  </For>
                </div>
              )}
            </For>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item class={styles.Item} value="guides">
        <NavigationMenu.Trigger class={styles.Trigger}>
          Guides
          <span class={styles.TriggerIcon}>
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content class={styles.Content}>
          <div class={styles.MenuSection} data-single="">
            <span class={styles.MenuLabel}>Guides</span>
            <For each={guideLinks}>
              {(item) => (
                <NavigationMenu.Link class={styles.LinkCard} href={item.href}>
                  <span class={styles.LinkIcon}>
                    <Dynamic component={item.icon} />
                  </span>
                  <span class={styles.LinkCopy}>
                    <span class={styles.LinkTitle}>{item.title}</span>
                    <span class={styles.LinkDescription}>{item.description}</span>
                  </span>
                </NavigationMenu.Link>
              )}
            </For>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item class={styles.Item} value="docs">
        <NavigationMenu.Link class={styles.Link} href="https://ark-ui.com">
          Documentation
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
