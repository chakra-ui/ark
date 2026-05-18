import { Directive, computed, forwardRef, inject, input, type InputSignal, type Signal } from '@angular/core'
import { fieldParts } from './field.anatomy'
import type { FieldResolvedIds } from './field.types'
import { ARK_FIELD_CONTEXT } from './use-field-context'
import type { ArkProps, UseFieldReturn } from './use-field'

@Directive({
  selector: '[arkFieldItem]',
  standalone: true,
  exportAs: 'arkFieldItem',
  providers: [{ provide: ARK_FIELD_CONTEXT, useExisting: forwardRef(() => ArkFieldItem) }],
})
export class ArkFieldItem implements UseFieldReturn {
  /** The value of this field item; used to derive the per-item control id. */
  readonly value: InputSignal<string> = input.required<string>()

  private readonly parent: UseFieldReturn = inject(ARK_FIELD_CONTEXT, { skipSelf: true })

  readonly disabled: Signal<boolean> = computed(() => this.parent.disabled())
  readonly invalid: Signal<boolean> = computed(() => this.parent.invalid())
  readonly readOnly: Signal<boolean> = computed(() => this.parent.readOnly())
  readonly required: Signal<boolean> = computed(() => this.parent.required())
  readonly hasErrorText: Signal<boolean> = computed(() => this.parent.hasErrorText())
  readonly hasHelperText: Signal<boolean> = computed(() => this.parent.hasHelperText())
  readonly ariaDescribedby: Signal<string | undefined> = computed(() => this.parent.ariaDescribedby())

  private readonly controlIdSignal = computed(() => this.parent.getItemControlId(this.value()))
  private readonly labelIdSignal = computed(() => this.parent.getItemLabelId(this.value()))

  get ids(): FieldResolvedIds {
    const parentIds = this.parent.ids
    return {
      ...parentIds,
      control: this.controlIdSignal(),
      label: this.labelIdSignal(),
    }
  }

  setHasErrorText(value: boolean): void {
    this.parent.setHasErrorText(value)
  }

  setHasHelperText(value: boolean): void {
    this.parent.setHasHelperText(value)
  }

  getRootProps(): ArkProps {
    return this.parent.getRootProps()
  }

  getControlProps(): ArkProps {
    return {
      ...this.parent.getControlProps(),
      id: this.controlIdSignal(),
    }
  }

  getLabelProps(): ArkProps {
    return {
      ...this.parent.getLabelProps(),
      id: this.labelIdSignal(),
      htmlFor: this.controlIdSignal(),
    }
  }

  getInputProps(): ArkProps {
    return {
      ...this.getControlProps(),
      ...fieldParts.input.attrs,
    }
  }

  getTextareaProps(): ArkProps {
    return {
      ...this.getControlProps(),
      ...fieldParts.textarea.attrs,
    }
  }

  getSelectProps(): ArkProps {
    return {
      ...this.getControlProps(),
      ...fieldParts.select.attrs,
    }
  }

  getHelperTextProps(): ArkProps {
    return this.parent.getHelperTextProps()
  }

  getErrorTextProps(): ArkProps {
    return this.parent.getErrorTextProps()
  }

  getRequiredIndicatorProps(): ArkProps {
    return this.parent.getRequiredIndicatorProps()
  }

  getItemControlId(value: string): string {
    return this.parent.getItemControlId(value)
  }

  getItemLabelId(value: string): string {
    return this.parent.getItemLabelId(value)
  }
}
