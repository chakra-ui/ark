<script setup lang="ts">
import { Splitter, useSplitter } from '@ark-ui/vue/splitter'
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import styles from 'styles/splitter.module.css'

const rootRef = ref<HTMLDivElement | null>(null)
const rootSize = ref<number | null>(null)

const isBelowMd = computed(() => rootSize.value != null && rootSize.value < 600)

const splitterProps = computed(() => ({
  panels: [{ id: 'a', collapsible: isBelowMd.value, collapsedSize: 5, minSize: 20, maxSize: 40 }, { id: 'b' }],
  defaultSize: [15, 85],
}))

const splitter = useSplitter(splitterProps)

const handleResize = () => {
  rootSize.value = rootRef.value?.offsetWidth ?? null
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(isBelowMd, (below) => {
  if (below) splitter.value.collapsePanel('a')
  else splitter.value.expandPanel('a')
})
</script>

<template>
  <div ref="rootRef" style="width: 100%">
    <Splitter.RootProvider :class="styles.Root" :value="splitter">
      <Splitter.Panel :class="styles.Panel" id="a">A</Splitter.Panel>
      <Splitter.ResizeTrigger :class="styles.ResizeTrigger" id="a:b" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator :class="styles.ResizeTriggerIndicator" />
      </Splitter.ResizeTrigger>
      <Splitter.Panel :class="styles.Panel" id="b">B</Splitter.Panel>
    </Splitter.RootProvider>
  </div>
</template>
