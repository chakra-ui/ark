import { PLATFORM_ID } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { injectArkEnvironment, provideArkEnvironment } from './environment'

describe('provideArkEnvironment / injectArkEnvironment', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the configured root node when getRootNode is provided', () => {
    const customDoc = document.implementation.createHTMLDocument('custom')
    TestBed.configureTestingModule({
      providers: [provideArkEnvironment({ getRootNode: () => customDoc })],
    })

    const env = TestBed.runInInjectionContext(() => injectArkEnvironment())
    expect(env.getRootNode()).toBe(customDoc)
  })

  it('defaults to document in a browser platform when no provider is configured', () => {
    TestBed.configureTestingModule({ providers: [] })

    const env = TestBed.runInInjectionContext(() => injectArkEnvironment())
    expect(env.getRootNode()).toBe(document)
  })

  it('returns undefined on non-browser platforms (criterion 21)', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    const env = TestBed.runInInjectionContext(() => injectArkEnvironment())
    expect(env.getRootNode()).toBeUndefined()
  })

  it('uses configured getRootNode even when PLATFORM_ID is server', () => {
    const customDoc = document.implementation.createHTMLDocument('custom-ssr')
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        provideArkEnvironment({ getRootNode: () => customDoc }),
      ],
    })

    const env = TestBed.runInInjectionContext(() => injectArkEnvironment())
    expect(env.getRootNode()).toBe(customDoc)
  })
})
