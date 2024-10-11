<script setup lang="ts">
import { Highlight } from '@ark-ui/vue/highlight'
</script>

<template>
  <div>
    <h3>Match All</h3>
    <Highlight text="The quick brown fox jumps over the lazy fox." query="fox" :matchAll="true" />

    <h3>Match First Occurrence Only</h3>
    <Highlight text="The quick brown fox jumps over the lazy fox." query="fox" :matchAll="false" />
  </div>
</template>
