<script setup lang="ts">
import { Meter, type MeterRootEmits, type MeterRootProps } from '@ark-ui/vue/meter'
import { useForwardPropsEmits } from '@ark-ui/vue'

const props = defineProps<MeterRootProps>()
const emits = defineEmits<MeterRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <Meter.Root v-bind="localProps">
    <Meter.Label>Storage used</Meter.Label>
    <Meter.ValueText />
    <Meter.Track>
      <Meter.Indicator />
    </Meter.Track>
  </Meter.Root>
</template>
