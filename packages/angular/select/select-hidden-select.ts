import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContextOptional } from '@ark-ui/angular/field'
import { injectArkSelectContext } from './use-select-context'

@Directive({
  selector: 'select[arkSelectHiddenSelect]',
  standalone: true,
  exportAs: 'arkSelectHiddenSelect',
})
export class ArkSelectHiddenSelect {
  constructor() {
    const context = injectArkSelectContext()
    const field = injectArkFieldContextOptional()
    const elementRef = inject(ElementRef) as ElementRef<HTMLSelectElement>
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getHiddenSelectProps() as Record<string, unknown>
        const describedBy = field?.ariaDescribedby()
        if (describedBy) {
          return { ...props, 'aria-describedby': describedBy }
        }
        return props
      },
    })

    let previousSignature = ''
    effect(() => {
      const select = elementRef.nativeElement
      const api = context.api()
      const collection = api.collection
      const value = api.value
      const signature = `${value.join('\u0000')}::${collection.items
        .map((item) => `${collection.getItemValue(item) ?? ''}:${collection.getItemDisabled(item) ? '1' : '0'}`)
        .join('\u0001')}`
      if (signature === previousSignature) return
      previousSignature = signature
      while (select.firstChild) {
        renderer.removeChild(select, select.firstChild)
      }
      if (value.length === 0) {
        const opt = renderer.createElement('option') as HTMLOptionElement
        renderer.setAttribute(opt, 'value', '')
        renderer.appendChild(select, opt)
      }
      for (const item of collection.items) {
        const opt = renderer.createElement('option') as HTMLOptionElement
        const itemValue = collection.getItemValue(item) ?? ''
        renderer.setAttribute(opt, 'value', itemValue)
        if (collection.getItemDisabled(item)) {
          renderer.setAttribute(opt, 'disabled', '')
        }
        if (value.includes(itemValue)) {
          renderer.setAttribute(opt, 'selected', '')
        }
        const text = renderer.createText(String(collection.stringifyItem(item) ?? ''))
        renderer.appendChild(opt, text)
        renderer.appendChild(select, opt)
      }
    })
  }
}
