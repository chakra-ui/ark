import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/navigation-menu.module.css'

export const Viewport = () => {
  const renderLinks = (opts: { value: string; items: string[] }) => {
    const { value, items } = opts
    return items.map((item, index) => (
      <NavigationMenu.Link className={styles.ViewportLink} key={`${value}-${item}-${index}`} asChild>
        <a href="#">{item}</a>
      </NavigationMenu.Link>
    ))
  }

  return (
    <NavigationMenu.Root className={styles.Root} data-variant="viewport">
      <NavigationMenu.List className={styles.List}>
        <NavigationMenu.Item className={styles.Item} value="products">
          <NavigationMenu.Trigger className={styles.Trigger}>
            Products
            <span className={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={styles.ViewportContent}
            style={{
              gridTemplateColumns: '1fr 2fr',
              width: 600,
            }}
          >
            {renderLinks({
              value: 'products',
              items: [
                'Analytics Platform',
                'Customer Engagement',
                'Marketing Automation',
                'Data Integration',
                'Enterprise Solutions',
                'API Documentation',
              ],
            })}

            {renderLinks({
              value: 'products',
              items: ['Case Studies', 'Success Stories', 'Integration Partners', 'Security & Compliance'],
            })}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={styles.Item} value="company">
          <NavigationMenu.Trigger className={styles.Trigger}>
            Company
            <span className={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={styles.ViewportContent}
            style={{
              gridTemplateColumns: '1fr 1fr',
              width: 450,
            }}
          >
            {renderLinks({
              value: 'company',
              items: ['About Us', 'Leadership Team', 'Careers', 'Press Releases'],
            })}

            {renderLinks({
              value: 'company',
              items: ['Investors', 'Partners', 'Corporate Responsibility'],
            })}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={styles.Item} value="developers">
          <NavigationMenu.Trigger className={styles.Trigger}>
            Developers
            <span className={styles.TriggerIcon}>
              <ChevronDownIcon />
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={styles.ViewportContent}
            style={{
              gridTemplateColumns: '1.6fr 1fr',
              width: 650,
            }}
          >
            {renderLinks({
              value: 'developers',
              items: [
                'API Documentation',
                'SDKs & Libraries',
                'Developer Guides',
                'Code Samples',
                'Webhooks',
                'GraphQL Explorer',
              ],
            })}
            {renderLinks({
              value: 'developers',
              items: ['Developer Community', 'Changelog', 'Status Page', 'Rate Limits'],
            })}
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={styles.Item} value="pricing">
          <NavigationMenu.Link className={styles.Link} href="#pricing">
            Pricing
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
  )
}
