<script setup lang="ts">
import { ref } from 'vue'
import { Presence, type PresenceEmits, type PresenceProps } from '../..'
import { useForwardPropsEmits } from '../../..'

const props = defineProps<PresenceProps>()
const emits = defineEmits<PresenceEmits>()
const localProps = useForwardPropsEmits(props, emits)

const isPresent = ref(false)
</script>

<template>
  <div>
    <button @click="isPresent = !isPresent">Toggle</button>
    <Presence v-bind="localProps" :present="isPresent">
      <div data-testid="box">Content!</div>
    </Presence>
  </div>
</template>
