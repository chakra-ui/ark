<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import styles from 'styles/field.module.css'
</script>

<template>
  <Field.Root :class="styles.Root" invalid>
    <Field.Label :class="styles.Label">Email</Field.Label>
    <Field.Input :class="styles.Input" placeholder="me@example.com" />
    <Field.ErrorText :class="styles.ErrorText">This is an error text</Field.ErrorText>
  </Field.Root>
</template>
