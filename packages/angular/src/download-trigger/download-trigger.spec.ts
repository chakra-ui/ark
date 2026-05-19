import { Component, ErrorHandler, PLATFORM_ID, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { downloadFileMock } = vi.hoisted(() => ({ downloadFileMock: vi.fn() }))

vi.mock('@zag-js/file-utils', () => ({
  downloadFile: (...args: unknown[]) => downloadFileMock(...args),
}))

import { ArkDownloadTriggerDirective, type DownloadData } from './download-trigger'

describe('ArkDownloadTriggerDirective', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    downloadFileMock.mockReset()
  })

  afterEach(() => {
    downloadFileMock.mockReset()
  })

  const mount = (data: DownloadData | undefined, fileName = 'report.txt', mimeType = 'text/plain') => {
    const dataSignal = signal<DownloadData | undefined>(data)

    @Component({
      standalone: true,
      imports: [ArkDownloadTriggerDirective],
      template:
        '<button type="button" arkDownloadTrigger [fileName]="fileName" [mimeType]="mimeType" [data]="data()"></button>',
    })
    class HostComponent {
      readonly fileName = fileName
      readonly mimeType = mimeType
      readonly data = dataSignal
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    return { fixture, button }
  }

  it('resolves a synchronous string and calls downloadFile with the expected args', () => {
    const { button } = mount('hello world')
    button.click()

    expect(downloadFileMock).toHaveBeenCalledTimes(1)
    expect(downloadFileMock).toHaveBeenCalledWith({
      file: 'hello world',
      name: 'report.txt',
      type: 'text/plain',
      win: window,
    })
  })

  it('resolves a synchronous function returning a string before delegating to downloadFile', () => {
    const provider = vi.fn<() => string>(() => 'from-fn')
    const { button } = mount(provider)
    button.click()

    expect(provider).toHaveBeenCalledTimes(1)
    expect(downloadFileMock).toHaveBeenCalledTimes(1)
    expect(downloadFileMock).toHaveBeenCalledWith({
      file: 'from-fn',
      name: 'report.txt',
      type: 'text/plain',
      win: window,
    })
  })

  it('awaits a function returning a Promise before delegating to downloadFile', async () => {
    const blob = new Blob(['async-bytes'], { type: 'application/octet-stream' })
    const promise = Promise.resolve(blob)
    const provider = vi.fn<() => Promise<Blob>>(() => promise)
    const { button } = mount(provider, 'async.bin', 'application/octet-stream')
    button.click()

    expect(downloadFileMock).not.toHaveBeenCalled()
    await promise

    expect(provider).toHaveBeenCalledTimes(1)
    expect(downloadFileMock).toHaveBeenCalledTimes(1)
    expect(downloadFileMock).toHaveBeenCalledWith({
      file: blob,
      name: 'async.bin',
      type: 'application/octet-stream',
      win: window,
    })
  })

  it('routes rejected async providers through Angular error handling', async () => {
    const error = new Error('download failed')
    const handleError = vi.fn()
    const provider = vi.fn<() => Promise<Blob>>(() => Promise.reject(error))

    const dataSignal = signal<DownloadData | undefined>(provider)

    @Component({
      standalone: true,
      imports: [ArkDownloadTriggerDirective],
      template: '<button type="button" arkDownloadTrigger [data]="data()"></button>',
    })
    class HostComponent {
      readonly data = dataSignal
    }

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: ErrorHandler, useValue: { handleError } }],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    button.click()
    await Promise.resolve()
    await Promise.resolve()

    expect(handleError).toHaveBeenCalledWith(error)
    expect(downloadFileMock).not.toHaveBeenCalled()
  })

  it('passes direct Blob values to downloadFile', () => {
    const blob = new Blob(['direct'], { type: 'text/plain' })
    const { button } = mount(blob)
    button.click()

    expect(downloadFileMock).toHaveBeenCalledWith({
      file: blob,
      name: 'report.txt',
      type: 'text/plain',
      win: window,
    })
  })

  it('passes direct File values to downloadFile', () => {
    const file = new File(['direct'], 'direct.txt', { type: 'text/plain' })
    const { button } = mount(file, 'renamed.txt', 'text/plain')
    button.click()

    expect(downloadFileMock).toHaveBeenCalledWith({
      file,
      name: 'renamed.txt',
      type: 'text/plain',
      win: window,
    })
  })

  it('does not call downloadFile when PLATFORM_ID indicates a non-browser platform', () => {
    const dataSignal = signal<DownloadData | undefined>('ssr-payload')

    @Component({
      standalone: true,
      imports: [ArkDownloadTriggerDirective],
      template: '<button type="button" arkDownloadTrigger [data]="data()"></button>',
    })
    class HostComponent {
      readonly data = dataSignal
    }

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    button.click()

    expect(downloadFileMock).not.toHaveBeenCalled()
  })

  it('does nothing when data is undefined', () => {
    const { button } = mount(undefined)
    button.click()
    expect(downloadFileMock).not.toHaveBeenCalled()
  })
})
