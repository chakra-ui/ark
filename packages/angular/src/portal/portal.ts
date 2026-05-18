import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type EmbeddedViewRef,
  Injector,
  type TemplateRef,
  ViewContainerRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'

export interface PortalProps {
  target?: HTMLElement | null
  originInjector?: Injector | null
}

@Component({
  selector: 'ark-portal',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class ArkPortalComponent {
  readonly target = input<PortalProps['target']>(undefined)
  readonly originInjector = input<PortalProps['originInjector']>(undefined)

  private readonly vcRef = inject(ViewContainerRef)
  private readonly contentTpl = viewChild.required<TemplateRef<unknown>>('content')
  private readonly elementInjector = inject(Injector)
  private readonly destroyRef = inject(DestroyRef)
  private readonly environment = injectArkEnvironment()
  private readonly view = signal<EmbeddedViewRef<unknown> | null>(null)
  private parkingFragment: DocumentFragment | undefined

  constructor() {
    afterNextRender(() => {
      const view = this.vcRef.createEmbeddedView(this.contentTpl(), undefined, {
        injector: this.originInjector() ?? this.elementInjector,
      })
      view.detectChanges()
      this.view.set(view)
      this.destroyRef.onDestroy(() => {
        for (const node of view.rootNodes as Node[]) {
          node.parentNode?.removeChild(node)
        }
        view.destroy()
      })
    })

    effect(() => {
      const view = this.view()
      if (!view) return
      const target = this.resolveTarget(view)
      if (!target) return
      for (const node of view.rootNodes as Node[]) {
        target.appendChild(node)
      }
    })
  }

  private resolveTarget(view: EmbeddedViewRef<unknown>): HTMLElement | DocumentFragment | null {
    const explicit = this.target()
    if (explicit === null) return this.getParkingFragment(view)
    if (explicit) return explicit
    const root = this.environment.getRootNode()
    if (!root) return this.getParkingFragment(view)
    if (root instanceof Document) return root.body
    return (root.host as HTMLElement | null) ?? this.getParkingFragment(view)
  }

  private getParkingFragment(view: EmbeddedViewRef<unknown>): DocumentFragment | null {
    if (this.parkingFragment) return this.parkingFragment
    const ownerDocument =
      (view.rootNodes as Node[]).find((node) => node.ownerDocument)?.ownerDocument ??
      this.environment.getRootNode()?.ownerDocument ??
      null
    if (!ownerDocument) return null
    this.parkingFragment = ownerDocument.createDocumentFragment()
    return this.parkingFragment
  }
}
