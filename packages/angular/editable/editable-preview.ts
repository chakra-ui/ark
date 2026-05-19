import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkEditableContext } from './use-editable-context'

@Directive({
  selector: '[arkEditablePreview]',
  standalone: true,
  exportAs: 'arkEditablePreview',
})
export class ArkEditablePreview {
  constructor() {
    const context = injectArkEditableContext()
    const elementRef = inject(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getPreviewProps() as Record<string, unknown>
        const { children: _children, ...rest } = props
        return rest
      },
    })

    effect(() => {
      const el = elementRef.nativeElement as HTMLElement
      if (!el) return
      const text = context.api().valueText
      renderer.setProperty(el, 'textContent', text)
    })
  }
}
