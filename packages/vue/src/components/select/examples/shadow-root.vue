<script setup lang="ts">
import { EnvironmentProvider } from '@ark-ui/vue/environment'
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import styles from 'styles/select.module.css'

const shadowHostRef = ref<HTMLDivElement>()
const shadowRoot = ref<ShadowRoot>()

const collection = createListCollection({
  items: ['React', 'Solid', 'Vue', 'Svelte'],
})

onMounted(() => {
  if (shadowHostRef.value && !shadowRoot.value) {
    shadowRoot.value = shadowHostRef.value.attachShadow({ mode: 'open' })
  }
})

const env = () => shadowRoot.value ?? globalThis.document
</script>

<template>
  <div>
    <div ref="shadowHostRef" />
    <Teleport to="body" v-if="shadowRoot">
      <EnvironmentProvider :value="env">
        <Select.Root :class="styles.Root" :collection="collection">
          <Select.Label :class="styles.Label">Framework</Select.Label>
          <Select.Control :class="styles.Control">
            <Select.Trigger :class="styles.Trigger">
              <Select.ValueText :class="styles.ValueText" placeholder="Select a Framework" />
              <Select.Indicator :class="styles.Indicator">
                <ChevronsUpDownIcon />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content :class="styles.Content">
              <Select.Item v-for="item in collection.items" :key="item" :item="item" :class="styles.Item">
                <Select.ItemText :class="styles.ItemText">{{ item }}</Select.ItemText>
                <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
              </Select.Item>
            </Select.Content>
          </Select.Positioner>
          <Select.HiddenSelect />
        </Select.Root>
      </EnvironmentProvider>
    </Teleport>
  </div>
</template>
