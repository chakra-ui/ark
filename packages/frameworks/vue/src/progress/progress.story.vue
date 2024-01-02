<script setup lang="ts">
import { Progress } from './'
import './progress.css'
</script>

<template>
  <Story title="Progress">
    <Variant title="Basic">
      <Progress.Root>
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Indicator state="loading" />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Variant>

    <Variant title="InitialValue">
      <Progress.Root :model-value="70">
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Variant>

    <Variant title="Max">
      <Progress.Root :model-value="20" :max="30">
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Variant>

    <Variant title="Circular">
      <Progress.Root :model-value="40">
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
      </Progress.Root>
    </Variant>

    <Variant title="Vertical">
      <Progress.Root orientation="vertical">
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Variant>
  </Story>
</template>
