import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkToggleGroupContext } from './use-toggle-group-context'

@Directive({
  selector: '[arkToggleGroupItem]',
  standalone: true,
  exportAs: 'arkToggleGroupItem',
})
export class ArkToggleGroupItem {
  readonly value: InputSignal<string> = input.required<string>()
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const context = injectArkToggleGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemProps({ value: this.value(), disabled: this.disabled() }),
    })
  }
}
