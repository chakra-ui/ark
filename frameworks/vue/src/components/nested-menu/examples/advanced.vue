<!-- <script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '../..'

const value = ref({
  framework: '',
  libraries: [],
})
</script>

<template>
  <Menu.Root v-model="value">
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
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
        <Menu.Root>
          <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item id="twitter">Twitter</Menu.Item>
              <Menu.Item id="message">Message</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template> -->
