/** @internal Dev-mode diagnostics for form-bearing Angular directives. Not part of the consumer API. */
import { isDevMode } from '@angular/core'

export const warnMixedFormAndModelBinding = (componentName: string): void => {
  if (!isDevMode()) return
  console.warn(
    `[@ark-ui/angular] ${componentName}: a form binding and [(value)] are both present on the same root. ` +
      'The form binding remains the source of truth.',
  )
}
