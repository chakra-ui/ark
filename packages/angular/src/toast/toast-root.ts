import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  PLATFORM_ID,
  Renderer2,
  type ProviderToken,
  type Signal,
  afterNextRender,
  computed,
  forwardRef,
  inject,
  input,
  runInInjectionContext,
  signal,
  type InputSignal,
  type OnInit,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import type { Machine } from '@zag-js/core'
import * as toast from '@zag-js/toast'
import { applyArkProps, useMachine } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier, createArkId } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier, UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import { ARK_TOAST_CONTEXT, ARK_TOAST_CONTEXT_CARRIER } from './use-toast-context'

type ToastSchema = toast.Machine extends Machine<infer TSchema> ? TSchema : never
type ToastElementProps = Record<string, unknown>

export type UseToastReturn = UseMachineReturn<toast.Service['state'], toast.Api, toast.Service>

const noop = (): void => {}
const emptyProps = (): ToastElementProps => ({})

const fallbackToastApi: toast.Api = {
  type: 'info',
  placement: 'bottom',
  visible: false,
  paused: false,
  closable: false,
  pause: noop,
  resume: noop,
  dismiss: noop,
  getRootProps: emptyProps,
  getTitleProps: emptyProps,
  getGhostBeforeProps: emptyProps,
  getGhostAfterProps: emptyProps,
  getDescriptionProps: emptyProps,
  getCloseTriggerProps: emptyProps,
  getActionTriggerProps: emptyProps,
}

@Directive({
  selector: '[arkToast]',
  standalone: true,
  exportAs: 'arkToast',
  providers: [
    { provide: ARK_TOAST_CONTEXT, useExisting: forwardRef(() => ArkToastRoot) },
    {
      provide: ARK_TOAST_CONTEXT_CARRIER,
      useFactory: (root: ArkToastRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkToastRoot)],
    },
  ],
})
export class ArkToastRoot implements OnInit {
  /** The toast options supplied by the toaster store. */
  readonly value: InputSignal<toast.Props | undefined> = input<toast.Props | undefined>(undefined)
  /** The parent toast group service. */
  readonly parent: InputSignal<toast.GroupService | undefined> = input<toast.GroupService | undefined>(undefined)
  /** The toast's index within the rendered group. */
  readonly index: InputSignal<number> = input(0)

  private readonly injector = inject(Injector)
  private readonly locale = injectArkLocale()
  private readonly environment = injectArkEnvironment()
  private readonly destroyRef = inject(DestroyRef)
  private readonly renderer = inject(Renderer2)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private readonly fallbackId = createArkId('toast')
  private readonly machine = signal<UseToastReturn | null>(null)
  private readonly getRootNode = (): Document | ShadowRoot => {
    const rootNode = this.environment.getRootNode() ?? this.elementRef.nativeElement.getRootNode()
    return rootNode.nodeType === 9 || rootNode.nodeType === 11
      ? (rootNode as Document | ShadowRoot)
      : this.elementRef.nativeElement.ownerDocument
  }

  readonly state: Signal<toast.Service['state']> = computed(() => {
    const machine = this.machine()
    return machine?.state() ?? ({} as toast.Service['state'])
  })
  readonly api: Signal<toast.Api> = computed(() => this.machine()?.api() ?? fallbackToastApi)

  readonly send: toast.Service['send'] = (event) => this.service.send(event)

  get service(): toast.Service {
    const machine = this.machine()
    if (!machine) throw new Error('ArkToastRoot service is unavailable before the toast machine starts.')
    return machine.service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkToastRoot> = buildRootCarrier<ArkToastRoot>({
    root: this,
    rootToken: ARK_TOAST_CONTEXT as ProviderToken<ArkToastRoot>,
    originInjector: this.injector,
    environmentInjector: inject(EnvironmentInjector),
  })

  constructor() {
    applyArkProps({
      elementRef: this.elementRef,
      renderer: this.renderer,
      destroyRef: this.destroyRef,
      props: () => this.api().getRootProps(),
    })
    this.renderGhostElements()
  }

  ngOnInit(): void {
    if (!this.isBrowser) return
    if (!this.value() || !this.parent()) return
    this.machine.set(runInInjectionContext(this.injector, () => this.createMachine()))
  }

  /** @internal Exposed for dynamically rendered toast content. */
  getContextCarrier(): ArkContextCarrier<ArkToastRoot> {
    return this.arkContextCarrier
  }

  private createMachine(): UseToastReturn {
    return useToastMachine({
      context: () => {
        const value = this.value()
        const parent = this.parent()
        if (!value || !parent) {
          return {
            dir: this.locale.dir,
            getRootNode: this.getRootNode,
            id: this.fallbackId,
          }
        }
        return {
          ...value,
          parent,
          index: this.index(),
          dir: this.locale.dir,
          getRootNode: this.getRootNode,
          id: value.id ?? this.fallbackId,
        }
      },
    })
  }

  private renderGhostElements(): void {
    const before = this.renderer.createElement('div') as HTMLElement
    const after = this.renderer.createElement('div') as HTMLElement
    let destroyed = false

    applyArkProps({
      elementRef: new ElementRef(before),
      renderer: this.renderer,
      destroyRef: this.destroyRef,
      props: () => this.api().getGhostBeforeProps(),
    })
    applyArkProps({
      elementRef: new ElementRef(after),
      renderer: this.renderer,
      destroyRef: this.destroyRef,
      props: () => this.api().getGhostAfterProps(),
    })

    this.destroyRef.onDestroy(() => {
      destroyed = true
      before.parentNode?.removeChild(before)
      after.parentNode?.removeChild(after)
    })

    afterNextRender(() => {
      if (destroyed) return
      const host = this.elementRef.nativeElement
      this.renderer.insertBefore(host, before, host.firstChild)
      this.renderer.appendChild(host, after)
    })
  }
}

interface UseToastMachineOptions {
  context: () => Partial<toast.Props>
}

function useToastMachine(options: UseToastMachineOptions): UseToastReturn {
  return useMachine<ToastSchema, toast.Api>({
    machine: toast.machine,
    context: options.context,
    connect: (service, normalize) => toast.connect(service, normalize),
  })
}
