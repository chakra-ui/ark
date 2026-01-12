<script setup lang="ts">
import { QrCode } from '@ark-ui/vue/qr-code'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

const value = ref('http://ark-ui.com')
</script>

<template>
  <div class="stack">
    <QrCode.Root :class="styles.Root" v-model="value">
      <QrCode.Frame :class="styles.Frame">
        <QrCode.Pattern :class="styles.Pattern" />
      </QrCode.Frame>
    </QrCode.Root>
    <button :class="button.Root" @click="value = 'https://chakra-ui.com'">Set to chakra-ui.com</button>
  </div>
</template>
