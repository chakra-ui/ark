<script setup lang="ts">
import { NumberInput } from '@ark-ui/vue/number-input'
import { Slider } from '@ark-ui/vue/slider'
import { computed, ref } from 'vue'
import numberInput from 'styles/number-input.module.css'
import styles from 'styles/slider.module.css'

const min = 0
const max = 1000
const step = 10
const minStepsBetweenThumbs = 5
const gap = step * minStepsBetweenThumbs

const value = ref<(number | null)[]>([200, 600])
const start = computed(() => value.value[0] ?? min)
const end = computed(() => value.value[1] ?? max)

const sliderValue = computed(() => [
  Math.min(Math.max(start.value, min), max - gap),
  Math.min(Math.max(end.value, start.value + gap), max),
])

const setValueAt = (index: number, next: number | null) => {
  value.value = value.value.map((v, i) => (i === index ? next : v))
}

const getAriaLabel = ({ index }: { index: number }) => (index === 0 ? 'Minimum price' : 'Maximum price')
</script>

<template>
  <div class="stack">
    <Slider.Root
      :class="styles.Root"
      :min="min"
      :max="max"
      :step="step"
      :min-steps-between-thumbs="minStepsBetweenThumbs"
      :model-value="sliderValue"
      :get-aria-label="getAriaLabel"
      @value-change="(details) => (value = details.value)"
    >
      <Slider.Label :class="styles.Label">Price range</Slider.Label>
      <Slider.Control :class="styles.Control">
        <Slider.Track :class="styles.Track">
          <Slider.Range :class="styles.Range" />
        </Slider.Track>
        <Slider.Thumb :index="0" :class="styles.Thumb">
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb :index="1" :class="styles.Thumb">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
    <div class="hstack">
      <NumberInput.Root
        :class="numberInput.Root"
        :model-value="value[0]"
        :min="min"
        :max="end - gap"
        :step="step"
        @value-change="(details) => setValueAt(0, details.value)"
      >
        <NumberInput.Label :class="numberInput.Label">Min</NumberInput.Label>
        <NumberInput.Control :class="numberInput.Control">
          <NumberInput.Input :class="numberInput.Input" />
        </NumberInput.Control>
      </NumberInput.Root>
      <NumberInput.Root
        :class="numberInput.Root"
        :model-value="value[1]"
        :min="start + gap"
        :max="max"
        :step="step"
        @value-change="(details) => setValueAt(1, details.value)"
      >
        <NumberInput.Label :class="numberInput.Label">Max</NumberInput.Label>
        <NumberInput.Control :class="numberInput.Control">
          <NumberInput.Input :class="numberInput.Input" />
        </NumberInput.Control>
      </NumberInput.Root>
    </div>
  </div>
</template>
