<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import styles from 'styles/editable.module.css'
</script>

<template>
  <Editable.Root
    :class="styles.Root"
    placeholder="Enter a description..."
    defaultValue="Ark UI is a headless component library for building reusable, scalable design systems."
    activationMode="dblclick"
  >
    <Editable.Label :class="styles.Label">Description</Editable.Label>
    <Editable.Area :class="styles.Area">
      <Editable.Input :class="styles.Textarea" asChild>
        <textarea />
      </Editable.Input>
      <Editable.Preview :class="styles.Textarea" />
    </Editable.Area>
    <div :class="styles.HelperText">Press Cmd + Enter to save</div>
  </Editable.Root>
</template>
