<script setup lang="ts">
import { ark } from '../..'
</script>

<template>
  <ark.div id="parent" className="parent" :style="{ background: 'red' }" asChild>
    <ark.span id="child" className="child" :style="{ color: 'blue' }" >
      Ark UI
    </ark.span>
  </ark.div>
</template>
