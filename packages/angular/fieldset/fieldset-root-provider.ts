import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { FieldsetResolvedIds } from './fieldset.types'
import { ARK_FIELDSET_CONTEXT } from './use-fieldset-context'
import type { ArkProps, UseFieldsetReturn } from './use-fieldset'

@Directive({
  selector: '[arkFieldsetRootProvider]',
  standalone: true,
  exportAs: 'arkFieldsetRootProvider',
  providers: [{ provide: ARK_FIELDSET_CONTEXT, useExisting: forwardRef(() => ArkFieldsetRootProvider) }],
})
export class ArkFieldsetRootProvider implements UseFieldsetReturn {
  /** The fieldset primitive returned by useFieldset(). */
  readonly value: InputSignal<UseFieldsetReturn> = input.required<UseFieldsetReturn>()

  readonly disabled: Signal<boolean> = computed(() => this.value().disabled())
  readonly invalid: Signal<boolean> = computed(() => this.value().invalid())
  readonly hasErrorText: Signal<boolean> = computed(() => this.value().hasErrorText())
  readonly hasHelperText: Signal<boolean> = computed(() => this.value().hasHelperText())
  readonly ariaDescribedby: Signal<string | undefined> = computed(() => this.value().ariaDescribedby())

  get ids(): FieldsetResolvedIds {
    return this.value().ids
  }

  setHasErrorText(value: boolean): void {
    this.value().setHasErrorText(value)
  }

  setHasHelperText(value: boolean): void {
    this.value().setHasHelperText(value)
  }

  registerErrorText(): () => void {
    return this.value().registerErrorText()
  }

  registerHelperText(): () => void {
    return this.value().registerHelperText()
  }

  getRootProps(): ArkProps {
    return this.value().getRootProps()
  }
  getLegendProps(): ArkProps {
    return this.value().getLegendProps()
  }
  getHelperTextProps(): ArkProps {
    return this.value().getHelperTextProps()
  }
  getErrorTextProps(): ArkProps {
    return this.value().getErrorTextProps()
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().getRootProps(),
    })
  }
}
