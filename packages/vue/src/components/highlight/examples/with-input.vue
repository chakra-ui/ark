<script lang="ts" setup>
import { Highlight } from '@ark-ui/vue/highlight'
import { ref } from 'vue'

const query = ref('ipsum')
</script>

<template>
  <div>
    <input type="text" placeholder="Search" v-model="query" />
    <br />
    <Highlight
      :query="query"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
    />
  </div>
</template>
