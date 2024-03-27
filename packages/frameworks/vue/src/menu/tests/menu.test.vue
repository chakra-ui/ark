<script setup lang="ts">
import { Menu } from '../'
</script>

<template>
  <Menu.Root v-slot="{ isOpen }">
    <Menu.Trigger>{{ isOpen ? 'Close' : 'Open' }} menu<Menu.Indicator /></Menu.Trigger>
    <Menu.ContextTrigger>Context Trigger</Menu.ContextTrigger>
    <Menu.Positioner data-testid="positioner">
      <Menu.Content>
        <Menu.Arrow>
          <Menu.ArrowTip />
        </Menu.Arrow>
        <span>main menu content</span>
        <Menu.Item id="search">Search</Menu.Item>
        <Menu.Item id="undo">Undo</Menu.Item>
        <Menu.Item id="delivery" disabled>Delivery</Menu.Item>
        <Menu.Item id="unlink">Unlink</Menu.Item>
        <Menu.Separator />
        <Menu.ItemGroup id="radio-group">
          <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
          <Menu.OptionItem name="framework" type="radio" value="react">
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>React</Menu.OptionItemText>
          </Menu.OptionItem>
          <Menu.OptionItem name="framework" type="radio" value="solid">
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>Solid</Menu.OptionItemText>
          </Menu.OptionItem>
          <Menu.OptionItem name="framework" type="radio" value="vue">
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>Vue</Menu.OptionItemText>
          </Menu.OptionItem>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
