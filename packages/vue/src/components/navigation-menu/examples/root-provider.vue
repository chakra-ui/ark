<script setup lang="ts">
import { NavigationMenu, useNavigationMenu } from '@ark-ui/vue/navigation-menu'

const navigationMenu = useNavigationMenu()
</script>

<template>
  <button @click="navigationMenu.setValue('features')">Open Features</button>

  <NavigationMenu.RootProvider :value="navigationMenu">
    <NavigationMenu.List>
      <NavigationMenu.Item value="features">
        <NavigationMenu.Trigger value="features">Features</NavigationMenu.Trigger>
        <NavigationMenu.Content value="features">
          <NavigationMenu.Link href="#overview" value="features">Overview</NavigationMenu.Link>
          <NavigationMenu.Link href="#features" value="features">Features</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger value="docs">Documentation</NavigationMenu.Trigger>
        <NavigationMenu.Content value="docs">
          <NavigationMenu.Link href="#introduction" value="docs">Introduction</NavigationMenu.Link>
          <NavigationMenu.Link href="#installation" value="docs">Installation</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item value="about">
        <NavigationMenu.Link href="#about" value="about">About</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.RootProvider>
</template>
