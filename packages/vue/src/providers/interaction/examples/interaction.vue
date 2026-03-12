<script setup lang="ts">
import { useInteractionModality } from '@ark-ui/vue/interaction'
import styles from 'styles/interaction.module.css'

const modality = useInteractionModality()
</script>

<template>
  <div :class="styles.Container">
    <span :class="styles.Badge" :data-modality="modality">
      {{ modality ?? 'none' }}
    </span>
    <p :class="styles.Hint">Try clicking, pressing a key, or using a screen reader.</p>
    <button type="button" :class="styles.Button" :data-focus-visible="modality === 'keyboard' ? '' : undefined">
      Click or Tab to me
    </button>
  </div>
</template>
