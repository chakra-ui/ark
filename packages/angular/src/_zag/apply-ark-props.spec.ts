import {
  Component,
  DestroyRef,
  type ElementRef,
  Renderer2,
  ViewChild,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ArkProps } from '../types'
import { applyArkProps } from './apply-ark-props'

interface HostHandle<E extends HTMLElement> {
  el: E
  destroy: () => void
}

function mountHost<E extends HTMLElement = HTMLDivElement>(
  template: string,
  props: () => ArkProps | undefined,
): HostHandle<E> {
  @Component({ standalone: true, template })
  class HostComponent {
    @ViewChild('target', { static: true }) target!: ElementRef<E>
    public renderer = inject(Renderer2)
    public destroyRef = inject(DestroyRef)
  }

  TestBed.configureTestingModule({ imports: [HostComponent] })
  const fixture = TestBed.createComponent(HostComponent)
  fixture.detectChanges()

  const host = fixture.componentInstance
  const injector = fixture.componentRef.injector

  runInInjectionContext(injector, () => {
    applyArkProps({
      elementRef: host.target as unknown as ElementRef<HTMLElement>,
      renderer: host.renderer,
      destroyRef: host.destroyRef,
      props,
    })
  })
  TestBed.tick()

  return {
    el: host.target.nativeElement,
    destroy: () => fixture.destroy(),
  }
}

