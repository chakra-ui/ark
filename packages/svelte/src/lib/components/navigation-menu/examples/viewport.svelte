<script lang="ts">
  import { NavigationMenu } from '@ark-ui/svelte/navigation-menu'
  import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
  import styles from 'styles/navigation-menu.module.css'

  const products1 = [
    'Analytics Platform',
    'Customer Engagement',
    'Marketing Automation',
    'Data Integration',
    'Enterprise Solutions',
    'API Documentation',
  ]
  const products2 = ['Case Studies', 'Success Stories', 'Integration Partners', 'Security & Compliance']
  const company1 = ['About Us', 'Leadership Team', 'Careers', 'Press Releases']
  const company2 = ['Investors', 'Partners', 'Corporate Responsibility']
  const developers1 = [
    'API Documentation',
    'SDKs & Libraries',
    'Developer Guides',
    'Code Samples',
    'Webhooks',
    'GraphQL Explorer',
  ]
  const developers2 = ['Developer Community', 'Changelog', 'Status Page', 'Rate Limits']
</script>

<NavigationMenu.Root class={styles.Root} data-variant="viewport">
  <NavigationMenu.List class={styles.List}>
    <NavigationMenu.Item class={styles.Item} value="products">
      <NavigationMenu.Trigger class={styles.Trigger}>
        Products
        <span class={styles.TriggerIcon}>
          <ChevronDownIcon />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content class={styles.ViewportContent} style="grid-template-columns: 1fr 2fr; width: 600px;">
        {#each products1 as item}
          <NavigationMenu.Link class={styles.ViewportLink} href="#">{item}</NavigationMenu.Link>
        {/each}
        {#each products2 as item}
          <NavigationMenu.Link class={styles.ViewportLink} href="#">{item}</NavigationMenu.Link>
        {/each}
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="company">
      <NavigationMenu.Trigger class={styles.Trigger}>
        Company
        <span class={styles.TriggerIcon}>
          <ChevronDownIcon />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content class={styles.ViewportContent} style="grid-template-columns: 1fr 1fr; width: 450px;">
        {#each company1 as item}
          <NavigationMenu.Link class={styles.ViewportLink} href="#">{item}</NavigationMenu.Link>
        {/each}
        {#each company2 as item}
          <NavigationMenu.Link class={styles.ViewportLink} href="#">{item}</NavigationMenu.Link>
        {/each}
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="developers">
      <NavigationMenu.Trigger class={styles.Trigger}>
        Developers
        <span class={styles.TriggerIcon}>
          <ChevronDownIcon />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content class={styles.ViewportContent} style="grid-template-columns: 1.6fr 1fr; width: 650px;">
        {#each developers1 as item}
          <NavigationMenu.Link class={styles.ViewportLink} href="#">{item}</NavigationMenu.Link>
        {/each}
        {#each developers2 as item}
          <NavigationMenu.Link class={styles.ViewportLink} href="#">{item}</NavigationMenu.Link>
        {/each}
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="pricing">
      <NavigationMenu.Link class={styles.Link} href="#pricing">Pricing</NavigationMenu.Link>
    </NavigationMenu.Item>

    <NavigationMenu.Indicator class={styles.Indicator}>
      <NavigationMenu.Arrow class={styles.Arrow} />
    </NavigationMenu.Indicator>
  </NavigationMenu.List>

  <NavigationMenu.ViewportPositioner class={styles.ViewportPositioner} align="start">
    <NavigationMenu.Viewport class={styles.Viewport} />
  </NavigationMenu.ViewportPositioner>
</NavigationMenu.Root>
