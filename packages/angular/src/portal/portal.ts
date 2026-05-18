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
}
export type PortalInputs = PortalProps

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
  readonly target = input<HTMLElement | null | undefined>(undefined)

  private readonly vcRef = inject(ViewContainerRef)
  private readonly contentTpl = viewChild.required<TemplateRef<unknown>>('content')
  private readonly elementInjector = inject(Injector)
  private readonly destroyRef = inject(DestroyRef)
  private readonly environment = injectArkEnvironment()
  private readonly view = signal<EmbeddedViewRef<unknown> | null>(null)

  constructor() {
    afterNextRender(() => {
      const view = this.vcRef.createEmbeddedView(this.contentTpl(), undefined, {
        injector: this.elementInjector,
      })
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
      const target = this.resolveTarget()
      if (!target) return
      for (const node of view.rootNodes as Node[]) {
        target.appendChild(node)
      }
    })
  }

  private resolveTarget(): HTMLElement | null {
    const explicit = this.target()
    if (explicit) return explicit
    const root = this.environment.getRootNode()
    if (!root) return null
    if (root instanceof Document) return root.body
    return (root.host as HTMLElement) ?? null
  }
}
