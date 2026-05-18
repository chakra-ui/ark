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
import {
  buildRootCarrier,
  createArkContextCarrier,
  createComponentWithCarrier,
  createEmbeddedViewWithCarrier,
} from './context-carrier'

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

const ROOT_TOKEN = new InjectionToken<RootMarker>('ROOT_TOKEN')
const EXTRA_TOKEN = new InjectionToken<string>('EXTRA_TOKEN')

const rootSentinelCapture: { rootViaToken: RootMarker | null; extra: string | null } = {
  rootViaToken: null,
  extra: null,
}

@Directive({
  standalone: true,
  selector: '[rootSentinel]',
})
class RootSentinelDirective {
  constructor() {
    rootSentinelCapture.rootViaToken = inject(ROOT_TOKEN)
    rootSentinelCapture.extra = inject(EXTRA_TOKEN)
  }
}

@Component({
  standalone: true,
  imports: [RootSentinelDirective],
  template: '<ng-template #tpl><span rootSentinel></span></ng-template>',
})
class RootSentinelHostComponent {
  @ViewChild('tpl', { static: true }) template!: TemplateRef<unknown>
  readonly vcRef = inject(ViewContainerRef)
}

describe('buildRootCarrier', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    rootSentinelCapture.rootViaToken = null
    rootSentinelCapture.extra = null
  })

  it('exposes the live root via the root token and forwards extra provider tokens (criterion 1)', () => {
    TestBed.configureTestingModule({ imports: [RootSentinelHostComponent] })
    const fixture = TestBed.createComponent(RootSentinelHostComponent)
    fixture.detectChanges()

    const rootInstance = new RootMarker()
    const originInjector = Injector.create({
      providers: [{ provide: RootMarker, useValue: rootInstance }],
      parent: TestBed.inject(Injector),
    })

    const carrier = buildRootCarrier<RootMarker>({
      root: rootInstance,
      rootToken: ROOT_TOKEN,
      originInjector,
      environmentInjector: TestBed.inject(EnvironmentInjector),
      providers: [{ provide: EXTRA_TOKEN, useValue: 'from-extra' }],
    })

    const viewRef = createEmbeddedViewWithCarrier(
      fixture.componentInstance.vcRef,
      fixture.componentInstance.template,
      carrier,
    )
    fixture.detectChanges()

    expect(rootSentinelCapture.rootViaToken).toBe(rootInstance)
    expect(rootSentinelCapture.extra).toBe('from-extra')
    expect(carrier.root).toBe(rootInstance)

    viewRef.destroy()
    fixture.destroy()
  })
})
