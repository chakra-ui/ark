<script setup lang="ts">
import { Environment } from '../'
import { ark } from '../../factory'
import PrintEnvironment from './print-environment.vue'
</script>

<template>
  <ark.iframe>
    <Environment>
      <PrintEnvironment />
    </Environment>
  </ark.iframe>
</template>
