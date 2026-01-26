<script setup lang="ts">
import { Editable } from '@ark-ui/vue/editable'
import { CheckIcon, PencilIcon, XIcon } from 'lucide-vue-next'
import styles from 'styles/editable.module.css'
</script>

<template>
  <Editable.Root :class="styles.Root" defaultValue="Click edit to start">
    <Editable.Label :class="styles.Label">Label</Editable.Label>
    <Editable.Area :class="styles.Area">
      <Editable.Input :class="styles.Input" />
      <Editable.Preview :class="styles.Preview" />
    </Editable.Area>
    <Editable.Context v-slot="{ editing }">
      <Editable.Control :class="styles.Control">
        <template v-if="editing">
          <Editable.SubmitTrigger :class="styles.SubmitTrigger">
            <CheckIcon />
          </Editable.SubmitTrigger>
          <Editable.CancelTrigger :class="styles.CancelTrigger">
            <XIcon />
          </Editable.CancelTrigger>
        </template>
        <Editable.EditTrigger v-else :class="styles.EditTrigger">
          <PencilIcon />
        </Editable.EditTrigger>
      </Editable.Control>
    </Editable.Context>
  </Editable.Root>
</template>
