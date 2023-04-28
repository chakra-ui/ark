import { highlightCode } from './highlightCode'

const react = `import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/react'
import { useState } from 'react'
  
export const MySlider = () => {
  const [value, setValue] = useState(30)
    
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={(e) => setValue(e.value)}
    >
      <SliderLabel>Label</SliderLabel>
      <SliderOutput>{value}</SliderOutput>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>
  )
}`

const solid = `import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/solid'
import { createSignal } from 'solid-js'

export const MySlider = () => {
  const [value, setValue] = createSignal(30)

  return (
    <Slider
      min={-50}
      max={50}
      value={value()}
      onChange={(e) => setValue(e.value)}
    >
      <SliderLabel>Label</SliderLabel>
      <SliderOutput>{value}</SliderOutput>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>
  )
}
`

const vue = `<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderOutput,
  SliderProps,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/vue'
import { ref } from 'vue'

const sliderValue = ref<SliderProps['modelValue']>(30)
</script>

<template>
  <Slider :min="-50" :max="50" v-model="sliderValue">
    <SliderLabel>Label</SliderLabel>
    <SliderOutput>{{ sliderValue }}</SliderOutput>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
  </Slider>
</template>`

type GetCodeExamplesReturn = Record<'react' | 'solid' | 'vue', string>

export const getCodeExamples = async (): Promise<GetCodeExamplesReturn> => {
  const examples = await Promise.all(
    Object.entries({ react, solid, vue }).map(async ([key, value]) => [
      key,
      await highlightCode(value, key === 'vue' ? 'vue' : 'tsx'),
    ]),
  )
  return Object.fromEntries(examples)
}
