<script setup lang="ts">
import { PasswordInput, usePasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

const passwordInput = usePasswordInput()
</script>

<template>
  <button @click="passwordInput.focus()">Focus</button>

  <PasswordInput.RootProvider :value="passwordInput">
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
  </PasswordInput.RootProvider>
</template>
