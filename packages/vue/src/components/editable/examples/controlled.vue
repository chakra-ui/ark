<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { PencilIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/editable.module.css'

const value = ref('Hello World')
</script>

<template>
  <Editable.Root :class="styles.Root" placeholder="Enter text..." v-model="value">
    <Editable.Label :class="styles.Label">Label</Editable.Label>
    <Editable.Area :class="styles.Area">
      <Editable.Input :class="styles.Input" />
      <Editable.Preview :class="styles.Preview" />
    </Editable.Area>
    <Editable.Control :class="styles.Control">
      <Editable.EditTrigger :class="styles.EditTrigger">
        <PencilIcon />
      </Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
