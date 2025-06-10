<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, type TabsRootEmits, type TabsRootProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<TabsRootProps>()
const emits = defineEmits<TabsRootEmits>()
const localProps = useForwardPropsEmits(props, emits)

const items = ref([{ value: 'React' }, { value: 'Solid' }, { value: 'Svelte', disabled: true }, { value: 'Vue' }])
</script>
<template>
  <Tabs.Root v-bind="localProps">
    <Tabs.List>
      <Tabs.Trigger v-for="(item, idx) in items" :key="idx" :value="item.value" :disabled="item.disabled">
        {{ item.value }} Trigger
      </Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content v-for="(item, idx) in items" :key="idx" :value="item.value">{{ item.value }} Content</Tabs.Content>
  </Tabs.Root>
</template>
