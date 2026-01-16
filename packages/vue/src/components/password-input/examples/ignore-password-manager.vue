<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import styles from 'styles/password-input.module.css'
</script>

<template>
  <PasswordInput.Root :class="styles.Root" ignorePasswordManagers>
    <PasswordInput.Label :class="styles.Label">API Key</PasswordInput.Label>
    <PasswordInput.Control :class="styles.Control">
      <PasswordInput.Input :class="styles.Input" value="spd_1234567890" />
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
</template>
