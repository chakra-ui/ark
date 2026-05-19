import { Component, Directive, Injector, InjectionToken, PLATFORM_ID, inject } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_TOAST_CONTEXT,
  ARK_TOAST_CONTEXT_CARRIER,
  ArkToaster,
  ArkToastActionTrigger,
  ArkToastCloseTrigger,
  ArkToastDescription,
  ArkToastRoot,
  ArkToastTitle,
  createToaster,
  injectArkToastContext,
  injectArkToastContextCarrier,
  toastAnatomy,
  type CreateToasterProps,
  type CreateToasterReturn,
  type ToastActionOptions,
  type ToastApi,
  type ToastGroupApi,
  type ToastMachine,
  type ToastMachineProps,
  type ToastOptions,
  type ToastPlacement,
  type ToastService,
  type ToastStore,
  type ToastStoreProps,
  type ToastType,
  type UseToastReturn,
} from '@ark-ui/angular/toast'

type ToastPublicTypeSmoke = [
  CreateToasterProps,
  CreateToasterReturn,
  ToastActionOptions,
  ToastApi,
  ToastGroupApi,
  ToastMachine,
  ToastMachineProps,
  ToastOptions,
  ToastPlacement,
  ToastService,
  ToastStore,
  ToastStoreProps,
  ToastType,
  UseToastReturn,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

@Directive({ selector: '[toastProbe]', standalone: true, exportAs: 'toastProbe' })
class ToastProbe {
  private readonly injector = inject(Injector)

  get capturedRoot(): ArkToastRoot {
    return this.injector.get(ARK_TOAST_CONTEXT)
  }

  get capturedLabelPrefix(): string | null {
    return this.injector.get(LABEL_PREFIX, null)
  }
}

@Component({
  selector: 'toast-host',
  standalone: true,
  imports: [ArkToaster, ArkToastTitle, ArkToastDescription, ArkToastActionTrigger, ArkToastCloseTrigger, ToastProbe],
  providers: [{ provide: LABEL_PREFIX, useValue: 'toast-label' }],
  template: `
    <ng-template #toastTemplate let-toast>
      <div arkToastTitle>{{ toast.title }}</div>
      <div arkToastDescription>{{ toast.description }}</div>
      @if (toast.action) {
        <button type="button" arkToastActionTrigger>{{ toast.action.label }}</button>
      }
      <button type="button" arkToastCloseTrigger>Dismiss</button>
      <span toastProbe></span>
    </ng-template>

    <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
  `,
})
class ToastHost {
  toaster = createToaster({ placement: 'bottom-end' })
}

const detect = (fixture: { detectChanges: () => void }): void => {
  TestBed.tick()
  fixture.detectChanges()
}

const visibleToastRoots = (fixture: { nativeElement: HTMLElement }): HTMLElement[] =>
  Array.from(fixture.nativeElement.querySelectorAll("[data-scope='toast'][data-part='root']"))

describe('@ark-ui/angular/toast', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TOAST_CONTEXT).toBe('object')
    expect(typeof ARK_TOAST_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkToastContext).toBe('function')
    expect(typeof injectArkToastContextCarrier).toBe('function')
    expect(typeof createToaster).toBe('function')
    expect(typeof toastAnatomy).toBe('object')
    expect(ArkToaster).toBeDefined()
    expect(ArkToastRoot).toBeDefined()
    expect(ArkToastTitle).toBeDefined()
    expect(ArkToastDescription).toBeDefined()
    expect(ArkToastActionTrigger).toBeDefined()
    expect(ArkToastCloseTrigger).toBeDefined()
    expect(undefined as ToastPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('creating a toaster can add and remove a toast', () => {
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.detectChanges()

    const id = fixture.componentInstance.toaster.create({
      title: 'Created',
      description: 'A toast was created.',
      duration: Infinity,
    })
    detect(fixture)

    expect(visibleToastRoots(fixture).length).toBe(1)
    expect(fixture.nativeElement.textContent).toContain('Created')

    fixture.componentInstance.toaster.remove(id)
    detect(fixture)

    expect(visibleToastRoots(fixture).length).toBe(0)

    fixture.destroy()
  })

  it('close trigger dismisses a toast', () => {
    vi.useFakeTimers()
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.componentInstance.toaster = createToaster({ removeDelay: 0 })
    fixture.detectChanges()

    const id = fixture.componentInstance.toaster.create({
      title: 'Closable',
      description: 'Dismiss me.',
      duration: Infinity,
    })
    detect(fixture)

    const close = fixture.debugElement.query(By.directive(ArkToastCloseTrigger)).nativeElement as HTMLButtonElement
    close.click()
    vi.advanceTimersByTime(20)
    detect(fixture)

    expect(fixture.componentInstance.toaster.isDismissed(id)).toBe(true)
    expect(visibleToastRoots(fixture).length).toBe(0)

    fixture.destroy()
  })

  it('action trigger invokes the toast action and dismisses the toast', () => {
    vi.useFakeTimers()
    const action = vi.fn()
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.componentInstance.toaster = createToaster({ removeDelay: 0 })
    fixture.detectChanges()

    const id = fixture.componentInstance.toaster.create({
      title: 'Action',
      description: 'Run the action.',
      duration: Infinity,
      action: { label: 'Undo', onClick: action },
    })
    detect(fixture)

    const actionTrigger = fixture.debugElement.query(By.directive(ArkToastActionTrigger))
      .nativeElement as HTMLButtonElement
    actionTrigger.click()
    vi.advanceTimersByTime(20)
    detect(fixture)

    expect(action).toHaveBeenCalledTimes(1)
    expect(fixture.componentInstance.toaster.isDismissed(id)).toBe(true)
    expect(visibleToastRoots(fixture).length).toBe(0)

    fixture.destroy()
  })

  it('duration auto-dismisses a toast with fake timers', () => {
    vi.useFakeTimers()
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.componentInstance.toaster = createToaster({ removeDelay: 0 })
    fixture.detectChanges()

    const id = fixture.componentInstance.toaster.create({
      title: 'Short',
      description: 'This leaves soon.',
      duration: 50,
    })
    detect(fixture)
    expect(visibleToastRoots(fixture).length).toBe(1)

    vi.advanceTimersByTime(100)
    detect(fixture)

    expect(fixture.componentInstance.toaster.isDismissed(id)).toBe(true)
    expect(visibleToastRoots(fixture).length).toBe(0)

    fixture.destroy()
  })

  it('enforces the max toast limit', () => {
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.componentInstance.toaster = createToaster({ max: 2 })
    fixture.detectChanges()

    fixture.componentInstance.toaster.create({ title: 'One', duration: Infinity })
    fixture.componentInstance.toaster.create({ title: 'Two', duration: Infinity })
    fixture.componentInstance.toaster.create({ title: 'Three', duration: Infinity })
    detect(fixture)

    expect(visibleToastRoots(fixture).length).toBe(2)
    expect(fixture.nativeElement.textContent).toContain('One')
    expect(fixture.nativeElement.textContent).toContain('Two')
    expect(fixture.nativeElement.textContent).not.toContain('Three')

    fixture.destroy()
  })

  it('updating an existing toast changes rendered content', () => {
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.detectChanges()

    const id = fixture.componentInstance.toaster.create({
      title: 'Uploading',
      description: 'Working.',
      duration: Infinity,
    })
    detect(fixture)
    expect(fixture.nativeElement.textContent).toContain('Uploading')

    fixture.componentInstance.toaster.update(id, {
      title: 'Done',
      description: 'Finished.',
      type: 'success',
      duration: Infinity,
    })
    detect(fixture)

    expect(fixture.nativeElement.textContent).toContain('Done')
    expect(fixture.nativeElement.textContent).toContain('Finished.')

    fixture.destroy()
  })

  it('dynamic content preserves toast and host provider context through getContextCarrier()', () => {
    TestBed.configureTestingModule({ imports: [ToastHost] })
    const fixture = TestBed.createComponent(ToastHost)
    fixture.detectChanges()

    fixture.componentInstance.toaster.create({
      title: 'Context',
      description: 'Probe the injector.',
      duration: Infinity,
    })
    detect(fixture)

    const probeDebug = fixture.debugElement.query(By.directive(ToastProbe))
    const rootDebug = fixture.debugElement.query(By.directive(ArkToastRoot))
    const probe = probeDebug.injector.get(ToastProbe)
    const root = rootDebug.injector.get(ArkToastRoot)

    expect(probe.capturedRoot).toBe(root)
    expect(probe.capturedLabelPrefix).toBe('toast-label')

    fixture.destroy()
  })

  it('cleans up the toaster store subscription on destroy', () => {
    const toaster = createToaster()
    const originalSubscribe = toaster.subscribe
    const cleanup = vi.fn()
    vi.spyOn(toaster, 'subscribe').mockImplementation((subscriber) => {
      const unsubscribe = originalSubscribe(subscriber)
      return () => {
        cleanup()
        unsubscribe()
      }
    })

    @Component({
      standalone: true,
      imports: [ArkToaster],
      template: `
        <ng-template #toastTemplate let-toast>{{ toast.title }}</ng-template>
        <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
      `,
    })
    class CleanupHost {
      readonly toaster = toaster
    }

    TestBed.configureTestingModule({ imports: [CleanupHost] })
    const fixture = TestBed.createComponent(CleanupHost)
    fixture.detectChanges()

    fixture.destroy()

    expect(cleanup).toHaveBeenCalledTimes(1)
  })

  it('constructs without throwing under a server platform configuration', () => {
    @Component({
      standalone: true,
      imports: [ArkToaster],
      template: `
        <ng-template #toastTemplate let-toast>{{ toast.title }}</ng-template>
        <ark-toaster [toaster]="toaster" [itemTemplate]="toastTemplate" />
      `,
    })
    class ServerHost {
      readonly toaster = createToaster()
    }

    TestBed.configureTestingModule({
      imports: [ServerHost],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const fixture = TestBed.createComponent(ServerHost)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })
})
