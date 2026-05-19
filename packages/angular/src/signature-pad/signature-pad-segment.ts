import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSignaturePadContext } from './use-signature-pad-context'

type SvgNode = SVGElement & ChildNode

@Directive({
  selector: 'svg[arkSignaturePadSegment]',
  standalone: true,
  exportAs: 'arkSignaturePadSegment',
})
export class ArkSignaturePadSegment {
  private readonly elementRef = inject<ElementRef<SVGSVGElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly managedNodes: SvgNode[] = []

  constructor() {
    const context = injectArkSignaturePadContext()
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef: this.elementRef as unknown as ElementRef<HTMLElement>,
      renderer: this.renderer,
      destroyRef,
      props: () => context.api().getSegmentProps(),
    })

    effect(() => {
      const api = context.api()
      const paths = [...api.paths]
      if (api.currentPath) paths.push(api.currentPath)
      this.renderPaths(paths.map((path) => api.getSegmentPathProps({ path }) as Record<string, unknown>))
    })

    destroyRef.onDestroy(() => this.clearManagedNodes())
  }

  private renderPaths(pathProps: Array<Record<string, unknown>>): void {
    this.clearManagedNodes()

    const title = this.renderer.createElement('title', 'svg') as SVGTitleElement
    this.renderer.setProperty(title, 'textContent', 'Signature')
    this.appendManagedNode(title)

    for (const props of pathProps) {
      const path = this.renderer.createElement('path', 'svg') as SVGPathElement
      for (const [key, value] of Object.entries(props)) {
        this.applyPathProp(path, key, value)
      }
      this.appendManagedNode(path)
    }
  }

  private applyPathProp(path: SVGPathElement, key: string, value: unknown): void {
    if (value == null || value === false) return
    if (
      key === 'd' ||
      key === 'id' ||
      key === 'role' ||
      key === 'tabindex' ||
      key.startsWith('aria-') ||
      key.startsWith('data-')
    ) {
      this.renderer.setAttribute(path, key, String(value))
      return
    }
    this.renderer.setProperty(path, key, value)
  }

  private appendManagedNode(node: SvgNode): void {
    this.renderer.appendChild(this.elementRef.nativeElement, node)
    this.managedNodes.push(node)
  }

  private clearManagedNodes(): void {
    for (const node of this.managedNodes) {
      this.renderer.removeChild(this.elementRef.nativeElement, node)
    }
    this.managedNodes.length = 0
  }
}
