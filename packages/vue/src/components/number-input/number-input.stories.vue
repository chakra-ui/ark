<script setup lang="ts">
import Basic from './examples/basic.vue'
import FormUsage from './examples/form-usage.vue'
import Formatted from './examples/formatted.vue'
import FractionDigits from './examples/fraction-digits.vue'
import MinMax from './examples/min-max.vue'
import MouseWheel from './examples/mouse-wheel.vue'
import NoClamp from './examples/no-clamp.vue'
import RenderFn from './examples/render-fn.vue'
import RootProvider from './examples/root-provider.vue'
import Scrubber from './examples/scrubber.vue'
</script>
<template>
  <Story title="NumberInput">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="MinMax">
      <MinMax />
    </Variant>
    <Variant title="FractionDigits">
      <FractionDigits />
    </Variant>
    <Variant title="Scrubber">
      <Scrubber />
    </Variant>
    <Variant title="MouseWheel">
      <MouseWheel />
    </Variant>
    <Variant title="NoClamp">
      <NoClamp />
    </Variant>
    <Variant title="FormUsage">
      <FormUsage />
    </Variant>
    <Variant title="Formatted">
      <Formatted />
    </Variant>
    <Variant title="RenderFn">
      <RenderFn />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
