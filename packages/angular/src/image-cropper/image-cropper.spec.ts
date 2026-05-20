import { ApplicationRef, Component, Injector, PLATFORM_ID, inject, runInInjectionContext, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_IMAGE_CROPPER_CONTEXT,
  ArkImageCropperContext,
  ArkImageCropperGrid,
  ArkImageCropperHandle,
  ArkImageCropperImage,
  ArkImageCropperRoot,
  ArkImageCropperRootProvider,
  ArkImageCropperSelection,
  ArkImageCropperViewport,
  imageCropperAnatomy,
  imageCropperHandles,
  injectArkImageCropperContext,
  useImageCropper,
  type ImageCropperApi,
  type ImageCropperBoundingRect,
  type ImageCropperCropChangeDetails,
  type ImageCropperCropData,
  type ImageCropperElementIds,
  type ImageCropperFlipChangeDetails,
  type ImageCropperFlipState,
  type ImageCropperGetCroppedImageOptions,
  type ImageCropperGridMachineProps,
  type ImageCropperHandleMachineProps,
  type ImageCropperHandlePosition,
  type ImageCropperIntlTranslations,
  type ImageCropperMachine,
  type ImageCropperMachineProps,
  type ImageCropperPreviewDescriptionDetails,
  type ImageCropperRotationChangeDetails,
  type ImageCropperSelectionLabelDetails,
  type ImageCropperSelectionValueTextDetails,
  type ImageCropperService,
  type ImageCropperZoomChangeDetails,
  type UseImageCropperOptions,
  type UseImageCropperProps,
  type UseImageCropperReturn,
} from '@ark-ui/angular/image-cropper'
import { ImageCropperBasicExample } from './examples/basic'
import { ImageCropperAspectRatioExample } from './examples/aspect-ratio'
import { ImageCropperCircleExample } from './examples/circle'
import { ImageCropperContextExample } from './examples/context'
import { ImageCropperControlledZoomExample } from './examples/controlled-zoom'
import { ImageCropperCropPreviewExample } from './examples/crop-preview'
import { ImageCropperEventsExample } from './examples/events'
import { ImageCropperFixedExample } from './examples/fixed'
import { ImageCropperFlipExample } from './examples/flip'
import { ImageCropperInitialCropExample } from './examples/initial-crop'
import { ImageCropperMinMaxSizeExample } from './examples/min-max-size'
import { ImageCropperResetExample } from './examples/reset'
import { ImageCropperRotationExample } from './examples/rotation'
import { ImageCropperRootProviderExample } from './examples/root-provider'
import { ImageCropperZoomLimitsExample } from './examples/zoom-limits'

type ImageCropperPublicTypeSmoke = [
  ImageCropperApi,
  ImageCropperBoundingRect,
  ImageCropperCropChangeDetails,
  ImageCropperCropData,
  ImageCropperElementIds,
  ImageCropperFlipChangeDetails,
  ImageCropperFlipState,
  ImageCropperGetCroppedImageOptions,
  ImageCropperGridMachineProps,
  ImageCropperHandleMachineProps,
  ImageCropperHandlePosition,
  ImageCropperIntlTranslations,
  ImageCropperMachine,
  ImageCropperMachineProps,
  ImageCropperPreviewDescriptionDetails,
  ImageCropperRotationChangeDetails,
  ImageCropperSelectionLabelDetails,
  ImageCropperSelectionValueTextDetails,
  ImageCropperService,
  ImageCropperZoomChangeDetails,
  UseImageCropperOptions,
  UseImageCropperProps,
  UseImageCropperReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

const rect = (width: number, height: number): DOMRect => ({
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: width,
  bottom: height,
  width,
  height,
  toJSON: () => ({}),
})

const pointer = (type: string, init: MouseEventInit = {}) =>
  new MouseEvent(type, { bubbles: true, cancelable: true, clientX: 10, clientY: 10, ...init }) as PointerEvent

const prepareImage = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  const viewport = fixture.debugElement.query(By.directive(ArkImageCropperViewport)).nativeElement as HTMLElement
  const image = fixture.debugElement.query(By.directive(ArkImageCropperImage)).nativeElement as HTMLImageElement

  viewport.getBoundingClientRect = vi.fn(() => rect(300, 200))
  Object.defineProperties(image, {
    complete: { value: true, configurable: true },
    naturalWidth: { value: 600, configurable: true },
    naturalHeight: { value: 400, configurable: true },
  })
  image.dispatchEvent(new Event('load', { bubbles: true }))
  await flush(fixture)
}

