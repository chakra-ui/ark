<script lang="ts">
  import { NavigationMenu } from '@ark-ui/svelte/navigation-menu'

  const renderLinks = (opts: { value: string; items: string[] }) => {
    const { value, items } = opts
    return items.map((item, index) => ({
      id: `${value}-${item}-${index}`,
      value,
      item,
    }))
  }
</script>

<NavigationMenu.Root class="viewport">
  <NavigationMenu.IndicatorTrack>
    <NavigationMenu.List>
      <NavigationMenu.Item value="products">
        <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        <NavigationMenu.Content style="grid-template-columns: 1fr 2fr; width: 600px;">
          {#each renderLinks( { value: 'products', items: ['Analytics Platform', 'Customer Engagement', 'Marketing Automation', 'Data Integration', 'Enterprise Solutions', 'API Documentation'] }, ) as link (link.id)}
            <NavigationMenu.Link href="# ">
              {link.item}
            </NavigationMenu.Link>
          {/each}
          {#each renderLinks( { value: 'products', items: ['Case Studies', 'Success Stories', 'Integration Partners', 'Security & Compliance'] }, ) as link (link.id)}
            <NavigationMenu.Link href="# ">
              {link.item}
            </NavigationMenu.Link>
          {/each}
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item value="company">
        <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
        <NavigationMenu.Content style="grid-template-columns: 1fr 1fr; width: 450px;">
          {#each renderLinks( { value: 'company', items: ['About Us', 'Leadership Team', 'Careers', 'Press Releases'] }, ) as link (link.id)}
            <NavigationMenu.Link href="# ">
              {link.item}
            </NavigationMenu.Link>
          {/each}
          {#each renderLinks( { value: 'company', items: ['Investors', 'Partners', 'Corporate Responsibility'] }, ) as link (link.id)}
            <NavigationMenu.Link href="# ">
              {link.item}
            </NavigationMenu.Link>
          {/each}
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item value="developers">
        <NavigationMenu.Trigger>Developers</NavigationMenu.Trigger>
        <NavigationMenu.Content style="grid-template-columns: 1.6fr 1fr; width: 650px;">
          {#each renderLinks( { value: 'developers', items: ['API Documentation', 'SDKs & Libraries', 'Developer Guides', 'Code Samples', 'Webhooks', 'GraphQL Explorer'] }, ) as link (link.id)}
            <NavigationMenu.Link href="# ">
              {link.item}
            </NavigationMenu.Link>
          {/each}
          {#each renderLinks( { value: 'developers', items: ['Developer Community', 'Changelog', 'Status Page', 'Rate Limits'] }, ) as link (link.id)}
            <NavigationMenu.Link href="# ">
              {link.item}
            </NavigationMenu.Link>
          {/each}
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item value="pricing">
        <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Indicator>
        <NavigationMenu.Arrow />
      </NavigationMenu.Indicator>
    </NavigationMenu.List>
  </NavigationMenu.IndicatorTrack>

  <NavigationMenu.ViewportPositioner>
    <NavigationMenu.Viewport />
  </NavigationMenu.ViewportPositioner>
</NavigationMenu.Root>
