import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  signal,
  type AfterContentInit,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkEditableContext } from './use-editable-context'

@Directive({
  selector: '[arkEditablePreview]',
  standalone: true,
  exportAs: 'arkEditablePreview',
})
export class ArkEditablePreview implements AfterContentInit {
  private readonly ownsTextContent = signal(false)
  private readonly elementRef = inject(ElementRef)

  constructor() {
    const context = injectArkEditableContext()
    const elementRef = this.elementRef
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => {
        const props = context.api().getPreviewProps() as Record<string, unknown>
        const { children: _children, onDoubleClick, ...rest } = props
        if (typeof onDoubleClick === 'function') {
          const remapped = rest as { onDblClick?: unknown }
          remapped.onDblClick = onDoubleClick
        }
        return rest
      },
    })

    effect(() => {
      if (!this.ownsTextContent()) return
      const el = elementRef.nativeElement as HTMLElement
      if (!el) return
      const text = context.api().valueText
      renderer.setProperty(el, 'textContent', text)
    })
  }

  ngAfterContentInit(): void {
    this.ownsTextContent.set(this.elementRef.nativeElement.childNodes.length === 0)
  }
}
