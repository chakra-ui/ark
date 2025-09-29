<script setup lang="ts">
import { PasswordInput } from '@ark-ui/vue/password-input'
import { passwordStrength, type Options } from 'check-password-strength'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const strengthOptions: Options<string> = [
  { id: 0, value: 'weak', minDiversity: 0, minLength: 0 },
  { id: 1, value: 'medium', minDiversity: 2, minLength: 6 },
  { id: 2, value: 'strong', minDiversity: 4, minLength: 8 },
]

const strengthMap = new Map([
  ['weak', { color: 'red', width: '30%' }],
  ['medium', { color: 'orange', width: '60%' }],
  ['strong', { color: 'green', width: '100%' }],
])

const password = ref('')

const strength = computed(() => {
  if (!password.value) return null
  const { value } = passwordStrength(password.value, strengthOptions)
  const data = strengthMap.get(value)
  return data ? { value, ...data } : null
})
</script>

<template>
  <PasswordInput.Root :style="{ maxWidth: '400px' }">
    <PasswordInput.Label>Password</PasswordInput.Label>
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
    <div v-if="strength" :style="{ marginTop: '8px' }">
      <div role="progressbar" :style="{ height: '8px', border: '1px solid lightgray' }">
        <div :style="{ height: '100%', background: strength.color, width: strength.width }" role="presentation" />
      </div>
      <div :style="{ marginTop: '4px', fontSize: '12px', textTransform: 'capitalize' }">
        {{ strength.value }} password
      </div>
    </div>
  </PasswordInput.Root>
</template>
