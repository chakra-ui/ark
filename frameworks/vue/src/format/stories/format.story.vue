<script setup lang="ts">
import { Format } from '../'
</script>

<template>
  <Story title="Format">
    <Variant title="Basic">
      <p>
        <Format.Byte :value="120904" unit="byte" />
      </p>
      <p>
        <Format.Number :value="1204" :style="'currency'" currency="EUR" />
      </p>
    </Variant>
  </Story>
</template>
