<script module lang="ts">
import type { Locale } from '@zag-js/i18n-utils'
import type { Snippet } from 'svelte'

export interface LocaleProviderProps {
  /**
   * The locale to use for the application.
   * @default 'en-US'
   */
  locale: string
  /**
   * The children to render.
   */
  children: Snippet
}
</script>

<script lang="ts">
import { isRTL } from '@zag-js/i18n-utils'
import { LocaleContextProvider } from './use-locale-context'

let {locale, children}:  LocaleProviderProps = $props()

const context = $state<Locale>({
  locale,
  dir: isRTL(locale) ? 'rtl' : 'ltr',
})

LocaleContextProvider(context)
</script>

{@render children()}