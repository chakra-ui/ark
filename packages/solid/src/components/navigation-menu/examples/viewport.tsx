import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import { For } from 'solid-js'

export const Viewport = () => {
  const renderLinks = (opts: { value: string; items: string[] }) => {
    const { value, items } = opts
    return (
      <For each={items}>
        {(item) => (
          <NavigationMenu.Link
            value={value}
            asChild={(props) => (
              <a href="# " {...props()}>
                {item}
              </a>
            )}
          />
        )}
      </For>
    )
  }

  return (
    <NavigationMenu.Root class="viewport">
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content
            style={{
              'grid-template-columns': '1fr 2fr',
              width: '600px',
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

        <NavigationMenu.Item value="company">
          <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
          <NavigationMenu.Content
            style={{
              'grid-template-columns': '1fr 1fr',
              width: '450px',
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

        <NavigationMenu.Item value="developers">
          <NavigationMenu.Trigger>Developers</NavigationMenu.Trigger>
          <NavigationMenu.Content
            style={{
              'grid-template-columns': '1.6fr 1fr',
              width: '650px',
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

        <NavigationMenu.Item value="pricing">
          <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator>
          <NavigationMenu.Arrow />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.ViewportPositioner>
        <NavigationMenu.Viewport />
      </NavigationMenu.ViewportPositioner>
    </NavigationMenu.Root>
  )
}
