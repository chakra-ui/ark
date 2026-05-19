import type { CollectionItem } from '@zag-js/collection'
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
import { ARK_LISTBOX_CONTEXT } from './use-listbox-context'
import type { ListboxService } from './listbox.types'
import type { UseListboxApi, UseListboxReturn } from './use-listbox'

@Directive({
  selector: '[arkListboxRootProvider]',
  standalone: true,
  exportAs: 'arkListboxRootProvider',
  providers: [{ provide: ARK_LISTBOX_CONTEXT, useExisting: forwardRef(() => ArkListboxRootProvider) }],
})
export class ArkListboxRootProvider<T extends CollectionItem = CollectionItem> implements UseListboxReturn<T> {
  /** The listbox primitive returned by useListbox(). */
  readonly value: InputSignal<UseListboxReturn<T>> = input.required<UseListboxReturn<T>>()

  get state(): Signal<ListboxService<T>['state']> {
    return this.value().state
  }
  get api(): Signal<UseListboxApi<T>> {
    return this.value().api
  }
  get service(): ListboxService<T> {
    return this.value().service
  }
  get send(): ListboxService<T>['send'] {
    return this.value().send
  }

  resolveValue(): UseListboxReturn<T> {
    return this.value()
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
