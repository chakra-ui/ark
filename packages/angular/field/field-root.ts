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
import type { FieldElementIds, FieldResolvedIds } from './field.types'
import { ARK_FIELD_CONTEXT } from './use-field-context'
import { type ArkProps, type UseFieldReturn, useField } from './use-field'

@Directive({
  selector: '[arkFieldRoot]',
  standalone: true,
  exportAs: 'arkFieldRoot',
  providers: [{ provide: ARK_FIELD_CONTEXT, useExisting: forwardRef(() => ArkFieldRoot) }],
})
export class ArkFieldRoot implements UseFieldReturn {
  /** The id of the field. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the field parts. */
  readonly elementIds: InputSignal<FieldElementIds | undefined> = input<FieldElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** Whether the field is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the field is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the field is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the field is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The target field item value the label should point to. */
  readonly target: InputSignal<string | undefined> = input<string | undefined>(undefined)

  private readonly field: UseFieldReturn = useField({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      required: this.required(),
      disabled: this.disabled(),
      invalid: this.invalid(),
      readOnly: this.readOnly(),
      target: this.target(),
    }),
  })

  get ids(): FieldResolvedIds {
    return this.field.ids
  }

  get hasErrorText(): Signal<boolean> {
    return this.field.hasErrorText
  }

  get hasHelperText(): Signal<boolean> {
    return this.field.hasHelperText
  }

  get ariaDescribedby(): Signal<string | undefined> {
    return this.field.ariaDescribedby
  }

  setHasErrorText(value: boolean): void {
    this.field.setHasErrorText(value)
  }

  setHasHelperText(value: boolean): void {
    this.field.setHasHelperText(value)
  }

  getRootProps(): ArkProps {
    return this.field.getRootProps()
  }
  getControlProps(): ArkProps {
    return this.field.getControlProps()
  }
  getLabelProps(): ArkProps {
    return this.field.getLabelProps()
  }
  getInputProps(): ArkProps {
    return this.field.getInputProps()
  }
  getTextareaProps(): ArkProps {
    return this.field.getTextareaProps()
  }
  getSelectProps(): ArkProps {
    return this.field.getSelectProps()
  }
  getHelperTextProps(): ArkProps {
    return this.field.getHelperTextProps()
  }
  getErrorTextProps(): ArkProps {
    return this.field.getErrorTextProps()
  }
  getRequiredIndicatorProps(): ArkProps {
    return this.field.getRequiredIndicatorProps()
  }
  getItemControlId(value: string): string {
    return this.field.getItemControlId(value)
  }
  getItemLabelId(value: string): string {
    return this.field.getItemLabelId(value)
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.field.getRootProps(),
    })
  }
}
