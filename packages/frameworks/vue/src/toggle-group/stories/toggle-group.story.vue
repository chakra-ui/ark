<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '../'
import './toggle-group.css'

const value = ref(['b'])
</script>

<template>
  <Story title="Toggle Group">
    <Variant title="Basic">
      <ToggleGroup.Root>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup.Root>
    </Variant>

    <Variant title="InitialValue">
      <ToggleGroup.Root v-model="value">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup.Root>
    </Variant>

    <Variant title="Multiple">
      <ToggleGroup.Root multiple>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup.Root>
    </Variant>
  </Story>
</template>
