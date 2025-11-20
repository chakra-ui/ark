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
        <NavigationMenu.Trigger value="products">Products</NavigationMenu.Trigger>
        <NavigationMenu.TriggerProxy value="products" />
        <NavigationMenu.ViewportProxy value="products" />
      </NavigationMenu.Item>

      <NavigationMenu.Item value="company">
        <NavigationMenu.Trigger value="company">Company</NavigationMenu.Trigger>
        <NavigationMenu.TriggerProxy value="company" />
        <NavigationMenu.ViewportProxy value="company" />
      </NavigationMenu.Item>

      <NavigationMenu.Item value="developers">
        <NavigationMenu.Trigger value="developers">Developers</NavigationMenu.Trigger>
        <NavigationMenu.TriggerProxy value="developers" />
        <NavigationMenu.ViewportProxy value="developers" />
      </NavigationMenu.Item>

      <NavigationMenu.Item value="pricing">
        <NavigationMenu.Link href="#pricing" value="pricing">pricing</NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Indicator>
        <NavigationMenu.Arrow />
      </NavigationMenu.Indicator>
    </NavigationMenu.List>
  </NavigationMenu.IndicatorTrack>

  <NavigationMenu.ViewportPositioner>
    <NavigationMenu.Viewport>
      <NavigationMenu.Content value="products" style="grid-template-columns: 1fr 2fr; width: 600px;">
        {#each renderLinks( { value: 'products', items: ['Analytics Platform', 'Customer Engagement', 'Marketing Automation', 'Data Integration', 'Enterprise Solutions', 'API Documentation'] }, ) as link (link.id)}
          <NavigationMenu.Link href="# " value={link.value}>
            {link.item}
          </NavigationMenu.Link>
        {/each}
        {#each renderLinks( { value: 'products', items: ['Case Studies', 'Success Stories', 'Integration Partners', 'Security & Compliance'] }, ) as link (link.id)}
          <NavigationMenu.Link href="# " value={link.value}>
            {link.item}
          </NavigationMenu.Link>
        {/each}
      </NavigationMenu.Content>

      <NavigationMenu.Content value="company" style="grid-template-columns: 1fr 1fr; width: 450px;">
        {#each renderLinks( { value: 'company', items: ['About Us', 'Leadership Team', 'Careers', 'Press Releases'] }, ) as link (link.id)}
          <NavigationMenu.Link href="# " value={link.value}>
            {link.item}
          </NavigationMenu.Link>
        {/each}
        {#each renderLinks( { value: 'company', items: ['Investors', 'Partners', 'Corporate Responsibility'] }, ) as link (link.id)}
          <NavigationMenu.Link href="# " value={link.value}>
            {link.item}
          </NavigationMenu.Link>
        {/each}
      </NavigationMenu.Content>
      <NavigationMenu.Content value="developers" style="grid-template-columns: 1.6fr 1fr; width: 650px;">
        {#each renderLinks( { value: 'developers', items: ['API Documentation', 'SDKs & Libraries', 'Developer Guides', 'Code Samples', 'Webhooks', 'GraphQL Explorer'] }, ) as link (link.id)}
          <NavigationMenu.Link href="# " value={link.value}>
            {link.item}
          </NavigationMenu.Link>
        {/each}
        {#each renderLinks( { value: 'developers', items: ['Developer Community', 'Changelog', 'Status Page', 'Rate Limits'] }, ) as link (link.id)}
          <NavigationMenu.Link href="# " value={link.value}>
            {link.item}
          </NavigationMenu.Link>
        {/each}
      </NavigationMenu.Content>
    </NavigationMenu.Viewport>
  </NavigationMenu.ViewportPositioner>
</NavigationMenu.Root>
