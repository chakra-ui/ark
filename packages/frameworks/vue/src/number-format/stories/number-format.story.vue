<script setup lang="ts">
import { NumberFormat } from '../number-format'
</script>

<template>
  <Story title="Number Format">
    <Variant title="Basic">
      <span>
        <NumberFormat :value="1204" :style="'currency'" currency="EUR" />
      </span>
    </Variant>
  </Story>
</template>
