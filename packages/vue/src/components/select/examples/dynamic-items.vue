<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/select.module.css'
import button from 'styles/button.module.css'

const items = ref(['React', 'Solid', 'Vue', 'Svelte'])

const collection = computed(() =>
  createListCollection({
    items: items.value,
  }),
)

const addItem = () => {
  items.value = [...items.value, 'Angular']
}
</script>

<template>
  <div>
    <Select.Root :class="styles.Root" :collection="collection">
      <Select.Label :class="styles.Label">Framework</Select.Label>
      <Select.Control :class="styles.Control">
        <Select.Trigger :class="styles.Trigger">
          <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
        </Select.Trigger>
        <div :class="styles.Indicators">
          <Select.ClearTrigger :class="styles.ClearTrigger">
            <XIcon />
          </Select.ClearTrigger>
          <Select.Indicator :class="styles.Indicator">
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </div>
      </Select.Control>
      <Teleport to="body">
        <Select.Positioner>
          <Select.Content :class="styles.Content">
            <Select.ItemGroup :class="styles.ItemGroup">
              <Select.ItemGroupLabel :class="styles.ItemGroupLabel">Frameworks</Select.ItemGroupLabel>
              <Select.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
                <Select.ItemText :class="styles.ItemText">{{ item }}</Select.ItemText>
                <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
              </Select.Item>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Teleport>
    </Select.Root>

    <button :class="button.Root" style="margin-top: 1rem" type="button" @click="addItem">Add Item</button>
  </div>
</template>
