import { Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_AVATAR_CONTEXT,
  ArkAvatarFallback,
  ArkAvatarImage,
  ArkAvatarRoot,
  ArkAvatarRootProvider,
  avatarAnatomy,
  injectArkAvatarContext,
  useAvatar,
  type AvatarApi,
  type AvatarElementIds,
  type AvatarLoadStatus,
  type AvatarMachineProps,
  type AvatarStatusChangeDetails,
  type UseAvatarOptions,
  type UseAvatarProps,
  type UseAvatarReturn,
} from '@ark-ui/angular/avatar'
import { BasicExample } from './examples/basic'
import { ContextExample } from './examples/context'
import { EventsExample } from './examples/events'

@Directive({ selector: '[avatarProbe]', standalone: true, exportAs: 'avatarProbe' })
class AvatarProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseAvatarReturn {
    return this._injector.get(ARK_AVATAR_CONTEXT)
  }
}

describe('@ark-ui/angular/avatar', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface (AC #1)', () => {
    expect(typeof ARK_AVATAR_CONTEXT).toBe('object')
    expect(typeof injectArkAvatarContext).toBe('function')
    expect(typeof useAvatar).toBe('function')
    expect(typeof avatarAnatomy).toBe('object')
    expect(ArkAvatarRoot).toBeDefined()
    expect(ArkAvatarRootProvider).toBeDefined()
    expect(ArkAvatarImage).toBeDefined()
    expect(ArkAvatarFallback).toBeDefined()

    const _typeOnly:
      | {
          api: AvatarApi
          ids: AvatarElementIds
          status: AvatarLoadStatus
          machineProps: AvatarMachineProps
          details: AvatarStatusChangeDetails
          options: UseAvatarOptions
          props: UseAvatarProps
          ret: UseAvatarReturn
        }
      | undefined = undefined
    expect(_typeOnly).toBeUndefined()
  })

  it('useAvatar({ context: () => ({}) }) produces a non-empty fallback id (AC #2)', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useAvatar({ context: () => ({}) }))
    const id = (result.api().getRootProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/avatar::/)

    fixture.destroy()
  })

  it('BasicExample renders fallback text and root/fallback/image attributes (AC #6, #7, #8, #9)', () => {
    TestBed.configureTestingModule({ imports: [BasicExample] })
    const fixture = TestBed.createComponent(BasicExample)
    fixture.detectChanges()

    const host: HTMLElement = fixture.nativeElement
    expect(host.textContent).toContain('PA')

    const rootEl = host.querySelector('[arkAvatar]') as HTMLElement
    expect(rootEl).not.toBeNull()
    expect(rootEl.getAttribute('data-scope')).toBe('avatar')
    expect(rootEl.getAttribute('data-part')).toBe('root')
    const rootId = rootEl.getAttribute('id')
    expect(rootId).not.toBeNull()
    expect(rootId).toMatch(/avatar::/)

    const fallbackEl = host.querySelector('[arkAvatarFallback]') as HTMLElement
    expect(fallbackEl).not.toBeNull()
    expect(fallbackEl.getAttribute('data-scope')).toBe('avatar')
    expect(fallbackEl.getAttribute('data-part')).toBe('fallback')
    expect(fallbackEl.getAttribute('data-state')).not.toBeNull()

    const imageEl = host.querySelector('img') as HTMLImageElement
    expect(imageEl).not.toBeNull()
    expect(imageEl.getAttribute('data-scope')).toBe('avatar')
    expect(imageEl.getAttribute('data-part')).toBe('image')
    expect(imageEl.getAttribute('src')).toBe('https://i.pravatar.cc/300?u=a')
    expect(imageEl.getAttribute('alt')).toBe('avatar')

    fixture.destroy()
  })

  it('descendant probe under [arkAvatar] receives the Root directive instance via ARK_AVATAR_CONTEXT (AC #10)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarRoot, AvatarProbe],
      template: `
        <div arkAvatar>
          <span avatarProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkAvatarRoot))
    const probeDebug = fixture.debugElement.query(By.directive(AvatarProbe))
    const rootInstance = rootDebug.injector.get(ArkAvatarRoot)
    const probeInstance = probeDebug.injector.get(AvatarProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('descendant probe under [arkAvatarRootProvider] receives the exact useAvatar return reference (AC #11)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarRootProvider, AvatarProbe],
      template: `
        <div arkAvatarRootProvider [value]="avatar">
          <span avatarProbe></span>
        </div>
      `,
    })
    class Host {
      readonly avatar = useAvatar({ context: () => ({}) })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const probeDebug = fixture.debugElement.query(By.directive(AvatarProbe))
    const probeInstance = probeDebug.injector.get(AvatarProbe)

    expect(probeInstance.captured).toBe(fixture.componentInstance.avatar)

    fixture.destroy()
  })

  it('img[arkAvatarImage] without an ancestor throws a missing-provider error (AC #12)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarImage],
      template: '<img arkAvatarImage />',
    })
    class OrphanImageHost {}

    TestBed.configureTestingModule({ imports: [OrphanImageHost] })

    expect(() => {
      const fixture = TestBed.createComponent(OrphanImageHost)
      fixture.detectChanges()
      fixture.destroy()
    }).toThrow(/ARK_AVATAR_CONTEXT|No provider/i)
  })

  it('[arkAvatarRootProvider] without [value] throws Angular required-input error (AC #13)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarRootProvider],
      template: '<div arkAvatarRootProvider></div>',
    })
    class MissingValueHost {}

    TestBed.configureTestingModule({ imports: [MissingValueHost] })

    expect(() => {
      const fixture = TestBed.createComponent(MissingValueHost)
      fixture.detectChanges()
      fixture.destroy()
    }).toThrow(/required input|NG0950/i)
  })

  it('updating [ids] to changed contents triggers one setContext patch with ids (AC #14)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarRoot],
      template: '<div arkAvatar [ids]="ids()"></div>',
    })
    class IdsHost {
      readonly ids = signal<Partial<AvatarElementIds> | undefined>(undefined)
    }

    TestBed.configureTestingModule({ imports: [IdsHost] })
    const fixture = TestBed.createComponent(IdsHost)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkAvatarRoot))
    const root = rootDebug.injector.get(ArkAvatarRoot)
    const spy = vi.spyOn(root.service as unknown as { setContext: (p: unknown) => void }, 'setContext')

    fixture.componentInstance.ids.set({ root: 'r1', image: 'i1', fallback: 'f1' })
    TestBed.tick()

    const idsPatches = spy.mock.calls.filter((args) => {
      const patch = (args as unknown[])[0]
      return !!patch && Object.hasOwn(patch as object, 'ids')
    })
    expect(idsPatches.length).toBe(1)

    fixture.destroy()
  })

  it('updating [ids] to equal-contents object does not call setContext again (AC #15)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarRoot],
      template: '<div arkAvatar [ids]="ids()"></div>',
    })
    class IdsHost {
      readonly ids = signal<Partial<AvatarElementIds> | undefined>({ root: 'r1', image: 'i1', fallback: 'f1' })
    }

    TestBed.configureTestingModule({ imports: [IdsHost] })
    const fixture = TestBed.createComponent(IdsHost)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkAvatarRoot))
    const root = rootDebug.injector.get(ArkAvatarRoot)
    const spy = vi.spyOn(root.service as unknown as { setContext: (p: unknown) => void }, 'setContext')

    fixture.componentInstance.ids.set({ root: 'r1', image: 'i1', fallback: 'f1' })
    TestBed.tick()
    const afterEqual = spy.mock.calls.length

    fixture.componentInstance.ids.set({ root: 'r2', image: 'i1', fallback: 'f1' })
    TestBed.tick()

    expect(afterEqual).toBe(0)
    const idsPatches = spy.mock.calls.filter((args) => {
      const patch = (args as unknown[])[0]
      return !!patch && Object.hasOwn(patch as object, 'ids')
    })
    expect(idsPatches.length).toBe(1)

    fixture.destroy()
  })

  it('(statusChange) emits the AvatarStatusChangeDetails object reference produced by Zag (AC #16)', () => {
    @Component({
      standalone: true,
      imports: [ArkAvatarRoot, ArkAvatarImage, ArkAvatarFallback],
      template: `
        <div arkAvatar (statusChange)="captured = $event">
          <span arkAvatarFallback>PA</span>
          <img arkAvatarImage src="x" alt="x" />
        </div>
      `,
    })
    class Host {
      captured: AvatarStatusChangeDetails | null = null
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement
    img.dispatchEvent(new Event('load'))
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.captured).not.toBeNull()
    expect(fixture.componentInstance.captured?.status).toBe('loaded')

    fixture.destroy()
  })

  it('template read of avatar.api().loaded via #avatar="arkAvatar" reflects machine transitions (AC #17)', async () => {
    TestBed.configureTestingModule({ imports: [ContextExample] })
    const fixture = TestBed.createComponent(ContextExample)
    fixture.detectChanges()

    const host: HTMLElement = fixture.nativeElement
    expect(host.textContent).toContain('Loaded: false')

    const img = host.querySelector('img') as HTMLImageElement
    img.dispatchEvent(new Event('load'))
    TestBed.tick()
    fixture.detectChanges()

    expect(host.textContent).toContain('Loaded: true')

    img.dispatchEvent(new Event('error'))
    TestBed.tick()
    fixture.detectChanges()

    expect(host.textContent).toContain('Loaded: false')

    fixture.destroy()
  })

  it('destroy unsubscribes from Zag service and removes installed listeners (AC #18)', () => {
    TestBed.configureTestingModule({ imports: [EventsExample] })
    const fixture = TestBed.createComponent(EventsExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkAvatarRoot))
    const root = rootDebug.injector.get(ArkAvatarRoot)
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement

    img.dispatchEvent(new Event('load'))
    TestBed.tick()
    fixture.detectChanges()
    const statusBeforeDestroy = fixture.componentInstance.status()
    expect(statusBeforeDestroy).toBe('loaded')

    const sendSpy = vi.spyOn(root.service, 'send')
    const setSpy = vi.spyOn(root.service as unknown as { setContext: (p: unknown) => void }, 'setContext')

    fixture.destroy()

    img.dispatchEvent(new Event('load'))
    img.dispatchEvent(new Event('error'))

    expect(sendSpy).not.toHaveBeenCalled()
    expect(setSpy).not.toHaveBeenCalled()
    expect(fixture.componentInstance.status()).toBe(statusBeforeDestroy)
  })
})
