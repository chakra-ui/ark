import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import {
  AccessibilityIcon,
  ChevronDownIcon,
  ClapperboardIcon,
  LayersIcon,
  ListChecksIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
} from 'lucide-react'
import styles from 'styles/navigation-menu-viewport.module.css'

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

export const Viewport = () => (
  <div className={styles.Frame}>
    <NavigationMenu.Root className={styles.Root}>
      <NavigationMenu.List className={styles.List}>
        <NavigationMenu.Item className={styles.Item} value="overview">
          <NavigationMenu.Trigger className={styles.Trigger}>
            Overview
            <span className={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles.Content}>
            <div className={styles.MenuColumns}>
              {overviewSections.map((section) => (
                <div key={section.label} className={styles.MenuSection}>
                  <span className={styles.MenuLabel}>{section.label}</span>
                  {section.links.map((item) => (
                    <NavigationMenu.Link key={item.href} className={styles.LinkCard} href={item.href}>
                      <span className={styles.LinkIcon}>
                        <item.icon />
                      </span>
                      <span className={styles.LinkCopy}>
                        <span className={styles.LinkTitle}>{item.title}</span>
                        <span className={styles.LinkDescription}>{item.description}</span>
                      </span>
                    </NavigationMenu.Link>
                  ))}
                </div>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={styles.Item} value="guides">
          <NavigationMenu.Trigger className={styles.Trigger}>
            Guides
            <span className={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={styles.Content}>
            <div className={styles.MenuSection} data-single="">
              <span className={styles.MenuLabel}>Guides</span>
              {guideLinks.map((item) => (
                <NavigationMenu.Link key={item.href} className={styles.LinkCard} href={item.href}>
                  <span className={styles.LinkIcon}>
                    <item.icon />
                  </span>
                  <span className={styles.LinkCopy}>
                    <span className={styles.LinkTitle}>{item.title}</span>
                    <span className={styles.LinkDescription}>{item.description}</span>
                  </span>
                </NavigationMenu.Link>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={styles.Item} value="docs">
          <NavigationMenu.Link className={styles.Link} href="https://ark-ui.com">
            Documentation
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className={styles.Indicator}>
          <NavigationMenu.Arrow className={styles.Arrow} />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.ViewportPositioner className={styles.ViewportPositioner} align="start">
        <NavigationMenu.Viewport className={styles.Viewport} />
      </NavigationMenu.ViewportPositioner>
    </NavigationMenu.Root>
  </div>
)
