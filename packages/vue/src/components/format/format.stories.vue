<script setup lang="ts">
import Basic from './examples/basic.vue'
import NumberBasic from './examples/number-basic.vue'
import NumberWithCompact from './examples/number-with-compact.vue'
import NumberWithLocale from './examples/number-with-locale.vue'
import NumberWithPercentage from './examples/number-with-percentage.vue'
import NumberWithUnit from './examples/number-with-unit.vue'
</script>

<template>
  <Story title="Format">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Number Basic">
      <NumberBasic />
    </Variant>
    <Variant title="Number with Locale">
      <NumberWithLocale />
    </Variant>
    <Variant title="Number with Unit">
      <NumberWithUnit />
    </Variant>
    <Variant title="Number with Percentage">
      <NumberWithPercentage />
    </Variant>
    <Variant title="Number with Compact">
      <NumberWithCompact />
    </Variant>
  </Story>
</template>
