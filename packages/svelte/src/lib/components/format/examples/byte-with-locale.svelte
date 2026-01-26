<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import { LocaleProvider } from '@ark-ui/svelte/locale'
  import styles from 'styles/format.module.css'

  const locales = ['de-DE', 'zh-CN']
</script>

<div class={styles.List}>
  {#each locales as locale (locale)}
    <LocaleProvider {locale}>
      <div class={styles.ListItem}>
        <span class={styles.InlineLabel}>{locale}:</span>
        <span class={styles.Value}>
          <Format.Byte value={1450.45} />
        </span>
      </div>
    </LocaleProvider>
  {/each}
</div>
