<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection'
import { Menu } from '@ark-ui/vue/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/menu.module.css'

interface Item {
  value: string
  label: string
  group: string
  type?: 'checkbox' | 'radio'
}

const collection = createListCollection<Item>({
  items: [
    { value: 'new-file', label: 'New file', group: 'File' },
    { value: 'open-file', label: 'Open file', group: 'File' },
    { value: 'toolbar', label: 'Show toolbar', group: 'View', type: 'checkbox' },
    { value: 'status-bar', label: 'Show status bar', group: 'View', type: 'checkbox' },
    { value: 'name', label: 'Name', group: 'Sort by', type: 'radio' },
    { value: 'date', label: 'Date modified', group: 'Sort by', type: 'radio' },
  ],
  groupBy: (item) => item.group,
  groupSort: ['File', 'View', 'Sort by'],
})

const checked = ref(['toolbar'])
const sortBy = ref('date')

const toggle = (value: string, isChecked: boolean) => {
  checked.value = isChecked ? [...checked.value, value] : checked.value.filter((v) => v !== value)
}
</script>

<template>
  <Menu.Root :collection="collection">
    <Menu.Trigger :class="styles.Trigger">
      File
      <Menu.Indicator :class="styles.Indicator">
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner :class="styles.Positioner">
      <Menu.Content :class="styles.Content">
        <Menu.List :class="styles.List">
          <template v-for="[group, items] in collection.group()" :key="group">
            <Menu.RadioItemGroup v-if="items[0]?.type === 'radio'" :class="styles.ItemGroup" v-model="sortBy">
              <Menu.ItemGroupLabel :class="styles.ItemGroupLabel">{{ group }}</Menu.ItemGroupLabel>
              <Menu.RadioItem v-for="item in items" :key="item.value" :class="styles.RadioItem" :value="item.value">
                <Menu.ItemIndicator :class="styles.ItemIndicator">
                  <CheckIcon />
                </Menu.ItemIndicator>
                <Menu.ItemText :class="styles.ItemText">{{ item.label }}</Menu.ItemText>
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
            <Menu.ItemGroup v-else :class="styles.ItemGroup">
              <Menu.ItemGroupLabel :class="styles.ItemGroupLabel">{{ group }}</Menu.ItemGroupLabel>
              <template v-for="item in items" :key="item.value">
                <Menu.CheckboxItem
                  v-if="item.type === 'checkbox'"
                  :class="styles.CheckboxItem"
                  :value="item.value"
                  :close-on-select="false"
                  :checked="checked.includes(item.value)"
                  @update:checked="(isChecked: boolean) => toggle(item.value, isChecked)"
                >
                  <Menu.ItemIndicator :class="styles.ItemIndicator">
                    <CheckIcon />
                  </Menu.ItemIndicator>
                  <Menu.ItemText :class="styles.ItemText">{{ item.label }}</Menu.ItemText>
                </Menu.CheckboxItem>
                <Menu.Item v-else :class="styles.Item" :value="item.value">{{ item.label }}</Menu.Item>
              </template>
            </Menu.ItemGroup>
          </template>
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
