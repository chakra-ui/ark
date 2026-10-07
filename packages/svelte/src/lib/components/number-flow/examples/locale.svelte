<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  const locales = [
    { locale: 'en-US', label: 'English' },
    { locale: 'de-DE', label: 'Deutsch' },
    { locale: 'ar-EG', label: 'العربية' },
    { locale: 'hi-IN-u-nu-deva', label: 'हिन्दी' },
  ]

  let value = $state(1_234_567.89)
</script>

<div class="stack">
  <div class={styles.Grid}>
    {#each locales as { locale, label } (locale)}
      <div class={styles.Stat}>
        <span class={styles.Label}>{label}</span>
        <NumberFlow.Root {value} {locale} class={styles.Root}>
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
    {/each}
  </div>
  <button type="button" class={button.Root} onclick={() => (value = Math.round(Math.random() * 10_000_000) / 100)}>
    Randomize
  </button>
</div>
