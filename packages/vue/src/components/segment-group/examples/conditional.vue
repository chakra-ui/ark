<script setup lang="ts">
import { SegmentGroup } from '@ark-ui/vue/segment-group'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/segment-group.module.css'

const show = ref(false)
const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="show = !show">
      {{ show ? 'Hide' : 'Show' }}
    </button>
    <SegmentGroup.Root v-if="show" :class="styles.Root" default-value="React">
      <SegmentGroup.Indicator :class="styles.Indicator" />
      <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :class="styles.Item" :value="framework">
        <SegmentGroup.ItemText :class="styles.ItemText">{{ framework }}</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl :class="styles.ItemControl" />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  </div>
</template>
