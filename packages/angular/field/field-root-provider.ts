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
import type { FieldResolvedIds } from './field.types'
import { ARK_FIELD_CONTEXT } from './use-field-context'
import type { ArkProps, UseFieldReturn } from './use-field'

@Directive({
  selector: '[arkFieldRootProvider]',
  standalone: true,
  exportAs: 'arkFieldRootProvider',
  providers: [{ provide: ARK_FIELD_CONTEXT, useExisting: forwardRef(() => ArkFieldRootProvider) }],
})
export class ArkFieldRootProvider implements UseFieldReturn {
  /** The field primitive returned by useField(). */
  readonly value: InputSignal<UseFieldReturn> = input.required<UseFieldReturn>()

  readonly disabled: Signal<boolean> = computed(() => this.value().disabled())
  readonly invalid: Signal<boolean> = computed(() => this.value().invalid())
  readonly readOnly: Signal<boolean> = computed(() => this.value().readOnly())
  readonly required: Signal<boolean> = computed(() => this.value().required())
  readonly hasErrorText: Signal<boolean> = computed(() => this.value().hasErrorText())
  readonly hasHelperText: Signal<boolean> = computed(() => this.value().hasHelperText())
  readonly ariaDescribedby: Signal<string | undefined> = computed(() => this.value().ariaDescribedby())

  get ids(): FieldResolvedIds {
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
  getControlProps(): ArkProps {
    return this.value().getControlProps()
  }
  getLabelProps(): ArkProps {
    return this.value().getLabelProps()
  }
  getInputProps(): ArkProps {
    return this.value().getInputProps()
  }
  getTextareaProps(): ArkProps {
    return this.value().getTextareaProps()
  }
  getSelectProps(): ArkProps {
    return this.value().getSelectProps()
  }
  getHelperTextProps(): ArkProps {
    return this.value().getHelperTextProps()
  }
  getErrorTextProps(): ArkProps {
    return this.value().getErrorTextProps()
  }
  getRequiredIndicatorProps(): ArkProps {
    return this.value().getRequiredIndicatorProps()
  }
  getItemControlId(value: string): string {
    return this.value().getItemControlId(value)
  }
  getItemLabelId(value: string): string {
    return this.value().getItemLabelId(value)
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
