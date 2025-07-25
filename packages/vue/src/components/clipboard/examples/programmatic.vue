<script setup lang="ts">
import { Clipboard } from '@ark-ui/vue/clipboard'
</script>

<template>
  <Clipboard.Root default-value="https://ark-ui.com">
    <Clipboard.Context v-slot="clipboard">
      <button @click="clipboard.copy()">
        {{ clipboard.copied ? 'Copied!' : 'Copy URL' }}
      </button>
    </Clipboard.Context>
  </Clipboard.Root>
</template>
