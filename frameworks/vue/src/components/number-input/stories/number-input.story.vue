<script lang="ts" setup>
import { NumberInput } from '../'
import './number-input.css'
</script>

<template>
  <Story title="Number Input">
    <Variant title="Basic">
      <NumberInput.Root>
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="MinMax">
      <NumberInput.Root :min="0" :max="10">
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="FractionDigits">
      <NumberInput.Root
        :formatOptions="{ minimumFractionDigits: 2, maximumFractionDigits: 3 }"
        model-value="1.00"
      >
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="Scrubber">
      <NumberInput.Root>
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="MouseWheel">
      <NumberInput.Root allowMouseWheel>
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="NoClamp">
      <NumberInput.Root :clampValueOnBlur="false">
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="FormUsage">
      <NumberInput.Root name="quantity">
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="Formatted">
      <NumberInput.Root :formatOptions="{ style: 'currency', currency: 'USD' }">
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
    </Variant>

    <Variant title="RenderFn">
      <NumberInput.Root v-slot="{ valueAsNumber }">
        <NumberInput.Scrubber />
        <NumberInput.Label>Label</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control>
          <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
          <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        </NumberInput.Control>
        <div>Value: {{ valueAsNumber }}</div>
      </NumberInput.Root>
    </Variant>
  </Story>
</template>
