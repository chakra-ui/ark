<script setup lang="ts">
import {
  Switch,
  SwitchInput,
  SwitchControl,
  SwitchThumb,
  SwitchLabel,
  type SwitchContext,
} from '../'
import '../switch.css'
</script>
<template>
  <Switch v-slot="{ isChecked }: SwitchContext">
    <SwitchInput />
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Feature is {{ isChecked ? 'enabled' : 'disabled' }}</SwitchLabel>
  </Switch>
</template>
