<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { ref, useId } from 'vue'
import styles from 'styles/slider.module.css'
import tooltip from 'styles/tooltip.module.css'

const thumbId = useId()
const open = ref(false)
</script>

<template>
  <Slider.Root :class="styles.Root" :default-value="[40]" :ids="{ thumb: () => thumbId }">
    <Slider.Label :class="styles.Label">Volume</Slider.Label>
    <Slider.Control :class="styles.Control">
      <Slider.Track :class="styles.Track">
        <Slider.Range :class="styles.Range" />
      </Slider.Track>
      <Slider.Context v-slot="slider">
        <Tooltip.Root
          :ids="{ trigger: thumbId }"
          :open="open || slider.dragging"
          :open-delay="0"
          :close-on-click="false"
          :close-on-pointer-down="false"
          :positioning="{ placement: 'top' }"
          @open-change="(details) => (open = details.open)"
        >
          <Tooltip.Trigger #render="ctx">
            <Slider.Thumb v-bind="ctx.props" :index="0" :class="styles.Thumb">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Tooltip.Trigger>
          <Teleport to="body">
            <Tooltip.Positioner :class="tooltip.Positioner">
              <Tooltip.Content :class="tooltip.Content">{{ slider.value[0] }}</Tooltip.Content>
            </Tooltip.Positioner>
          </Teleport>
        </Tooltip.Root>
      </Slider.Context>
    </Slider.Control>
  </Slider.Root>
</template>
