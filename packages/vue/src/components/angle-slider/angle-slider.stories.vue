<script setup lang="ts">
import Basic from './examples/basic.vue'
import Controlled from './examples/controlled.vue'
import Steps from './examples/steps.vue'
</script>
<template>
  <Story title="AngleSlider">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="Steps">
      <Steps />
    </Variant>
  </Story>
</template>
