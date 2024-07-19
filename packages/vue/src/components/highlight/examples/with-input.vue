<script lang="ts" setup>
import { ref } from 'vue'
import Highlight from '../highlight.vue'

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
