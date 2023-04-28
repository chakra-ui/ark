<script setup lang="ts">
import { PinInput, PinInputControl, PinInputField, PinInputLabel, type PinInputProps } from './'

const handleComplete: PinInputProps['onComplete'] = (e) => alert(e.valueAsString)
</script>
<template>
  <Story title="PinInput - Basic">
    <PinInput placeholder="*" @complete="handleComplete">
      <PinInputLabel>Label</PinInputLabel>
      <PinInputControl>
        <PinInputField v-for="id in [0, 1, 2]" :key="id" :index="id" />
      </PinInputControl>
    </PinInput>
  </Story>
</template>
