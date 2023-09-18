<script setup lang="ts">
import { ChakraToastProvider } from './chakra-toast.provider'
import ExampleComponent from './example-component.vue'
</script>
<template>
  <ChakraToastProvider>
    <h1>Hello World</h1>
    <ExampleComponent />
  </ChakraToastProvider>
</template>
