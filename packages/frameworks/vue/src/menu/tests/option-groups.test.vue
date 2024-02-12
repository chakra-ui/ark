<script lang="ts" setup>
import { ref } from 'vue'
import { Menu } from '../'

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
          <Menu.OptionItem name="framework" type="radio" value="react" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} React
          </Menu.OptionItem>
          <Menu.OptionItem name="framework" type="radio" value="solid" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} Solid
          </Menu.OptionItem>
          <Menu.OptionItem name="framework" type="radio" value="vue" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} Solid
          </Menu.OptionItem>
        </Menu.ItemGroup>
        <Menu.ItemGroup id="checkbox-group">
          <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
          <Menu.OptionItem name="libraries" type="checkbox" value="zag-js" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} zag-js
          </Menu.OptionItem>
          <Menu.OptionItem name="libraries" type="checkbox" value="ark" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} ark
          </Menu.OptionItem>
          <Menu.OptionItem name="libraries" type="checkbox" value="panda" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} panda
          </Menu.OptionItem>
          <Menu.OptionItem name="libraries" type="checkbox" value="chakra" v-slot="{ isChecked }">
            {{ isChecked ? '✅' : '' }} chakra
          </Menu.OptionItem>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
