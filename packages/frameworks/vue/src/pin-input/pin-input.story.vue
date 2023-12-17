<script setup lang="ts">
import { PinInput } from './'
import './pin-input.css'
</script>

<template>
  <Story title="Pin Input">
    <Variant title="Basic">
      <PinInput.Root @value-complete="(e) => console.log(e.valueAsString)">
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
        </PinInput.Control>
      </PinInput.Root>
    </Variant>

    <Variant title="InitialValue">
      <PinInput.Root :model-value="['1', '2', '3']">
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
        </PinInput.Control>
      </PinInput.Root>
    </Variant>

    <Variant title="Customized">
      <PinInput.Root placeholder="*">
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
        </PinInput.Control>
      </PinInput.Root>
    </Variant>

    <Variant title="Blurred">
      <PinInput.Root blurOnComplete>
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
        </PinInput.Control>
      </PinInput.Root>
    </Variant>

    <Variant title="OTPMode">
      <PinInput.Root otp>
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
        </PinInput.Control>
      </PinInput.Root>
    </Variant>

    <Variant title="WithMask">
      <PinInput.Root mask>
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
        </PinInput.Control>
      </PinInput.Root>
    </Variant>
  </Story>
</template>
