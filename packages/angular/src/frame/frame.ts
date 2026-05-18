import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  type ElementRef,
  type EmbeddedViewRef,
  type TemplateRef,
  ViewContainerRef,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core'

export interface FrameBaseProps {
  head?: TemplateRef<unknown> | null
  onMount?: (() => void) | undefined
  onUnmount?: (() => void) | undefined
}

export interface FrameProps extends FrameBaseProps {
  srcdoc?: string
  title?: string
  name?: string
}

const resetStyle = '<style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style>'
export const initialFrameSrcdoc = `<html><head>${resetStyle}</head><body><div class="frame-root"></div></body></html>`
let frameId = 0

@Component({
  selector: 'ark-frame',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <iframe #frame [attr.srcdoc]="srcdoc()" [attr.title]="resolvedTitle()" [attr.name]="name()"></iframe>
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class ArkFrameComponent {
  readonly srcdoc = input<string>(initialFrameSrcdoc)
  readonly title = input<string | undefined>(undefined)
  readonly name = input<string | undefined>(undefined)
  readonly head = input<TemplateRef<unknown> | null>(null)
  readonly mount = output<void>()
  readonly unmount = output<void>()
  readonly frameElement = viewChild.required<ElementRef<HTMLIFrameElement>>('frame')

  private readonly contentTpl = viewChild.required<TemplateRef<unknown>>('content')
  private readonly vcRef = inject(ViewContainerRef)
  private readonly destroyRef = inject(DestroyRef)
  private readonly defaultTitle = `frame:${++frameId}`
  private contentView: EmbeddedViewRef<unknown> | undefined
  private headView: EmbeddedViewRef<unknown> | undefined
  private resizeCleanup: (() => void) | undefined

  protected readonly resolvedTitle = computed(() => this.title() ?? this.defaultTitle)

  constructor() {
    afterNextRender(() => {
      this.mountFrame()
    })

    this.destroyRef.onDestroy(() => {
      this.destroyViews()
      this.resizeCleanup?.()
      this.unmount.emit()
    })
  }

  private mountFrame(): void {
    const frame = this.frameElement().nativeElement
    const doc = frame.contentDocument ?? frame.contentWindow?.document
    if (!doc) return

    doc.open()
    doc.write(this.srcdoc())
    doc.close()

    const mountNode = doc.body.querySelector<HTMLElement>('.frame-root') ?? doc.body
    this.destroyViews()
    this.contentView = this.vcRef.createEmbeddedView(this.contentTpl())
    for (const node of this.contentView.rootNodes as Node[]) {
      mountNode.appendChild(node)
    }

    const head = this.head()
    if (head) {
      this.headView = this.vcRef.createEmbeddedView(head)
      for (const node of this.headView.rootNodes as Node[]) {
        doc.head.appendChild(node)
      }
    }

    this.observeSize(frame, mountNode)
    this.mount.emit()
  }

  private destroyViews(): void {
    for (const view of [this.contentView, this.headView]) {
      if (!view) continue
      for (const node of view.rootNodes as Node[]) {
        node.parentNode?.removeChild(node)
      }
      view.destroy()
    }
    this.contentView = undefined
    this.headView = undefined
  }

  private observeSize(frame: HTMLIFrameElement, mountNode: HTMLElement): void {
    this.resizeCleanup?.()
    const win = frame.contentWindow
    const ResizeObserverCtor = (win as (Window & typeof globalThis) | null)?.ResizeObserver
    if (!ResizeObserverCtor) return

    const updateSize = () => {
      frame.style.setProperty('--width', `${mountNode.scrollWidth}px`)
      frame.style.setProperty('--height', `${mountNode.scrollHeight}px`)
    }
    const observer = new ResizeObserverCtor(updateSize)
    observer.observe(mountNode)
    updateSize()
    this.resizeCleanup = () => observer.disconnect()
  }
}
