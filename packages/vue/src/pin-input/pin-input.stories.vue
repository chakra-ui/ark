<script setup lang="ts">
import { ref } from 'vue'
import { PinInput, PinInputControl, PinInputField, PinInputLabel, UsePinInputProps } from './'

const handleComplete: UsePinInputProps['context']['onComplete'] = (e) => alert(e.valueAsString)
</script>
<template>
  <PinInput placeholder="*" @complete="handleComplete">
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      <PinInputField v-for="id in [0, 1, 2]" :key="id" :index="id" />
    </PinInputControl>
  </PinInput>
</template>
