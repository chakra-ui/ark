import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTagsInputContext } from './use-tags-input-context'
import { injectArkTagsInputItemContext } from './use-tags-input-item-context'

@Directive({
  selector: '[arkTagsInputItemInput]',
  standalone: true,
  exportAs: 'arkTagsInputItemInput',
})
export class ArkTagsInputItemInput {
  constructor() {
    const context = injectArkTagsInputContext()
    const item = injectArkTagsInputItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const props = context.api().getItemInputProps({ index: item.index(), value: item.value() }) as Record<
          string,
          unknown
        >
        const { defaultValue: _defaultValue, ...rest } = props
        return rest
      },
    })
  }
}
