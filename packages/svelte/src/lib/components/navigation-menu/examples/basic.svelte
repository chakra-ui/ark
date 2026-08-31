<script lang="ts">
  import { NavigationMenu } from '@ark-ui/svelte/navigation-menu'
  import AccessibilityIcon from 'lucide-svelte/icons/accessibility'
  import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
  import ClapperboardIcon from 'lucide-svelte/icons/clapperboard'
  import LayersIcon from 'lucide-svelte/icons/layers'
  import ListChecksIcon from 'lucide-svelte/icons/list-checks'
  import PaletteIcon from 'lucide-svelte/icons/palette'
  import RocketIcon from 'lucide-svelte/icons/rocket'
  import SparklesIcon from 'lucide-svelte/icons/sparkles'
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
</script>

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
          {#each overviewSections as section (section.label)}
            <div class={styles.MenuSection}>
              <span class={styles.MenuLabel}>{section.label}</span>
              {#each section.links as item (item.href)}
                <NavigationMenu.Link class={styles.LinkCard} href={item.href}>
                  <span class={styles.LinkIcon}>
                    <item.icon />
                  </span>
                  <span class={styles.LinkCopy}>
                    <span class={styles.LinkTitle}>{item.title}</span>
                    <span class={styles.LinkDescription}>{item.description}</span>
                  </span>
                </NavigationMenu.Link>
              {/each}
            </div>
          {/each}
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
          {#each guideLinks as item (item.href)}
            <NavigationMenu.Link class={styles.LinkCard} href={item.href}>
              <span class={styles.LinkIcon}>
                <item.icon />
              </span>
              <span class={styles.LinkCopy}>
                <span class={styles.LinkTitle}>{item.title}</span>
                <span class={styles.LinkDescription}>{item.description}</span>
              </span>
            </NavigationMenu.Link>
          {/each}
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="docs">
      <NavigationMenu.Link class={styles.Link} href="https://ark-ui.com">Documentation</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
