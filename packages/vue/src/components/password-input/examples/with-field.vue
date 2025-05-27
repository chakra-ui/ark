<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
</script>

<template>
  <Field.Root>
    <PasswordInput.Root>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Enter your password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator>
            <EyeIcon />
            <template #fallback>
              <EyeOffIcon />
            </template>
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
    <Field.HelperText>Your password must be at least 8 characters</Field.HelperText>
    <Field.ErrorText>Password is required</Field.ErrorText>
  </Field.Root>
</template>
