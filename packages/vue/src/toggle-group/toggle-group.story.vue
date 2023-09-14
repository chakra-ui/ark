<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from './'
import './toggle-group.css'

const value = ref(['b'])
</script>

<template>
  <Story title="Toggle Group">
    <Variant title="Basic">
      <ToggleGroup.Root>
        <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
      </ToggleGroup.Root>
    </Variant>
    <Variant title="Multiple">
      <ToggleGroup.Root multiple>
        <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
      </ToggleGroup.Root>
    </Variant>
    <Variant title="Initialvalue">
      <ToggleGroup.Root v-model="value">
        <ToggleGroup.Toggle value="a">A</ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="b">B</ToggleGroup.Toggle>
        <ToggleGroup.Toggle value="c">C</ToggleGroup.Toggle>
      </ToggleGroup.Root>
    </Variant>
  </Story>
</template>
