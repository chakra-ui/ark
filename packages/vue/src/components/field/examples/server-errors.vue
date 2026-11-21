<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

const errors = ref<string[]>([])
</script>

<template>
  <form class="stack" @submit.prevent="errors = ['This email is already registered']">
    <Field.Root :class="styles.Root" :errors="errors">
      <Field.Label :class="styles.Label">Email</Field.Label>
      <Field.Input :class="styles.Input" type="email" name="email" value="taken@example.com" />
      <Field.HelperText :class="styles.HelperText">Submit to check the email with the server.</Field.HelperText>
      <Field.Context v-slot="field">
        <Field.ErrorText :class="styles.ErrorText">{{ field.errors[0] }}</Field.ErrorText>
      </Field.Context>
    </Field.Root>
    <button :class="button.Root" type="submit">Submit</button>
  </form>
</template>
