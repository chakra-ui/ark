<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '../'
import './slider.css'

const sliderValue = ref([-10, 20])
</script>

<template>
  <Story title="Slider">
    <Variant title="Basic">
      <Slider.Root>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
      </Slider.Root>
    </Variant>

    <Variant title="Range">
      <Slider.Root :min="-50" :max="50" v-model="sliderValue">
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
          <Slider.Thumb :key="1" :index="1" />
        </Slider.Control>
        <Slider.MarkerGroup>
          <Slider.Marker :value="-30">*</Slider.Marker>
          <Slider.Marker :value="0">*</Slider.Marker>
          <Slider.Marker :value="30">*</Slider.Marker>
        </Slider.MarkerGroup>
      </Slider.Root>
    </Variant>

    <Variant title="WithMarks">
      <Slider.Root>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
        <Slider.MarkerGroup>
          <Slider.Marker :value="0">0</Slider.Marker>
          <Slider.Marker :value="25">*</Slider.Marker>
          <Slider.Marker :value="50">50</Slider.Marker>
          <Slider.Marker :value="75">*</Slider.Marker>
        </Slider.MarkerGroup>
      </Slider.Root>
    </Variant>

    <Variant title="InitialValue">
      <Slider.Root :model-value="[42]">
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
        <Slider.MarkerGroup>
          <Slider.Marker :value="0">*</Slider.Marker>
          <Slider.Marker :value="30">*</Slider.Marker>
          <Slider.Marker :value="60">*</Slider.Marker>
        </Slider.MarkerGroup>
      </Slider.Root>
    </Variant>

    <Variant title="MinMax">
      <Slider.Root :min="-10" :max="10">
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
      </Slider.Root>
    </Variant>

    <Variant title="Step">
      <Slider.Root :step="0.01" :min="5" :max="10">
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
      </Slider.Root>
    </Variant>

    <Variant title="OnEvent">
      <Slider.Root
        @value-change="(details) => console.log(details.value)"
        @value-change-end="(details) => console.log(details.value)"
      >
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
      </Slider.Root>
    </Variant>

    <Variant title="Vertical">
      <Slider.Root orientation="vertical">
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
      </Slider.Root>
    </Variant>

    <Variant title="CenterOrigin">
      <Slider.Root origin="center">
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb :key="0" :index="0" />
        </Slider.Control>
      </Slider.Root>
    </Variant>
  </Story>
</template>
