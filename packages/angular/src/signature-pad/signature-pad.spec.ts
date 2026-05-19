import { ApplicationRef, Component, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_SIGNATURE_PAD_CONTEXT,
  ArkSignaturePadClearTrigger,
  ArkSignaturePadContext,
  ArkSignaturePadControl,
  ArkSignaturePadGuide,
  ArkSignaturePadHiddenInput,
  ArkSignaturePadLabel,
  ArkSignaturePadRoot,
  ArkSignaturePadRootProvider,
  ArkSignaturePadSegment,
  injectArkSignaturePadContext,
  signaturePadAnatomy,
  useSignaturePad,
  type SignaturePadApi,
  type SignaturePadDataUrlOptions,
  type SignaturePadDataUrlType,
  type SignaturePadDrawDetails,
  type SignaturePadDrawEndDetails,
  type SignaturePadDrawingOptions,
  type SignaturePadElementIds,
  type SignaturePadHiddenInputMachineProps,
  type SignaturePadIntlTranslations,
  type SignaturePadMachine,
  type SignaturePadMachineProps,
  type SignaturePadPoint,
  type SignaturePadSegmentPathMachineProps,
  type SignaturePadService,
  type UseSignaturePadOptions,
  type UseSignaturePadProps,
  type UseSignaturePadReturn,
} from '@ark-ui/angular/signature-pad'

type SignaturePadPublicTypeSmoke = [
  SignaturePadApi,
  SignaturePadDataUrlOptions,
  SignaturePadDataUrlType,
  SignaturePadDrawDetails,
  SignaturePadDrawEndDetails,
  SignaturePadDrawingOptions,
  SignaturePadElementIds,
  SignaturePadHiddenInputMachineProps,
  SignaturePadIntlTranslations,
  SignaturePadMachine,
  SignaturePadMachineProps,
  SignaturePadPoint,
  SignaturePadSegmentPathMachineProps,
  SignaturePadService,
  UseSignaturePadOptions,
  UseSignaturePadProps,
  UseSignaturePadReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

const pointer = (type: string, init: MouseEventInit & { pointerId?: number; pressure?: number } = {}) => {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 10, clientY: 10, ...init })
  Object.defineProperties(event, {
    pointerId: { value: init.pointerId ?? 1 },
    pressure: { value: init.pressure ?? 0.5 },
  })
  return event as PointerEvent
}

const installPointerCaptureMocks = (element: HTMLElement) => {
  const captured = new Set<number>()
  element.setPointerCapture = vi.fn((id: number) => captured.add(id))
  element.hasPointerCapture = vi.fn((id: number) => captured.has(id))
  element.releasePointerCapture = vi.fn((id: number) => captured.delete(id))
  element.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 200,
    bottom: 100,
    width: 200,
    height: 100,
    toJSON: () => ({}),
  }))
}

