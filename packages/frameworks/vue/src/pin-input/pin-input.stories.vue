<script setup lang="ts">
import { PinInput, PinInputControl, PinInputField, PinInputLabel, type PinInputContext } from './'

const handleComplete: PinInputContext['onComplete'] = (e) => alert(e.valueAsString)
</script>
<template>
  <PinInput placeholder="*" @complete="handleComplete">
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      <PinInputField v-for="id in [0, 1, 2]" :key="id" :index="id" />
    </PinInputControl>
  </PinInput>
</template>
