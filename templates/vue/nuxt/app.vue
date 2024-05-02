<script setup lang="ts">
import Accordion from './components/accordion.vue'
import Avatar from './components/avatar.vue'
import Combobox from './components/combobox.vue'
</script>

<template>
  <h1>Welcome to Ark UI!</h1>
  <Avatar />
  <Accordion :items="['React', 'Solid', 'Vue']" />
  <Combobox />
</template>
