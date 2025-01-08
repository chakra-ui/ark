<script setup lang="ts">
import ByteBasic from './examples/byte-basic.vue'
import ByteSizes from './examples/byte-sizes.vue'
import ByteWithLocale from './examples/byte-with-locale.vue'
import ByteWithUnitDisplay from './examples/byte-with-unit-display.vue'
import ByteWithUnit from './examples/byte-with-unit.vue'
import NumberBasic from './examples/number-basic.vue'
import NumberWithCompact from './examples/number-with-compact.vue'
import NumberWithCurrency from './examples/number-with-currency.vue'
import NumberWithLocale from './examples/number-with-locale.vue'
import NumberWithPercentage from './examples/number-with-percentage.vue'
import NumberWithUnit from './examples/number-with-unit.vue' /* PartiallyEnd: #3632/scriptSetup.vue */
import NumberWithUnit from './examples/number-with-unit.vue'
</script>

<template>
  <Story title="Format">
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
    <Variant title="Byte Basic">
      <ByteBasic />
    </Variant>
    <Variant title="Byte Sizes">
      <ByteSizes />
    </Variant>
    <Variant title="Byte with Locale">
      <ByteWithLocale />
    </Variant>
    <Variant title="Byte with Unit">
      <ByteWithUnit />
    </Variant>
    <Variant title="Byte with Unit Display">
      <ByteWithUnitDisplay />
    </Variant>
    <Variant title="Number with Currency">
      <NumberWithCurrency />
    </Variant>
  </Story>
</template>
