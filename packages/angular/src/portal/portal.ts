import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  PLATFORM_ID,
  type TemplateRef,
  ViewContainerRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core'
import { injectArkEnvironment } from '../providers/environment/environment'

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
  private readonly platformId = inject(PLATFORM_ID)
  private readonly destroyRef = inject(DestroyRef)
  private readonly environment = injectArkEnvironment()

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return
      const view = this.vcRef.createEmbeddedView(this.contentTpl(), undefined, {
        injector: this.elementInjector,
      })
      view.detectChanges()
      const target = this.resolveTarget()
      if (!target) return
      for (const node of view.rootNodes as Node[]) {
        target.appendChild(node)
      }
      this.destroyRef.onDestroy(() => {
        view.destroy()
      })
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
