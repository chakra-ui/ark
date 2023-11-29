export const react = `import { Slider } from '@ark-ui/react'
import { useState } from 'react'
  
export const MySlider = () => {
  const [value, setValue] = useState([30])
    
  return (
    <Slider.Root
      min={-50}
      max={50}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{value}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider.Root>
  )
}`

export const solid = `import { Slider } from '@ark-ui/solid'
import { createSignal } from 'solid-js'

export const MySlider = () => {
  const [value, setValue] = createSignal([30])

  return (
    <Slider.Root
      min={-50}
      max={50}
      value={value()}
      onValueChange={(e) => setValue(e.value)}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{value}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider.Root>
  )
}`

export const vue = `<script setup lang="ts">
import { Slider } from '@ark-ui/vue'
import { ref } from 'vue'

const sliderValue = ref<SliderProps['modelValue']>([30])
</script>

<template>
  <Slider.Root :min="-50" :max="50" v-model="sliderValue">
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText>{{ sliderValue }}</Slider.ValueText>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :key="0" :index="0" />
    </Slider.Control>
  </Slider.Root>
</template>`
