<script setup lang="ts">
import { ref } from 'vue'
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from './'
import './switch.css'

const checked = ref(false)
</script>

<template>
  <Story>
    <Variant title="Basic">
      <Switch>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Label</SwitchLabel>
      </Switch>
    </Variant>
    <Variant title="Controlled">
      <Switch v-model="checked">
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Label</SwitchLabel>
      </Switch>
    </Variant>
  </Story>
</template>
