<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.span #render="ctx">
    <a href="#" v-bind="ctx.props">Ark UI</a>
  </ark.span>
</template>
