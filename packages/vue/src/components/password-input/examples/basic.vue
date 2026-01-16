<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import styles from 'styles/password-input.module.css'
</script>

<template>
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
</template>
