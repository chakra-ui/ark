<script setup lang="ts">
import { NavigationMenu, type NavigationMenuRootEmits, type NavigationMenuRootProps } from '@ark-ui/vue/navigation-menu'
import { useForwardPropsEmits } from '@ark-ui/vue'

const props = defineProps<NavigationMenuRootProps>()
const emits = defineEmits<NavigationMenuRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <NavigationMenu.Root v-bind="localProps">
    <NavigationMenu.List>
      <NavigationMenu.Item value="overview">
        <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#quick-start" @select="() => {}">Quick Start</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
</template>
