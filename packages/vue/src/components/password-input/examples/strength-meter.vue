<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { passwordStrength, type Options } from 'check-password-strength'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import styles from 'styles/password-input.module.css'

const strengthOptions: Options<string> = [
  { id: 0, value: 'weak', minDiversity: 0, minLength: 0 },
  { id: 1, value: 'medium', minDiversity: 2, minLength: 6 },
  { id: 2, value: 'strong', minDiversity: 4, minLength: 8 },
]

const password = ref('asdfasdf')

const strength = computed(() => {
  if (!password.value) return null
  const { value } = passwordStrength(password.value, strengthOptions)
  return value
})
</script>

<template>
  <PasswordInput.Root :class="styles.Root">
    <PasswordInput.Label :class="styles.Label">Password</PasswordInput.Label>
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
    <div v-if="strength" :class="styles.StrengthMeter">
      <div :class="styles.StrengthBar">
        <div :class="styles.StrengthFill" :data-strength="strength" />
      </div>
      <div :class="styles.StrengthLabel">{{ strength }} password</div>
    </div>
  </PasswordInput.Root>
</template>
