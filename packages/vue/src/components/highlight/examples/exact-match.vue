<script lang="ts" setup>
import { Highlight } from '@ark-ui/vue/highlight'
</script>

<template>
  <div>
    <p>Without exactMatch (highlights partial matches):</p>
    <Highlight query="cat" text="The cat is in the category. A cat-like creature." :match-all="true" />
    <p style="margin-top: 1rem">With exactMatch (highlights whole words only):</p>
    <Highlight
      query="cat"
      text="The cat is in the category. A cat-like creature."
      :exact-match="true"
      :match-all="true"
    />
  </div>
</template>