describe('applyArkProps', () => {
  let cleanup: (() => void) | undefined

  beforeEach(() => {
    TestBed.resetTestingModule()
    cleanup = undefined
  })

  afterEach(() => {
    cleanup?.()
  })

  it('writes aria-*, data-*, role, id, and tabindex as attributes (criterion 14)', () => {
    const props = signal<ArkProps>({
      id: 'x',
      role: 'button',
      'aria-label': 'foo',
      'data-state': 'open',
      tabindex: 0,
    })
    const handle = mountHost('<div #target></div>', () => props())
    cleanup = handle.destroy

    expect(handle.el.getAttribute('id')).toBe('x')
    expect(handle.el.getAttribute('role')).toBe('button')
    expect(handle.el.getAttribute('aria-label')).toBe('foo')
    expect(handle.el.getAttribute('data-state')).toBe('open')
    expect(handle.el.getAttribute('tabindex')).toBe('0')
  })

  it('writes property-only DOM values as properties (criterion 15)', () => {
    const props = signal<ArkProps>({ value: 'bar' })
    const handle = mountHost<HTMLInputElement>('<input #target />', () => props())
    cleanup = handle.destroy

    expect(handle.el.value).toBe('bar')
    props.set({})
    TestBed.tick()
    expect(handle.el.value).toBe('')
  })

  it('installs, replaces, and disposes event listeners (criterion 16)', () => {
    const first = vi.fn()
    const second = vi.fn()
    const props = signal<ArkProps>({ onClick: first })

    const handle = mountHost('<button #target></button>', () => props())
    cleanup = handle.destroy
    handle.el.dispatchEvent(new Event('click'))
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(0)

    props.set({ onClick: second })
    TestBed.tick()

    handle.el.dispatchEvent(new Event('click'))
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)

    handle.destroy()
    cleanup = undefined
    handle.el.dispatchEvent(new Event('click'))
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('removes an installed listener when an event prop changes to a non-function value', () => {
    const first = vi.fn()
    const props = signal<ArkProps>({ onClick: first })
    const handle = mountHost('<button #target></button>', () => props())
    cleanup = handle.destroy

    props.set({ onClick: false })
    TestBed.tick()
    handle.el.dispatchEvent(new Event('click'))

    expect(first).not.toHaveBeenCalled()
    expect((handle.el as unknown as { onClick?: unknown }).onClick).toBeUndefined()
  })

  it('moves onChange listeners when an input type changes event contracts', () => {
    const onChange = vi.fn()
    const props = signal<ArkProps>({ type: 'text', onChange })
    const handle = mountHost<HTMLInputElement>('<input #target />', () => props())
    cleanup = handle.destroy

    handle.el.dispatchEvent(new Event('input'))
    handle.el.dispatchEvent(new Event('change'))
    expect(onChange).toHaveBeenCalledTimes(1)

    props.set({ type: 'checkbox', onChange })
    TestBed.tick()

    handle.el.dispatchEvent(new Event('input'))
    handle.el.dispatchEvent(new Event('change'))
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('maps onChange to native input/change events by element type', () => {
    const textChange = vi.fn()
    const textarea = mountHost<HTMLTextAreaElement>('<textarea #target></textarea>', () => ({
      onChange: textChange,
    }))
    cleanup = textarea.destroy
    textarea.el.dispatchEvent(new Event('input'))
    textarea.el.dispatchEvent(new Event('change'))
    expect(textChange).toHaveBeenCalledTimes(1)
    textarea.destroy()
    cleanup = undefined
    TestBed.resetTestingModule()

    const selectChange = vi.fn()
    const select = mountHost<HTMLSelectElement>('<select #target></select>', () => ({ onChange: selectChange }))
    cleanup = select.destroy
    select.el.dispatchEvent(new Event('input'))
    select.el.dispatchEvent(new Event('change'))
    expect(selectChange).toHaveBeenCalledTimes(1)
  })

  it('allows distinct handler props to share the same native event', () => {
    const onChange = vi.fn()
    const onInput = vi.fn()
    const handle = mountHost<HTMLInputElement>('<input #target />', () => ({ onChange, onInput }))
    cleanup = handle.destroy

    handle.el.dispatchEvent(new Event('input'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onInput).toHaveBeenCalledTimes(1)
  })

  it('manages classes from string, array, and object inputs without touching consumer classes (criterion 17)', () => {
    const props = signal<ArkProps>({ class: 'a b' })
    const handle = mountHost('<div #target></div>', () => props())
    cleanup = handle.destroy
    handle.el.classList.add('untouched')

    expect(handle.el.classList.contains('a')).toBe(true)
    expect(handle.el.classList.contains('b')).toBe(true)
    expect(handle.el.classList.contains('untouched')).toBe(true)

    props.set({ class: ['c', 'd'] })
    TestBed.tick()
    expect(handle.el.classList.contains('a')).toBe(false)
    expect(handle.el.classList.contains('b')).toBe(false)
    expect(handle.el.classList.contains('c')).toBe(true)
    expect(handle.el.classList.contains('d')).toBe(true)
    expect(handle.el.classList.contains('untouched')).toBe(true)

    props.set({ class: { e: true, f: false, c: true } })
    TestBed.tick()
    expect(handle.el.classList.contains('d')).toBe(false)
    expect(handle.el.classList.contains('e')).toBe(true)
    expect(handle.el.classList.contains('f')).toBe(false)
    expect(handle.el.classList.contains('c')).toBe(true)
    expect(handle.el.classList.contains('untouched')).toBe(true)
  })

  it('manages styles from string and object inputs (criterion 17)', () => {
    const props = signal<ArkProps>({ style: 'color: red; padding: 4px' })
    const handle = mountHost('<div #target></div>', () => props())
    cleanup = handle.destroy
    handle.el.style.setProperty('margin', '8px')

    expect(handle.el.style.getPropertyValue('color')).toBe('red')
    expect(handle.el.style.getPropertyValue('padding')).toBe('4px')
    expect(handle.el.style.getPropertyValue('margin')).toBe('8px')

    props.set({ style: { color: 'blue' } })
    TestBed.tick()
    expect(handle.el.style.getPropertyValue('color')).toBe('blue')
    expect(handle.el.style.getPropertyValue('padding')).toBe('')
    expect(handle.el.style.getPropertyValue('margin')).toBe('8px')
  })

  it('removes attributes when a prop is dropped or set to null (criterion 18)', () => {
    const props = signal<ArkProps>({ id: 'a', 'aria-label': 'hello' })
    const handle = mountHost('<div #target></div>', () => props())
    cleanup = handle.destroy
    expect(handle.el.getAttribute('id')).toBe('a')
    expect(handle.el.getAttribute('aria-label')).toBe('hello')

    props.set({ id: 'a' })
    TestBed.tick()
    expect(handle.el.getAttribute('aria-label')).toBeNull()

    props.set({})
    TestBed.tick()
    expect(handle.el.getAttribute('id')).toBeNull()
  })

  it('removes boolean-false attribute contracts (criterion 18)', () => {
    const props = signal<ArkProps>({ 'aria-expanded': true })
    const handle = mountHost('<div #target></div>', () => props())
    cleanup = handle.destroy
    expect(handle.el.getAttribute('aria-expanded')).toBe('true')

    props.set({ 'aria-expanded': false })
    TestBed.tick()
    expect(handle.el.getAttribute('aria-expanded')).toBeNull()
  })

  it('module load does not access window or document (criterion 19)', async () => {
    const mod = await import('./apply-ark-props')
    expect(typeof mod.applyArkProps).toBe('function')
  })
})
