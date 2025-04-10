<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import { LocaleProvider } from '@ark-ui/svelte/locale'

  const locales = ['de-DE', 'zh-CN']
  const value = 1450.45
</script>

<div>
  {#each locales as locale (locale)}
    <div>
      <LocaleProvider {locale}>
        <Format.Byte {value} />
      </LocaleProvider>
    </div>
  {/each}
</div>
