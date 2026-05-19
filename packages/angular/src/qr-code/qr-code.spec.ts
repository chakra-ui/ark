import { ApplicationRef, Component, PLATFORM_ID, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_QR_CODE_CONTEXT,
  ArkQrCodeContext,
  ArkQrCodeDownloadTrigger,
  ArkQrCodeFrame,
  ArkQrCodeOverlay,
  ArkQrCodePattern,
  ArkQrCodeRoot,
  ArkQrCodeRootProvider,
  injectArkQrCodeContext,
  qrCodeAnatomy,
  useQrCode,
  type QrCodeApi,
  type QrCodeDownloadTriggerMachineProps,
  type QrCodeElementIds,
  type QrCodeGenerateOptions,
  type QrCodeGenerateResult,
  type QrCodeMachine,
  type QrCodeMachineProps,
  type QrCodeService,
  type QrCodeValueChangeDetails,
  type UseQrCodeOptions,
  type UseQrCodeProps,
  type UseQrCodeReturn,
} from '@ark-ui/angular/qr-code'

type QrCodePublicTypeSmoke = [
  QrCodeApi,
  QrCodeDownloadTriggerMachineProps,
  QrCodeElementIds,
  QrCodeGenerateOptions,
  QrCodeGenerateResult,
  QrCodeMachine,
  QrCodeMachineProps,
  QrCodeService,
  QrCodeValueChangeDetails,
  UseQrCodeOptions,
  UseQrCodeProps,
  UseQrCodeReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

describe('@ark-ui/angular/qr-code', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_QR_CODE_CONTEXT).toBe('object')
    expect(typeof injectArkQrCodeContext).toBe('function')
    expect(typeof useQrCode).toBe('function')
    expect(typeof qrCodeAnatomy).toBe('object')
    expect(ArkQrCodeRoot).toBeDefined()
    expect(ArkQrCodeRootProvider).toBeDefined()
    expect(ArkQrCodeFrame).toBeDefined()
    expect(ArkQrCodePattern).toBeDefined()
    expect(ArkQrCodeOverlay).toBeDefined()
    expect(ArkQrCodeDownloadTrigger).toBeDefined()
    expect(ArkQrCodeContext).toBeDefined()
    expect(undefined as QrCodePublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useQrCode({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useQrCode({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/qr-code::/)

    fixture.destroy()
  })

  it('applies generated SVG frame and pattern props', async () => {
    @Component({
      standalone: true,
      imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern],
      template: `
        <div arkQrCode defaultValue="http://ark-ui.com" [pixelSize]="4">
          <svg arkQrCodeFrame>
            <path arkQrCodePattern />
          </svg>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.nativeElement.querySelector('[data-scope="qr-code"][data-part="root"]') as HTMLElement
    const frame = fixture.nativeElement.querySelector('svg') as SVGSVGElement
    const pattern = fixture.nativeElement.querySelector('path') as SVGPathElement

    expect(root.style.getPropertyValue('--qrcode-pixel-size')).toBe('4px')
    expect(frame.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(frame.getAttribute('viewBox')).toMatch(/^0 0 \d+ \d+$/)
    expect(pattern.getAttribute('data-part')).toBe('pattern')
    expect(pattern.getAttribute('d')?.length).toBeGreaterThan(0)

    fixture.destroy()
  })

  it('supports default and controlled value channels with one valueChange emission', async () => {
    @Component({
      standalone: true,
      imports: [ArkQrCodeRoot],
      template: `
        <div
          arkQrCode
          #qrCode="arkQrCode"
          defaultValue="https://default.example"
          [(value)]="value"
          (valueChange)="changes.push($event)"
        ></div>
      `,
    })
    class Host {
      readonly value = signal<string | undefined>(undefined)
      readonly changes: Array<string | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkQrCodeRoot)).injector.get(ArkQrCodeRoot)
    expect(root.api().value).toBe('https://default.example')

    fixture.componentInstance.value.set('https://controlled.example')
    await flush(fixture)
    expect(root.api().value).toBe('https://controlled.example')

    root.api().setValue('https://next.example')
    await flush(fixture)

    expect(fixture.componentInstance.value()).toBe('https://next.example')
    expect(fixture.componentInstance.changes).toEqual(['https://next.example'])

    fixture.destroy()
  })

  it('applies overlay props', async () => {
    @Component({
      standalone: true,
      imports: [ArkQrCodeRoot, ArkQrCodeOverlay],
      template: `
        <div arkQrCode defaultValue="http://ark-ui.com">
          <div arkQrCodeOverlay>Ark</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const overlay = fixture.nativeElement.querySelector('[data-part="overlay"]') as HTMLElement
    expect(overlay.style.position).toBe('absolute')
    expect(overlay.style.top).toBe('50%')
    expect(overlay.style.left).toBe('50%')

    fixture.destroy()
  })

  it('applies download trigger props', async () => {
    @Component({
      standalone: true,
      imports: [ArkQrCodeRoot, ArkQrCodeDownloadTrigger],
      template: `
        <div arkQrCode defaultValue="http://ark-ui.com">
          <button arkQrCodeDownloadTrigger fileName="qr-code.png" mimeType="image/png" [quality]="0.92">
            Download
          </button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    expect(trigger.type).toBe('button')
    expect(trigger.getAttribute('data-part')).toBe('download-trigger')

    fixture.destroy()
  })

  it('constructs on the server platform without browser globals', () => {
    @Component({
      standalone: true,
      imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeOverlay, ArkQrCodeDownloadTrigger],
      template: `
        <div arkQrCode defaultValue="http://ark-ui.com">
          <svg arkQrCodeFrame>
            <path arkQrCodePattern />
          </svg>
          <div arkQrCodeOverlay>Ark</div>
          <button arkQrCodeDownloadTrigger fileName="qr-code.svg" mimeType="image/svg+xml">Download</button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    const fixture = TestBed.createComponent(Host)
    expect(() => fixture.detectChanges()).not.toThrow()
    fixture.destroy()
  })
})
