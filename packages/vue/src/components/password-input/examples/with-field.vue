<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import field from 'styles/field.module.css'
import styles from 'styles/password-input.module.css'
</script>

<template>
  <Field.Root :class="field.Root">
    <PasswordInput.Root :class="styles.Root">
      <PasswordInput.Label :class="styles.Label">Password</PasswordInput.Label>
      <PasswordInput.Control :class="styles.Control">
        <PasswordInput.Input :class="styles.Input" />
        <PasswordInput.VisibilityTrigger :class="styles.VisibilityTrigger">
          <PasswordInput.Indicator :class="styles.Indicator">
            <EyeIcon />
            <template #fallback>
              <EyeOffIcon />
            </template>
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
    <Field.HelperText :class="field.HelperText">Enter your password</Field.HelperText>
    <Field.ErrorText :class="field.ErrorText">Password is required</Field.ErrorText>
  </Field.Root>
</template>
