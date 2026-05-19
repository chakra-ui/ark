import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  type ElementRef,
  type EmbeddedViewRef,
  type OnDestroy,
  type TemplateRef,
  ViewContainerRef,
  afterNextRender,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { ARK_ENVIRONMENT_TOKEN, type EnvironmentContext } from '@ark-ui/angular/src/providers/environment'

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

const createDefaultTitle = (): string => {
  const randomId = globalThis.crypto?.randomUUID?.()
  return `frame:${randomId ?? ++frameId}`
}

@Component({
  selector: 'ark-frame',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: block;',
  },
  providers: [
    {
      provide: ARK_ENVIRONMENT_TOKEN,
      useFactory: (frame: ArkFrameComponent) => frame.environment,
      deps: [forwardRef(() => ArkFrameComponent)],
    },
  ],
  template: `
    <iframe #frame [attr.title]="resolvedTitle()" [attr.name]="name()"></iframe>
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [
    `
      iframe {
        border: 0;
        display: block;
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class ArkFrameComponent implements OnDestroy {
  readonly srcdoc = input<string | undefined>(initialFrameSrcdoc)
  readonly title = input<string | undefined>(undefined)
  readonly name = input<string | undefined>(undefined)
  readonly head = input<TemplateRef<unknown> | null>(null)
  readonly mount = output<void>()
  readonly unmount = output<void>()
  readonly frameElement = viewChild.required<ElementRef<HTMLIFrameElement>>('frame')

  private readonly contentTpl = viewChild.required<TemplateRef<unknown>>('content')
  private readonly vcRef = inject(ViewContainerRef)
  private readonly injector = inject(Injector)
  private readonly defaultTitle = createDefaultTitle()
  private readonly ready = signal(false)
  private readonly frameDocument = signal<Document | undefined>(undefined)
  private contentView: EmbeddedViewRef<unknown> | undefined
  private headView: EmbeddedViewRef<unknown> | undefined
  private resizeCleanup: (() => void) | undefined

  readonly environment: EnvironmentContext = {
    getRootNode: () => this.frameDocument(),
  }

  protected readonly resolvedTitle = computed(() => this.title() ?? this.defaultTitle)

  constructor() {
    afterNextRender(() => {
      this.ready.set(true)
    })

    effect(() => {
      const srcdoc = this.srcdoc() ?? initialFrameSrcdoc
      const head = this.head()
      if (!this.ready()) return
      this.mountFrame(srcdoc, head)
    })
  }

  ngOnDestroy(): void {
    this.destroyViews()
    this.resizeCleanup?.()
    this.unmount.emit()
  }

  private mountFrame(srcdoc: string, head: TemplateRef<unknown> | null): void {
    const frame = this.frameElement().nativeElement
    const doc = frame.contentDocument ?? frame.contentWindow?.document
    if (!doc) return

    this.resizeCleanup?.()
    this.resizeCleanup = undefined
    if (this.contentView || this.headView) {
      this.unmount.emit()
    }
    this.destroyViews()

    doc.open()
    doc.write(srcdoc)
    doc.close()
    this.frameDocument.set(doc)

    const mountNode = doc.body.querySelector<HTMLElement>('.frame-root') ?? doc.body
    const frameInjector = this.createFrameInjector(doc)

    this.contentView = this.vcRef.createEmbeddedView(this.contentTpl(), undefined, { injector: frameInjector })
    this.contentView.detectChanges()
    for (const node of this.contentView.rootNodes as Node[]) {
      mountNode.appendChild(node)
    }

    if (head) {
      this.headView = this.vcRef.createEmbeddedView(head, undefined, { injector: frameInjector })
      this.headView.detectChanges()
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

  private createFrameInjector(doc: Document): Injector {
    return Injector.create({
      providers: [
        { provide: ARK_ENVIRONMENT_TOKEN, useValue: { getRootNode: () => doc } satisfies EnvironmentContext },
      ],
      parent: this.injector,
    })
  }

  private observeSize(frame: HTMLIFrameElement, mountNode: HTMLElement): void {
    this.resizeCleanup?.()
    const ResizeObserverCtor = globalThis.ResizeObserver
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
