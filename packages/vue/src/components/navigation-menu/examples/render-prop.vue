<script setup lang="ts">
import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
</script>

<template>
  <NavigationMenu.Root>
    <NavigationMenu.Context v-slot="api">
      <pre>Current Value: {{ api.value || 'none' }}</pre>

      <NavigationMenu.List>
        <NavigationMenu.Item value="features">
          <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
            <NavigationMenu.Link href="#features">Features</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="docs">
          <NavigationMenu.Trigger>Documentation</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#introduction">Introduction</NavigationMenu.Link>
            <NavigationMenu.Link href="#installation">Installation</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="about">
          <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Context>
  </NavigationMenu.Root>
</template>
