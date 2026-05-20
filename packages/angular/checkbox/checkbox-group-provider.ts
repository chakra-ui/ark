import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { checkboxAnatomy } from './checkbox.anatomy'
import { ARK_CHECKBOX_GROUP_CONTEXT } from './use-checkbox-group-context'
import type { UseCheckboxGroupReturn } from './use-checkbox-group'

@Directive({
  selector: '[arkCheckboxGroupProvider]',
  standalone: true,
  exportAs: 'arkCheckboxGroupProvider',
  providers: [{ provide: ARK_CHECKBOX_GROUP_CONTEXT, useExisting: forwardRef(() => ArkCheckboxGroupProvider) }],
})
export class ArkCheckboxGroupProvider implements UseCheckboxGroupReturn {
  /** The checkbox group primitive returned by useCheckboxGroup(). */
  readonly groupValue: InputSignal<UseCheckboxGroupReturn> = input.required<UseCheckboxGroupReturn>({ alias: 'value' })

  get value(): Signal<string[]> {
    return this.groupValue().value
  }
  get name(): Signal<string | undefined> {
    return this.groupValue().name
  }
  get disabled(): Signal<boolean> {
    return this.groupValue().disabled
  }
  get readOnly(): Signal<boolean> {
    return this.groupValue().readOnly
  }
  get invalid(): Signal<boolean> {
    return this.groupValue().invalid
  }

  isChecked(value: string | undefined): boolean {
    return this.groupValue().isChecked(value)
  }

  setValue(value: string[]): void {
    this.groupValue().setValue(value)
  }

  addValue(value: string): void {
    this.groupValue().addValue(value)
  }

  removeValue(value: string): void {
    this.groupValue().removeValue(value)
  }

  toggleValue(value: string): void {
    this.groupValue().toggleValue(value)
  }

  getItemProps(
    props: Parameters<UseCheckboxGroupReturn['getItemProps']>[0],
  ): ReturnType<UseCheckboxGroupReturn['getItemProps']> {
    return this.groupValue().getItemProps(props)
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({ role: 'group', ...checkboxAnatomy.build().group.attrs }),
    })
  }
}
