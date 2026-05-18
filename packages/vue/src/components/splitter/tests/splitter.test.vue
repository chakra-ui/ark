<script setup lang="ts">
import { ref } from 'vue'
import { Splitter, type SplitterRootEmits, type SplitterRootProps } from '../../index.ts'
import { useForwardPropsEmits } from '../../../index.ts'

const panels = ref([{ id: 'a' }, { id: 'b' }])

const props = defineProps<SplitterRootProps>()
const emits = defineEmits<SplitterRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Splitter.Root :panels="panels" v-bind="localProps">
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
</template>
