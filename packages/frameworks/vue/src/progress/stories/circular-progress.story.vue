<script setup lang="ts">
import { Progress } from '../'
import './progress.css'
</script>

<template>
  <Story title="Progress - Circular">
    <Variant title="Basic">
      <Progress.Root>
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.View state="loading" />
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
      </Progress.Root>
    </Variant>

    <Variant title="InitialValue">
      <Progress.Root :model-value="70">
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
      </Progress.Root>
    </Variant>

    <Variant title="MinMax">
      <Progress.Root :model-value="20" :min="10" :max="30">
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
      </Progress.Root>
    </Variant>

    <Variant title="Indeterminate">
      <Progress.Root>
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.View state="indeterminate" />
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
      </Progress.Root>
    </Variant>

    <Variant title="ValueText">
      <Progress.Root
        :translations="{
          value: ({ value, max }) =>
            value == null ? 'Loading...' : `${value} of ${max} items loaded`,
        }"
      >
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
      </Progress.Root>
    </Variant>
  </Story>
</template>
