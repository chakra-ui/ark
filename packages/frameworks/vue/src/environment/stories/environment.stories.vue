<script setup lang="ts">
import PrintEnvironment from './print-environment.vue'
import { Environment } from '../environment'
import { ark } from '../../factory'
</script>

<template>
  <ark.iframe>
    <Environment>
      <PrintEnvironment />
    </Environment>
  </ark.iframe>
</template>
