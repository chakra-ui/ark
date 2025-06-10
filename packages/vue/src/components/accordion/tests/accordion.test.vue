<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { Accordion, type AccordionRootEmits, type AccordionRootProps } from '../'
import { useForwardPropsEmits } from '../../../utils'

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()
const localProps = useForwardPropsEmits(props, emits)

const items = ref([{ value: 'React' }, { value: 'Solid' }, { value: 'Svelte', disabled: true }, { value: 'Vue' }])
</script>

<template>
  <Accordion.Root v-bind="localProps">
    <Accordion.Item v-for="item in items" :key="item.value" :value="item.value" :disabled="item.disabled">
      <Accordion.ItemTrigger>
        {{ item.value }} Trigger
        <Accordion.ItemIndicator>{{ '>' }}</Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{{ item.value }} Content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
