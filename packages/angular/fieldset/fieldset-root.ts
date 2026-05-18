import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { FieldsetResolvedIds } from './fieldset.types'
import { ARK_FIELDSET_CONTEXT } from './use-fieldset-context'
import { type ArkProps, type UseFieldsetReturn, useFieldset } from './use-fieldset'

@Directive({
  selector: '[arkFieldsetRoot]',
  standalone: true,
  exportAs: 'arkFieldsetRoot',
  providers: [{ provide: ARK_FIELDSET_CONTEXT, useExisting: forwardRef(() => ArkFieldsetRoot) }],
})
export class ArkFieldsetRoot implements UseFieldsetReturn {
  /** The id of the fieldset. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the fieldset is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the fieldset is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  private readonly fieldset: UseFieldsetReturn = useFieldset({
    context: () => ({
      id: this.id(),
      disabled: this.disabled(),
      invalid: this.invalid(),
    }),
  })

  get ids(): FieldsetResolvedIds {
    return this.fieldset.ids
  }

  get hasErrorText(): Signal<boolean> {
    return this.fieldset.hasErrorText
  }

  get hasHelperText(): Signal<boolean> {
    return this.fieldset.hasHelperText
  }

  get ariaDescribedby(): Signal<string | undefined> {
    return this.fieldset.ariaDescribedby
  }

  setHasErrorText(value: boolean): void {
    this.fieldset.setHasErrorText(value)
  }

  setHasHelperText(value: boolean): void {
    this.fieldset.setHasHelperText(value)
  }

  getRootProps(): ArkProps {
    return this.fieldset.getRootProps()
  }
  getLegendProps(): ArkProps {
    return this.fieldset.getLegendProps()
  }
  getHelperTextProps(): ArkProps {
    return this.fieldset.getHelperTextProps()
  }
  getErrorTextProps(): ArkProps {
    return this.fieldset.getErrorTextProps()
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.fieldset.getRootProps(),
    })
  }
}
