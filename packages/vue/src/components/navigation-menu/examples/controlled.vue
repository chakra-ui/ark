<script setup lang="ts">
import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <button @click="value = 'features'">Open Features</button>
  <NavigationMenu.Root v-model:value="value">
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
  </NavigationMenu.Root>
</template>
