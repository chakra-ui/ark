<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
</script>

<template>
  <PasswordInput.Root ignorePasswordManagers>
    <PasswordInput.Label>API Key</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input value="spd_1234567890" />
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
</template>
