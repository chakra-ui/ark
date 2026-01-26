<script setup lang="ts">
import { Splitter } from '@ark-ui/vue/splitter'
import styles from 'styles/splitter.module.css'
</script>

<template>
  <Splitter.Root :class="styles.Root" :panels="[{ id: 'a' }, { id: 'b' }]">
    <Splitter.Context v-slot="splitter">
      <Splitter.Panel :class="styles.Panel" id="a">
        <button @click="splitter.resizePanel('a', 10)">Set A to 10%</button>
      </Splitter.Panel>
      <Splitter.ResizeTrigger :class="styles.ResizeTrigger" id="a:b" aria-label="Resize">
        <Splitter.ResizeTriggerIndicator :class="styles.ResizeTriggerIndicator" />
      </Splitter.ResizeTrigger>
      <Splitter.Panel :class="styles.Panel" id="b">
        <button @click="splitter.resizePanel('b', 10)">Set B to 10%</button>
      </Splitter.Panel>
    </Splitter.Context>
  </Splitter.Root>
</template>
