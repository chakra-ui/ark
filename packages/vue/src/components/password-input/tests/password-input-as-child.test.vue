<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
</script>

<template>
  <PasswordInput.Root>
    <PasswordInput.Control>
      <PasswordInput.Input as-child>
        <input data-testid="input" />
      </PasswordInput.Input>
    </PasswordInput.Control>
  </PasswordInput.Root>
</template>