describe('@ark-ui/angular/image-cropper', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_IMAGE_CROPPER_CONTEXT).toBe('object')
    expect(typeof injectArkImageCropperContext).toBe('function')
    expect(typeof useImageCropper).toBe('function')
    expect(typeof imageCropperAnatomy).toBe('object')
    expect(Array.isArray(imageCropperHandles)).toBe(true)
    expect(ArkImageCropperRoot).toBeDefined()
    expect(ArkImageCropperRootProvider).toBeDefined()
    expect(ArkImageCropperViewport).toBeDefined()
    expect(ArkImageCropperImage).toBeDefined()
    expect(ArkImageCropperSelection).toBeDefined()
    expect(ArkImageCropperHandle).toBeDefined()
    expect(ArkImageCropperGrid).toBeDefined()
    expect(ArkImageCropperContext).toBeDefined()
    expect(ImageCropperAspectRatioExample).toBeDefined()
    expect(ImageCropperBasicExample).toBeDefined()
    expect(ImageCropperCircleExample).toBeDefined()
    expect(ImageCropperContextExample).toBeDefined()
    expect(ImageCropperControlledZoomExample).toBeDefined()
    expect(ImageCropperCropPreviewExample).toBeDefined()
    expect(ImageCropperEventsExample).toBeDefined()
    expect(ImageCropperFixedExample).toBeDefined()
    expect(ImageCropperFlipExample).toBeDefined()
    expect(ImageCropperInitialCropExample).toBeDefined()
    expect(ImageCropperMinMaxSizeExample).toBeDefined()
    expect(ImageCropperResetExample).toBeDefined()
    expect(ImageCropperRotationExample).toBeDefined()
    expect(ImageCropperRootProviderExample).toBeDefined()
    expect(ImageCropperZoomLimitsExample).toBeDefined()
    expect(undefined as ImageCropperPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('renders all documented Storybook examples', () => {
    const examples = [
      ImageCropperAspectRatioExample,
      ImageCropperBasicExample,
      ImageCropperCircleExample,
      ImageCropperContextExample,
      ImageCropperControlledZoomExample,
      ImageCropperCropPreviewExample,
      ImageCropperEventsExample,
      ImageCropperFixedExample,
      ImageCropperFlipExample,
      ImageCropperInitialCropExample,
      ImageCropperMinMaxSizeExample,
      ImageCropperResetExample,
      ImageCropperRotationExample,
      ImageCropperRootProviderExample,
      ImageCropperZoomLimitsExample,
    ]

    for (const Example of examples) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()

      expect(fixture.nativeElement.querySelector('[data-scope="image-cropper"][data-part="root"]')).toBeTruthy()
      fixture.destroy()
    }
  })

  it('useImageCropper({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useImageCropper({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/image-cropper::/)

    fixture.destroy()
  })

  it('applies viewport, image, selection, handle, and grid props', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkImageCropperRoot,
        ArkImageCropperViewport,
        ArkImageCropperImage,
        ArkImageCropperSelection,
        ArkImageCropperHandle,
        ArkImageCropperGrid,
      ],
      template: `
        <div arkImageCropper cropShape="circle">
          <div arkImageCropperViewport>
            <img arkImageCropperImage src="/crop.jpg" />
            <div arkImageCropperSelection>
              <div arkImageCropperGrid axis="horizontal"></div>
              <div arkImageCropperGrid axis="vertical"></div>
              <div arkImageCropperHandle position="se"></div>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await prepareImage(fixture)

    const root = fixture.nativeElement.querySelector('[data-scope="image-cropper"][data-part="root"]') as HTMLElement
    const viewport = fixture.nativeElement.querySelector('[data-part="viewport"]') as HTMLElement
    const image = fixture.nativeElement.querySelector('[data-part="image"]') as HTMLImageElement
    const selection = fixture.nativeElement.querySelector('[data-part="selection"]') as HTMLElement
    const handle = fixture.nativeElement.querySelector('[data-part="handle"]') as HTMLElement
    const grids = fixture.nativeElement.querySelectorAll('[data-part="grid"]') as NodeListOf<HTMLElement>

    expect(root.getAttribute('data-shape')).toBe('circle')
    expect(viewport.style.overflow).toBe('hidden')
    expect(image.draggable).toBe(false)
    expect(selection.getAttribute('role')).toBe('slider')
    expect(handle.getAttribute('data-position')).toBe('se')
    expect(grids[0].getAttribute('data-axis')).toBe('horizontal')
    expect(grids[1].getAttribute('data-axis')).toBe('vertical')

    fixture.destroy()
  })

  it('round-trips zoom, rotation, and flip model channels with one output per change', async () => {
    @Component({
      standalone: true,
      imports: [ArkImageCropperRoot],
      template: `
        <div
          arkImageCropper
          [(zoom)]="zoom"
          [(rotation)]="rotation"
          [(flip)]="flip"
          (zoomChange)="zoomChanges.push($event)"
          (rotationChange)="rotationChanges.push($event)"
          (flipChange)="flipChanges.push($event)"
        ></div>
      `,
    })
    class Host {
      readonly zoom = signal<number | undefined>(1)
      readonly rotation = signal<number | undefined>(0)
      readonly flip = signal<ImageCropperFlipState | undefined>({ horizontal: false, vertical: false })
      readonly zoomChanges: Array<number | undefined> = []
      readonly rotationChanges: Array<number | undefined> = []
      readonly flipChanges: Array<ImageCropperFlipState | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkImageCropperRoot)).injector.get(ArkImageCropperRoot)
    root.api().setZoom(2.5)
    root.api().setRotation(90)
    root.api().setFlip({ horizontal: true })
    await flush(fixture)

    expect(fixture.componentInstance.zoom()).toBe(2.5)
    expect(fixture.componentInstance.rotation()).toBe(90)
    expect(fixture.componentInstance.flip()).toEqual({ horizontal: true, vertical: false })
    expect(fixture.componentInstance.zoomChanges).toEqual([2.5])
    expect(fixture.componentInstance.rotationChanges).toEqual([90])
    expect(fixture.componentInstance.flipChanges).toEqual([{ horizontal: true, vertical: false }])

    fixture.destroy()
  })

  it('emits crop changes from programmatic resize and exposes crop data', async () => {
    @Component({
      standalone: true,
      imports: [ArkImageCropperRoot, ArkImageCropperViewport, ArkImageCropperImage, ArkImageCropperSelection],
      template: `
        <div arkImageCropper (cropChange)="crops.push($event)">
          <div arkImageCropperViewport>
            <img arkImageCropperImage src="/crop.jpg" />
            <div arkImageCropperSelection></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly crops: ImageCropperCropChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await prepareImage(fixture)

    const root = fixture.debugElement.query(By.directive(ArkImageCropperRoot)).injector.get(ArkImageCropperRoot)
    const initialWidth = root.api().crop.width
    root.api().resize('se', 20)
    root.api().setRotation(45)
    root.api().setFlip({ vertical: true })
    await flush(fixture)

    const data = root.api().getCropData()
    expect(fixture.componentInstance.crops.length).toBeGreaterThan(0)
    expect(root.api().crop.width).toBeGreaterThan(initialWidth)
    expect(data.width).toBeGreaterThan(0)
    expect(data.rotate).toBe(45)
    expect(data.flipY).toBe(true)

    fixture.destroy()
  })

  it('resizes the crop area from a handle pointer drag', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkImageCropperRoot,
        ArkImageCropperViewport,
        ArkImageCropperImage,
        ArkImageCropperSelection,
        ArkImageCropperHandle,
      ],
      template: `
        <div arkImageCropper>
          <div arkImageCropperViewport>
            <img arkImageCropperImage src="/crop.jpg" />
            <div arkImageCropperSelection>
              <div arkImageCropperHandle position="se"></div>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await prepareImage(fixture)

    const root = fixture.debugElement.query(By.directive(ArkImageCropperRoot)).injector.get(ArkImageCropperRoot)
    const handle = fixture.debugElement.query(By.directive(ArkImageCropperHandle)).nativeElement as HTMLElement
    const initial = root.api().crop

    handle.dispatchEvent(pointer('pointerdown', { clientX: 100, clientY: 100 }))
    await flush(fixture)
    document.dispatchEvent(pointer('pointermove', { clientX: 130, clientY: 130 }))
    document.dispatchEvent(pointer('pointerup', { clientX: 130, clientY: 130 }))
    await flush(fixture)

    expect(root.api().crop.width).toBeGreaterThan(initial.width)
    expect(root.api().crop.height).toBeGreaterThan(initial.height)

    fixture.destroy()
  })

  it('keeps the crop fixed when fixedCropArea is enabled', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkImageCropperRoot,
        ArkImageCropperViewport,
        ArkImageCropperImage,
        ArkImageCropperSelection,
        ArkImageCropperHandle,
      ],
      template: `
        <div arkImageCropper fixedCropArea>
          <div arkImageCropperViewport>
            <img arkImageCropperImage src="/crop.jpg" />
            <div arkImageCropperSelection>
              <div arkImageCropperHandle position="se"></div>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await prepareImage(fixture)

    const root = fixture.debugElement.query(By.directive(ArkImageCropperRoot)).injector.get(ArkImageCropperRoot)
    const handle = fixture.debugElement.query(By.directive(ArkImageCropperHandle)).nativeElement as HTMLElement
    const initial = { ...root.api().crop }

    root.api().resize('se', 30)
    await flush(fixture)

    expect(root.api().crop).toEqual(initial)
    expect(handle.getAttribute('data-disabled')).toBe('')

    fixture.destroy()
  })

  it('applies edge configuration props used by parity stories', async () => {
    @Component({
      standalone: true,
      imports: [ArkImageCropperRoot, ArkImageCropperViewport, ArkImageCropperImage, ArkImageCropperSelection],
      template: `
        <div
          arkImageCropper
          [aspectRatio]="16 / 9"
          [initialCrop]="{ x: 50, y: 30, width: 200, height: 120 }"
          [minWidth]="80"
          [minHeight]="80"
          [maxWidth]="200"
          [maxHeight]="200"
          [minZoom]="0.5"
          [maxZoom]="2"
        >
          <div arkImageCropperViewport>
            <img arkImageCropperImage src="/crop.jpg" />
            <div arkImageCropperSelection></div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await prepareImage(fixture)

    const root = fixture.debugElement.query(By.directive(ArkImageCropperRoot)).injector.get(ArkImageCropperRoot)
    root.api().setZoom(10)
    root.api().resize('se', 500)
    await flush(fixture)

    expect(root.api().zoom).toBeLessThanOrEqual(2)
    expect(root.api().crop.width).toBeLessThanOrEqual(200)
    expect(root.api().crop.height).toBeLessThanOrEqual(200)

    fixture.destroy()
  })

  it('guards getCroppedImage when no natural image size is available', async () => {
    @Component({
      standalone: true,
      imports: [ArkImageCropperRoot],
      template: '<div arkImageCropper></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkImageCropperRoot)).injector.get(ArkImageCropperRoot)
    await expect(root.api().getCroppedImage({ output: 'dataUrl' })).resolves.toBeNull()

    fixture.destroy()
  })

  it('provides root context through arkImageCropperRootProvider', async () => {
    @Component({
      standalone: true,
      imports: [ArkImageCropperRootProvider, ArkImageCropperContext],
      template: `
        <div arkImageCropperRootProvider [value]="imageCropper">
          <ng-template arkImageCropperContext let-api="api">{{ api().zoom }}</ng-template>
        </div>
      `,
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly imageCropper = runInInjectionContext(this.injector, () =>
        useImageCropper({ context: () => ({ defaultZoom: 1.5 }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootProvider = fixture.debugElement
      .query(By.directive(ArkImageCropperRootProvider))
      .injector.get(ArkImageCropperRootProvider)
    expect(rootProvider.api().zoom).toBe(1.5)
    expect(fixture.nativeElement.textContent).toContain('1.5')

    fixture.destroy()
  })

  it('constructs on the server platform without browser globals', () => {
    @Component({
      standalone: true,
      imports: [
        ArkImageCropperRoot,
        ArkImageCropperViewport,
        ArkImageCropperImage,
        ArkImageCropperSelection,
        ArkImageCropperHandle,
        ArkImageCropperGrid,
      ],
      template: `
        <div arkImageCropper>
          <div arkImageCropperViewport>
            <img arkImageCropperImage src="/crop.jpg" />
            <div arkImageCropperSelection>
              <div arkImageCropperGrid axis="horizontal"></div>
              <div arkImageCropperHandle position="se"></div>
            </div>
          </div>
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
