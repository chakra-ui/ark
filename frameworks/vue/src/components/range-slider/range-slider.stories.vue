<script setup lang="ts">
import Basic from './examples/basic.vue'
import InitialValue from './examples/initial-value.vue'
import MinMax from './examples/min-max.vue'
import OnEvent from './examples/on-event.vue'
import Step from './examples/step.vue'
import ThumbOverlap from './examples/thumb-overlap.vue'
import Vertical from './examples/vertical.vue'
import WithMarks from './examples/with-marks.vue'
</script>
<template>
  <Story title="RangeSlider">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="WithMarks">
      <WithMarks />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="MinMax">
      <MinMax />
    </Variant>
    <Variant title="Step">
      <Step />
    </Variant>
    <Variant title="OnEvent">
      <OnEvent />
    </Variant>
    <Variant title="Vertical">
      <Vertical />
    </Variant>
    <Variant title="ThumbOverlap">
      <ThumbOverlap />
    </Variant>
  </Story>
</template>
