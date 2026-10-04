<script lang="ts">
  import { NavigationMenu } from '@ark-ui/svelte/navigation-menu'
  import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
  import styles from 'styles/navigation-menu.module.css'
</script>

<NavigationMenu.Root class={styles.Root}>
  <NavigationMenu.List class={styles.List}>
    <NavigationMenu.Item class={styles.Item} value="home">
      <NavigationMenu.Link class={styles.Link} href="#home" current>Home</NavigationMenu.Link>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="products">
      <NavigationMenu.Trigger class={styles.Trigger}>
        Products
        <span class={styles.TriggerIcon}>
          <ChevronDownIcon />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content class={styles.Content}>
        <NavigationMenu.Link class={styles.ContentLink} href="#analytics">Analytics</NavigationMenu.Link>
        <NavigationMenu.Link class={styles.ContentLink} href="#commerce">Commerce</NavigationMenu.Link>
        <NavigationMenu.Link class={styles.ContentLink} href="#payments">Payments</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item class={styles.Item} value="about">
      <NavigationMenu.Link class={styles.Link} href="#about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
