import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import { ChevronDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/navigation-menu.module.css'

export const Viewport = () => {
  const renderLinks = (items: string[]) => (
    <For each={items}>
      {(item) => (
        <NavigationMenu.Link class={styles.ViewportLink} href="#">
          {item}
        </NavigationMenu.Link>
      )}
    </For>
  )

  return (
    <NavigationMenu.Root class={styles.Root} data-variant="viewport">
      <NavigationMenu.List class={styles.List}>
        <NavigationMenu.Item class={styles.Item} value="products">
          <NavigationMenu.Trigger class={styles.Trigger}>
            Products
            <span class={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            class={styles.ViewportContent}
            style={{
              'grid-template-columns': '1fr 2fr',
              width: '600px',
            }}
          >
            {renderLinks([
              'Analytics Platform',
              'Customer Engagement',
              'Marketing Automation',
              'Data Integration',
              'Enterprise Solutions',
              'API Documentation',
            ])}
            {renderLinks(['Case Studies', 'Success Stories', 'Integration Partners', 'Security & Compliance'])}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item class={styles.Item} value="company">
          <NavigationMenu.Trigger class={styles.Trigger}>
            Company
            <span class={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            class={styles.ViewportContent}
            style={{
              'grid-template-columns': '1fr 1fr',
              width: '450px',
            }}
          >
            {renderLinks(['About Us', 'Leadership Team', 'Careers', 'Press Releases'])}
            {renderLinks(['Investors', 'Partners', 'Corporate Responsibility'])}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item class={styles.Item} value="developers">
          <NavigationMenu.Trigger class={styles.Trigger}>
            Developers
            <span class={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            class={styles.ViewportContent}
            style={{
              'grid-template-columns': '1.6fr 1fr',
              width: '650px',
            }}
          >
            {renderLinks([
              'API Documentation',
              'SDKs & Libraries',
              'Developer Guides',
              'Code Samples',
              'Webhooks',
              'GraphQL Explorer',
            ])}
            {renderLinks(['Developer Community', 'Changelog', 'Status Page', 'Rate Limits'])}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item class={styles.Item} value="pricing">
          <NavigationMenu.Link class={styles.Link} href="#pricing">
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator class={styles.Indicator}>
          <NavigationMenu.Arrow class={styles.Arrow} />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.ViewportPositioner class={styles.ViewportPositioner} align="start">
        <NavigationMenu.Viewport class={styles.Viewport} />
      </NavigationMenu.ViewportPositioner>
    </NavigationMenu.Root>
  )
}