describe('@ark-ui/angular/signature-pad', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_SIGNATURE_PAD_CONTEXT).toBe('object')
    expect(typeof injectArkSignaturePadContext).toBe('function')
    expect(typeof useSignaturePad).toBe('function')
    expect(typeof signaturePadAnatomy).toBe('object')
    expect(ArkSignaturePadRoot).toBeDefined()
    expect(ArkSignaturePadRootProvider).toBeDefined()
    expect(ArkSignaturePadControl).toBeDefined()
    expect(ArkSignaturePadSegment).toBeDefined()
    expect(ArkSignaturePadClearTrigger).toBeDefined()
    expect(ArkSignaturePadGuide).toBeDefined()
    expect(ArkSignaturePadHiddenInput).toBeDefined()
    expect(ArkSignaturePadLabel).toBeDefined()
    expect(ArkSignaturePadContext).toBeDefined()
    expect(undefined as SignaturePadPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useSignaturePad({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useSignaturePad({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/signature-pad::/)

    fixture.destroy()
  })

  it('renders default paths through the segment SVG', async () => {
    @Component({
      standalone: true,
      imports: [ArkSignaturePadRoot, ArkSignaturePadControl, ArkSignaturePadSegment],
      template: `
        <div arkSignaturePad [defaultPaths]="paths">
          <div arkSignaturePadControl>
            <svg arkSignaturePadSegment></svg>
          </div>
        </div>
      `,
    })
    class Host {
      readonly paths = ['M 0 0 L 10 10']
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const path = fixture.nativeElement.querySelector('path') as SVGPathElement
    expect(path.getAttribute('d')).toBe('M 0 0 L 10 10')

    fixture.destroy()
  })

  it('creates a drawing path and emits draw/drawEnd details from pointer interaction', async () => {
    @Component({
      standalone: true,
      imports: [ArkSignaturePadRoot, ArkSignaturePadControl, ArkSignaturePadSegment],
      template: `
        <div arkSignaturePad (draw)="draws.push($event)" (drawEnd)="drawEnds.push($event)">
          <div arkSignaturePadControl>
            <svg arkSignaturePadSegment></svg>
          </div>
        </div>
      `,
    })
    class Host {
      readonly draws: SignaturePadDrawDetails[] = []
      readonly drawEnds: SignaturePadDrawEndDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const control = fixture.nativeElement.querySelector('[data-part="control"]') as HTMLElement
    installPointerCaptureMocks(control)

    control.dispatchEvent(pointer('pointerdown', { clientX: 8, clientY: 8 }))
    document.dispatchEvent(pointer('pointermove', { clientX: 20, clientY: 18 }))
    document.dispatchEvent(pointer('pointerup', { clientX: 24, clientY: 20 }))
    await flush(fixture)

    expect(fixture.componentInstance.draws.length).toBeGreaterThan(0)
    expect(fixture.componentInstance.drawEnds).toHaveLength(1)
    expect(fixture.componentInstance.drawEnds[0].paths.length).toBeGreaterThan(0)
    expect(fixture.nativeElement.querySelectorAll('path').length).toBeGreaterThan(0)

    fixture.destroy()
  })

  it('clears existing paths through the clear trigger', async () => {
    @Component({
      standalone: true,
      imports: [ArkSignaturePadRoot, ArkSignaturePadControl, ArkSignaturePadSegment, ArkSignaturePadClearTrigger],
      template: `
        <div arkSignaturePad #root="arkSignaturePad" [defaultPaths]="paths">
          <div arkSignaturePadControl>
            <svg arkSignaturePadSegment></svg>
            <button arkSignaturePadClearTrigger>Clear</button>
          </div>
        </div>
      `,
    })
    class Host {
      readonly paths = ['M 0 0 L 10 10']
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkSignaturePadRoot)).injector.get(ArkSignaturePadRoot)
    expect(root.api().paths).toHaveLength(1)

    const clear = fixture.debugElement.query(By.directive(ArkSignaturePadClearTrigger))
      .nativeElement as HTMLButtonElement
    clear.click()
    await flush(fixture)

    expect(root.api().paths).toEqual([])
    expect(fixture.nativeElement.querySelectorAll('path')).toHaveLength(0)

    fixture.destroy()
  })

  it('applies hidden input value, name, disabled, required, and readonly props', async () => {
    @Component({
      standalone: true,
      imports: [ArkSignaturePadRoot, ArkSignaturePadHiddenInput],
      template: `
        <div arkSignaturePad name="signature" disabled readOnly required>
          <input arkSignaturePadHiddenInput [value]="value" />
        </div>
      `,
    })
    class Host {
      readonly value = 'encoded-paths'
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement
    expect(input.hidden).toBe(true)
    expect(input.name).toBe('signature')
    expect(input.value).toBe('encoded-paths')
    expect(input.disabled).toBe(true)
    expect(input.required).toBe(true)
    expect(input.readOnly).toBe(true)

    fixture.destroy()
  })

  it('does not draw when disabled or readonly', async () => {
    @Component({
      standalone: true,
      imports: [ArkSignaturePadRoot, ArkSignaturePadControl, ArkSignaturePadSegment],
      template: `
        <div arkSignaturePad [disabled]="disabled()" [readOnly]="readOnly()" (draw)="draws.push($event)">
          <div arkSignaturePadControl>
            <svg arkSignaturePadSegment></svg>
          </div>
        </div>
      `,
    })
    class Host {
      readonly disabled = signal(true)
      readonly readOnly = signal(false)
      readonly draws: SignaturePadDrawDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const control = fixture.nativeElement.querySelector('[data-part="control"]') as HTMLElement
    installPointerCaptureMocks(control)
    control.dispatchEvent(pointer('pointerdown'))
    document.dispatchEvent(pointer('pointermove', { clientX: 20, clientY: 20 }))
    await flush(fixture)

    expect(fixture.componentInstance.draws).toHaveLength(0)
    expect(control.getAttribute('aria-disabled')).toBe('true')

    fixture.componentInstance.disabled.set(false)
    fixture.componentInstance.readOnly.set(true)
    fixture.detectChanges()
    await flush(fixture)
    control.dispatchEvent(pointer('pointerdown'))
    document.dispatchEvent(pointer('pointermove', { clientX: 30, clientY: 30 }))
    await flush(fixture)

    expect(fixture.componentInstance.draws).toHaveLength(0)

    fixture.destroy()
  })

  it('returns an empty data URL when no signature has been drawn', async () => {
    @Component({
      standalone: true,
      imports: [ArkSignaturePadRoot],
      template: '<div arkSignaturePad></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSignaturePadRoot)).injector.get(ArkSignaturePadRoot)
    await expect(root.api().getDataUrl('image/png')).resolves.toBe('')

    fixture.destroy()
  })

  it('constructs without touching browser-only canvas APIs', () => {
    @Component({
      standalone: true,
      imports: [
        ArkSignaturePadRoot,
        ArkSignaturePadLabel,
        ArkSignaturePadControl,
        ArkSignaturePadSegment,
        ArkSignaturePadGuide,
        ArkSignaturePadHiddenInput,
      ],
      template: `
        <div arkSignaturePad>
          <label arkSignaturePadLabel>Sign</label>
          <div arkSignaturePadControl>
            <svg arkSignaturePadSegment></svg>
            <div arkSignaturePadGuide></div>
          </div>
          <input arkSignaturePadHiddenInput />
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    expect(() => {
      const fixture = TestBed.createComponent(Host)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })
})
