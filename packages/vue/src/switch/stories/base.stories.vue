<script setup lang="ts">
import { Switch, SwitchInput, SwitchControl, SwitchThumb, SwitchLabel } from '../'
import '../switch.css'
</script>
<template>
  <Switch>
    <SwitchInput />
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Label</SwitchLabel>
  </Switch>
</template>
