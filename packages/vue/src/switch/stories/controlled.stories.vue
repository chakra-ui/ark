<script setup lang="ts">
import { ref } from 'vue'
import { Switch, SwitchInput, SwitchControl, SwitchThumb, SwitchLabel } from '../'
import '../switch.css'

const checked = ref(false)
</script>
<template>
  <Switch v-model="checked">
    <SwitchInput />
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Label</SwitchLabel>
  </Switch>
</template>
