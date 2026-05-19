import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  PLATFORM_ID,
  Renderer2,
  type Signal,
  computed,
  inject,
  input,
  runInInjectionContext,
  signal,
  type InputSignal,
  type OnInit,
  type TemplateRef,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import type { Machine } from '@zag-js/core'
import * as toast from '@zag-js/toast'
import { applyArkProps, useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'
import type { CreateToasterReturn } from './create-toaster'
import { ArkToastRoot } from './toast-root'

type ToastGroupSchema = toast.GroupMachine extends Machine<infer TSchema> ? TSchema : never
type UseToastGroupReturn = UseMachineReturn<toast.GroupService['state'], toast.GroupApi, toast.GroupService>

const emptyGroupProps = (): Record<string, unknown> => ({})

const fallbackGroupApi: toast.GroupApi = {
  getCount: () => 0,
  getToasts: () => [],
  subscribe: () => () => {},
  getGroupProps: emptyGroupProps,
}

export interface ArkToasterProps extends Omit<toast.GroupProps, 'store' | 'id'> {
  toaster: CreateToasterReturn
  itemTemplate: TemplateRef<{ $implicit: toast.Options }>
  id?: string
}

export type ToastOptions = toast.Options

@Component({
  selector: 'ark-toaster',
  standalone: true,
  imports: [NgTemplateOutlet, ArkToastRoot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (toast of toasts(); track toast.id; let index = $index) {
      <div arkToast [value]="toast" [parent]="service" [index]="index" #root="arkToast">
        <ng-container
          [ngTemplateOutlet]="itemTemplate()"
          [ngTemplateOutletContext]="{ $implicit: toast }"
          [ngTemplateOutletInjector]="root.getContextCarrier().elementInjector"
        ></ng-container>
      </div>
    }
  `,
})
export class ArkToaster implements OnInit {
  /** The toaster store instance created by createToaster(). */
  readonly toaster: InputSignal<CreateToasterReturn> = input.required<CreateToasterReturn>()
  /** Template used to render each toast item. */
  readonly itemTemplate: InputSignal<TemplateRef<{ $implicit: toast.Options }>> =
    input.required<TemplateRef<{ $implicit: toast.Options }>>()
  /** The unique identifier of the toast group. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The human-readable label for the toast region. */
  readonly label: InputSignal<string | undefined> = input<string | undefined>(undefined)

  private readonly injector = inject(Injector)
  private readonly locale = injectArkLocale()
  private readonly environment = injectArkEnvironment()
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private readonly fallbackId = createArkId('toast-group')
  private readonly machine = signal<UseToastGroupReturn | null>(null)
  private readonly getRootNode = (): Document | ShadowRoot => {
    const rootNode = this.environment.getRootNode() ?? this.elementRef.nativeElement.getRootNode()
    return rootNode.nodeType === 9 || rootNode.nodeType === 11
      ? (rootNode as Document | ShadowRoot)
      : this.elementRef.nativeElement.ownerDocument
  }

  readonly state: Signal<toast.GroupService['state']> = computed(() => {
    const machine = this.machine()
    return machine?.state() ?? ({} as toast.GroupService['state'])
  })
  readonly api: Signal<toast.GroupApi> = computed(() => this.machine()?.api() ?? fallbackGroupApi)
  readonly toasts: Signal<toast.Props[]> = computed(() => this.api().getToasts())

  readonly send: toast.GroupService['send'] = (event) => this.service.send(event)

  get service(): toast.GroupService {
    const machine = this.machine()
    if (!machine) throw new Error('ArkToaster service is unavailable before the toast group machine starts.')
    return machine.service
  }

  constructor() {
    applyArkProps({
      elementRef: this.elementRef,
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getGroupProps(this.label() ? { label: this.label() } : undefined),
    })
  }

  ngOnInit(): void {
    if (!this.isBrowser) return
    this.machine.set(runInInjectionContext(this.injector, () => this.createMachine()))
  }

  private createMachine(): UseToastGroupReturn {
    return useToastGroupMachine({
      context: () => ({
        store: this.toaster(),
        id: this.id() ?? this.fallbackId,
        dir: this.locale.dir,
        getRootNode: this.getRootNode,
      }),
    })
  }
}

interface UseToastGroupMachineOptions {
  context: () => Partial<toast.GroupProps>
}

function useToastGroupMachine(options: UseToastGroupMachineOptions): UseToastGroupReturn {
  return useMachine<ToastGroupSchema, toast.GroupApi>({
    machine: toast.group.machine,
    context: options.context,
    connect: (service, normalize) => toast.group.connect(service, normalize),
  })
}
