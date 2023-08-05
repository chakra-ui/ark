<script setup lang="ts">
import { PinInput, PinInputControl, PinInputHiddenInput, PinInputInput, PinInputLabel } from './'

const handleComplete = (e: any) => alert(e.valueAsString)
</script>
<template>
  <PinInput placeholder="*" @complete="handleComplete">
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      <PinInputInput v-for="id in [0, 1, 2]" :key="id" :index="id" />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</template>
