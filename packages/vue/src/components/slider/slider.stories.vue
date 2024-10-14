<script setup lang="ts">
import Basic from './examples/basic.vue'
import CenterOrigin from './examples/center-origin.vue'
import InitialValue from './examples/initial-value.vue'
import MinMax from './examples/min-max.vue'
import OnEvent from './examples/on-event.vue'
import RootProvider from './examples/root-provider.vue'
import Step from './examples/step.vue'
import Vertical from './examples/vertical.vue'
import WithMarks from './examples/with-marks.vue'
</script>
<template>
  <Story title="Slider">
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
    <Variant title="CenterOrigin">
      <CenterOrigin />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
