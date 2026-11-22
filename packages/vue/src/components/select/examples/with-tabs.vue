<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { Tabs } from '@ark-ui/vue/tabs'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/select.module.css'
import tabs from 'styles/tabs.module.css'

const refs: Record<string, string[]> = {
  branches: ['main', 'develop', 'feat/date-input', 'feat/listbox-grid', 'fix/menu-focus'],
  tags: ['v6.0.0', 'v5.36.1', 'v5.36.0', 'v5.35.2', 'v5.35.1'],
}

const tab = ref('branches')
const value = ref(['main'])

const collection = computed(() => createListCollection({ items: refs[tab.value] }))
</script>

<template>
  <Select.Root :class="styles.Root" :collection="collection" v-model="value">
    <Select.Label :class="styles.Label">Switch branches or tags</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText">{{ value[0] }}</Select.ValueText>
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner :class="styles.Positioner">
        <Select.Content :class="styles.Content">
          <Tabs.Root
            :class="tabs.Root"
            :model-value="tab"
            lazy-mount
            unmount-on-exit
            @value-change="(details) => details.value && (tab = details.value)"
          >
            <Tabs.List :class="tabs.List">
              <Tabs.Trigger :class="tabs.Trigger" value="branches">Branches</Tabs.Trigger>
              <Tabs.Trigger :class="tabs.Trigger" value="tags">Tags</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content v-for="key in Object.keys(refs)" :key="key" :value="key" :class="tabs.Content">
              <Select.List :class="styles.List">
                <Select.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
                  <Select.ItemText :class="styles.ItemText">{{ item }}</Select.ItemText>
                  <Select.ItemIndicator :class="styles.ItemIndicator">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              </Select.List>
            </Tabs.Content>
          </Tabs.Root>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
  </Select.Root>
</template>
