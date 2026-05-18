import type * as collapsible from '@zag-js/collapsible'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  type ProviderToken,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { CollapsibleElementIds } from './collapsible.types'
import { ARK_COLLAPSIBLE_CONTEXT } from './use-collapsible-context'
import { useCollapsible, type UseCollapsibleReturn } from './use-collapsible'

@Directive({
  selector: '[arkCollapsible]',
  standalone: true,
  exportAs: 'arkCollapsible',
  providers: [{ provide: ARK_COLLAPSIBLE_CONTEXT, useExisting: forwardRef(() => ArkCollapsibleRoot) }],
})
export class ArkCollapsibleRoot implements UseCollapsibleReturn {
  /** The unique identifier of the collapsible. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the collapsible. Useful for composition. */
  readonly ids: InputSignal<Partial<CollapsibleElementIds> | undefined> = input<
    Partial<CollapsibleElementIds> | undefined
  >(undefined)
  /** The controlled open state of the collapsible. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the collapsible when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the collapsible is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The height of the content when collapsed. */
  readonly collapsedHeight: InputSignal<number | string | undefined> = input<number | string | undefined>(undefined)
  /** The width of the content when collapsed. */
  readonly collapsedWidth: InputSignal<number | string | undefined> = input<number | string | undefined>(undefined)

  private readonly machine = useCollapsible({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      disabled: this.disabled(),
      collapsedHeight: this.collapsedHeight(),
      collapsedWidth: this.collapsedWidth(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
    }),
  })

  readonly state: Signal<collapsible.Service['state']> = this.machine.state
  readonly api: Signal<collapsible.Api> = this.machine.api
  readonly service: collapsible.Service = this.machine.service
  readonly send: collapsible.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkCollapsibleRoot> = buildRootCarrier<ArkCollapsibleRoot>({
    root: this,
    rootToken: ARK_COLLAPSIBLE_CONTEXT as ProviderToken<ArkCollapsibleRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
