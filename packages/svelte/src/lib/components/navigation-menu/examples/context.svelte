<script lang="ts">
  import { NavigationMenu } from '@ark-ui/svelte/navigation-menu'
  import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
  import styles from 'styles/navigation-menu.module.css'
</script>

<NavigationMenu.Root class={styles.Root}>
  <NavigationMenu.Context>
    {#snippet render(context)}
      <output>value: {context().value || 'none'}</output>
    {/snippet}
  </NavigationMenu.Context>
  <NavigationMenu.List class={styles.List}>
    <NavigationMenu.Item class={styles.Item} value="features">
      <NavigationMenu.Trigger class={styles.Trigger}>
        Features
        <span class={styles.TriggerIcon}>
          <ChevronDownIcon />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content class={styles.Content}>
        <NavigationMenu.Link class={styles.ContentLink} href="#overview">Overview</NavigationMenu.Link>
        <NavigationMenu.Link class={styles.ContentLink} href="#features">Features</NavigationMenu.Link>
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
        <NavigationMenu.Link class={styles.ContentLink} href="#introduction">Introduction</NavigationMenu.Link>
        <NavigationMenu.Link class={styles.ContentLink} href="#installation">Installation</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="about">
      <NavigationMenu.Link class={styles.Link} href="#about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
