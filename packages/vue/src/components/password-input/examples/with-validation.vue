<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/password-input.module.css'

const password = ref('')
const isValid = computed(() => password.value.length >= 8)
</script>

<template>
  <PasswordInput.Root :class="styles.Root" :invalid="!isValid && password.length > 0">
    <PasswordInput.Label :class="styles.Label">Password (min 8 characters)</PasswordInput.Label>
    <PasswordInput.Control :class="styles.Control">
      <PasswordInput.Input :class="styles.Input" v-model="password" placeholder="Enter your password" />
      <PasswordInput.VisibilityTrigger :class="styles.VisibilityTrigger">
        <PasswordInput.Indicator :class="styles.Indicator">
          <EyeIcon />
          <template #fallback>
            <EyeOffIcon />
          </template>
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
    <p v-if="password.length > 0 && !isValid" :class="styles.ValidationMessage" data-valid="false">
      Password must be at least 8 characters
    </p>
    <p v-if="isValid && password.length > 0" :class="styles.ValidationMessage" data-valid="true">Password is valid</p>
  </PasswordInput.Root>
</template>
