<script setup lang="ts">
import { QrCode } from '@ark-ui/vue/qr-code'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { ref } from 'vue'
import styles from 'styles/qr-code.module.css'
import radio from 'styles/radio-group.module.css'

type ErrorLevel = 'L' | 'M' | 'Q' | 'H'
const errorLevel = ref<ErrorLevel>('L')
const levels: ErrorLevel[] = ['L', 'M', 'Q', 'H']
</script>

<template>
  <div class="stack">
    <QrCode.Root :class="styles.Root" defaultValue="http://ark-ui.com" :encoding="{ ecc: errorLevel }">
      <QrCode.Frame :class="styles.Frame">
        <QrCode.Pattern :class="styles.Pattern" />
      </QrCode.Frame>
    </QrCode.Root>
    <RadioGroup.Root
      :class="radio.Root"
      defaultValue="L"
      orientation="horizontal"
      @value-change="(e) => (errorLevel = e.value as ErrorLevel)"
    >
      <div class="hstack">
        <RadioGroup.Item v-for="level in levels" :key="level" :class="radio.Item" :value="level">
          <RadioGroup.ItemControl :class="radio.ItemControl" />
          <RadioGroup.ItemText :class="radio.ItemText">{{ level }}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </div>
    </RadioGroup.Root>
  </div>
</template>
