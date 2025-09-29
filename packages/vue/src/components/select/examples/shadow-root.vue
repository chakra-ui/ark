<script setup lang="ts">
import { EnvironmentProvider } from '@ark-ui/vue/environment'
import { Select, createListCollection } from '@ark-ui/vue/select'
import { onMounted, ref } from 'vue'

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
        <Select.Root :collection="collection">
          <Select.Label>Framework</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <Select.Indicator>▼</Select.Indicator>
            </Select.Trigger>
            <Select.ClearTrigger>Clear</Select.ClearTrigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <Select.Item v-for="item in collection.items" :key="item" :item="item">
                  <Select.ItemText>{{ item }}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
          <Select.HiddenSelect />
        </Select.Root>
      </EnvironmentProvider>
    </Teleport>
  </div>
</template>
