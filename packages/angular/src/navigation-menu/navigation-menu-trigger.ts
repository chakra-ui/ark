import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkNavigationMenuContext } from './use-navigation-menu-context'
import { injectArkNavigationMenuItemContext } from './use-navigation-menu-item-context'

const optionalBooleanAttribute = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value)

@Directive({
  selector: '[arkNavigationMenuTrigger]',
  standalone: true,
  exportAs: 'arkNavigationMenuTrigger',
})
export class ArkNavigationMenuTrigger {
  /** Whether the trigger is disabled. Defaults to the ancestor item disabled state. */
  readonly disabled: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )

  constructor() {
    const context = injectArkNavigationMenuContext()
    const item = injectArkNavigationMenuItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getTriggerProps({
          value: item.value(),
          disabled: this.disabled() ?? item.disabled(),
        }),
    })
  }
}
