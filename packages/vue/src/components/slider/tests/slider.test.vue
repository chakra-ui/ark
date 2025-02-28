<script setup lang="ts">
import { Slider, type SliderRootBaseProps, type SliderRootEmits } from '../'
import { useForwardPropsEmits } from '../../../utils'

const props = defineProps<SliderRootBaseProps>()
const emits = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const sliderValue = [-20, 20]
</script>
<template>
  <Slider.Root v-bind="forwarded" :min="-50" :max="50" :default-value="sliderValue">
    <Slider.Label>Quantity:</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb v-for="(_, index) in sliderValue" :key="index" :index="index">
        <Slider.DraggingIndicator />
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
    <Slider.MarkerGroup>
      <Slider.Marker :value="-30">*</Slider.Marker>
      <Slider.Marker :value="0">*</Slider.Marker>
      <Slider.Marker :value="30">*</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
</template>
