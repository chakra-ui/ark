import { CommonModule } from '@angular/common'
import {
  Component,
  Directive,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Injector,
  type TemplateRef,
  ViewChild,
  ViewContainerRef,
  createEnvironmentInjector,
  inject,
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { createArkContextCarrier, createComponentWithCarrier, createEmbeddedViewWithCarrier } from './context-carrier'

const PROVIDER_TOKEN = new InjectionToken<string>('PROVIDER_TOKEN')

@Injectable()
class RootMarker {
  readonly tag = 'root'
}

const sentinelCapture: { tokenValue: string | null; root: RootMarker | null } = {
  tokenValue: null,
  root: null,
}

@Directive({
  standalone: true,
  selector: '[testSentinel]',
})
class SentinelDirective {
  constructor() {
    sentinelCapture.tokenValue = inject(PROVIDER_TOKEN)
    sentinelCapture.root = inject(RootMarker)
  }
}

@Component({
  standalone: true,
  imports: [SentinelDirective],
  template: '<ng-template #tpl><span testSentinel></span></ng-template>',
})
class EmbeddedHostComponent {
  @ViewChild('tpl', { static: true }) template!: TemplateRef<unknown>
  readonly vcRef = inject(ViewContainerRef)
}

@Component({
  standalone: true,
  imports: [CommonModule, SentinelDirective],
  template:
    '<ng-template #tpl><span testSentinel></span></ng-template><ng-container *ngTemplateOutlet="tpl; injector: outletInjector"></ng-container>',
})
class OutletHostComponent {
  @ViewChild('tpl', { static: true }) template!: TemplateRef<unknown>
  outletInjector: Injector | null = null
}

@Component({
  standalone: true,
  template: '<span></span>',
})
class DynamicComponent {
  readonly tokenValue = inject(PROVIDER_TOKEN)
  readonly root = inject(RootMarker)
}

function buildCarrier(originInjector: Injector): {
  envInjector: EnvironmentInjector
  elementInjector: Injector
  rootMarker: RootMarker
  carrier: ReturnType<typeof createArkContextCarrier<RootMarker>>
} {
  const rootEnv = TestBed.inject(EnvironmentInjector)
  const envInjector = createEnvironmentInjector(
    [
      { provide: PROVIDER_TOKEN, useValue: 'from-provider' },
      { provide: RootMarker, useValue: { tag: 'root' } },
    ],
    rootEnv,
  )
  const elementInjector = Injector.create({
    providers: [],
    parent: envInjector,
  })
  const rootMarker = envInjector.get(RootMarker)
  const carrier = createArkContextCarrier<RootMarker>({
    originInjector,
    environmentInjector: envInjector,
    elementInjector,
    root: rootMarker,
  })
  return { envInjector, elementInjector, rootMarker, carrier }
}

describe('createArkContextCarrier', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    sentinelCapture.tokenValue = null
    sentinelCapture.root = null
  })

  it('preserves provider context through ViewContainerRef.createEmbeddedView (criterion 24)', () => {
    TestBed.configureTestingModule({ imports: [EmbeddedHostComponent] })
    const fixture = TestBed.createComponent(EmbeddedHostComponent)
    fixture.detectChanges()

    const host = fixture.componentInstance
    const { carrier, rootMarker } = buildCarrier(TestBed.inject(Injector))

    const viewRef = createEmbeddedViewWithCarrier(host.vcRef, host.template, carrier)
    fixture.detectChanges()

    expect(sentinelCapture.tokenValue).toBe('from-provider')
    expect(sentinelCapture.root).toBe(rootMarker)

    viewRef.destroy()
    fixture.destroy()
  })

  it('preserves provider context through NgTemplateOutlet with ngTemplateOutletInjector (criterion 25)', () => {
    TestBed.configureTestingModule({ imports: [OutletHostComponent] })
    const fixture = TestBed.createComponent(OutletHostComponent)
    const { carrier, rootMarker } = buildCarrier(TestBed.inject(Injector))

    fixture.componentInstance.outletInjector = carrier.elementInjector
    fixture.detectChanges()

    expect(sentinelCapture.tokenValue).toBe('from-provider')
    expect(sentinelCapture.root).toBe(rootMarker)

    fixture.destroy()
  })

  it('preserves provider context through createComponent with environmentInjector and elementInjector (criterion 26)', () => {
    TestBed.configureTestingModule({ imports: [DynamicComponent] })
    const { carrier, rootMarker } = buildCarrier(TestBed.inject(Injector))

    const componentRef = createComponentWithCarrier(DynamicComponent, carrier)

    expect(componentRef.instance.tokenValue).toBe('from-provider')
    expect(componentRef.instance.root).toBe(rootMarker)

    componentRef.destroy()
  })
})
