<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const password = ref('')
const isValid = computed(() => password.value.length >= 8)
</script>

<template>
  <div>
    <PasswordInput.Root :invalid="!isValid && password.length > 0">
      <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input v-model="password" placeholder="Enter your password" />
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

    <p v-if="password.length > 0 && !isValid" style="color: red; margin-top: 4px">
      Password must be at least 8 characters
    </p>

    <p v-if="isValid && password.length > 0" style="color: green; margin-top: 4px">Password is valid ✓</p>
  </div>
</template>
