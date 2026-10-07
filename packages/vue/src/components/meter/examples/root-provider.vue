<script setup lang="ts">
import { Meter, useMeter } from '@ark-ui/vue/meter'
import button from 'styles/button.module.css'
import styles from 'styles/meter.module.css'

const meter = useMeter({ defaultValue: 40 })
</script>

<template>
  <div :class="styles.Stack">
    <Meter.RootProvider :class="styles.Root" :value="meter">
      <Meter.Label :class="styles.Label">Daily goal</Meter.Label>
      <Meter.ValueText :class="styles.ValueText" />
      <Meter.Track :class="styles.Track">
        <Meter.Indicator :class="styles.Indicator" />
      </Meter.Track>
    </Meter.RootProvider>
    <div class="hstack">
      <button type="button" :class="button.Root" @click="meter.setValue(meter.value - 10)">-10</button>
      <button type="button" :class="button.Root" @click="meter.setValue(meter.value + 10)">+10</button>
      <button type="button" :class="button.Root" @click="meter.setToMax()">Complete</button>
    </div>
  </div>
</template>
