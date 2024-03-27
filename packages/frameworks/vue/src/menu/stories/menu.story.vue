<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '../'
import './menu.css'

const isOpen = ref(false)
const value = ref({
  framework: '',
  libraries: [],
})
</script>

<template>
  <Story title="Menu / Menu">
    <Variant title="Basic">
      <Menu.Root lazyMount closeOnSelect>
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item id="search">Search</Menu.Item>
            <Menu.Item id="undo">Undo</Menu.Item>
            <Menu.Item id="delivery" disabled> Delivery </Menu.Item>
            <Menu.Item id="unlink">Unlink</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Variant>

    <Variant title="Controlled">
      <button @click="isOpen = !isOpen">Trigger from the outside</button>
      <Menu.Root :open="isOpen" @select="(id) => console.log(id)">
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item id="search">Search</Menu.Item>
            <Menu.Item id="undo">Undo</Menu.Item>
            <Menu.Item id="delivery" disabled> Delivery </Menu.Item>
            <Menu.Item id="unlink">Unlink</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Variant>

    <Variant title="Group">
      <Menu.Root>
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup id="group-1">
              <Menu.ItemGroupLabel htmlFor="group-1">Group 1</Menu.ItemGroupLabel>
              <Menu.Item id="share">Share...</Menu.Item>
              <Menu.Item id="move">Move...</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup id="group-2">
              <Menu.ItemGroupLabel htmlFor="group-2">Group 2</Menu.ItemGroupLabel>
              <Menu.Item id="rename">Rename...</Menu.Item>
              <Menu.Item id="delete">Delete...</Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Variant>

    <Variant title="Separator">
      <Menu.Root>
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item id="search">Search</Menu.Item>
            <Menu.Item id="undo">Undo</Menu.Item>
            <Menu.Separator />
            <Menu.Item id="delivery" disabled> Delivery </Menu.Item>
            <Menu.Item id="unlink">Unlink</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Variant>

    <Variant title="Options">
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
            <Menu.ItemGroup id="checkbox-group">
              <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
                <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
                <Menu.OptionItemText>Zag.js</Menu.OptionItemText>
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="ark">
                <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
                <Menu.OptionItemText>Ark UI</Menu.OptionItemText>
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="panda">
                <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
                <Menu.OptionItemText>Panda CSS</Menu.OptionItemText>
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
                <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
                <Menu.OptionItemText>Chakra UI</Menu.OptionItemText>
              </Menu.OptionItem>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Variant>
  </Story>
</template>
