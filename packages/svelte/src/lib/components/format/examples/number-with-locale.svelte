<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import { LocaleProvider } from '@ark-ui/svelte/locale'
</script>

<LocaleProvider locale="de-DE">
  <Format.Number value={1450.45} />
</LocaleProvider>
