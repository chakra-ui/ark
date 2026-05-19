import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_FILE_UPLOAD_CONTEXT,
  ARK_FILE_UPLOAD_ITEM_CONTEXT,
  ArkFileUploadClearTrigger,
  ArkFileUploadDropzone,
  ArkFileUploadHiddenInput,
  ArkFileUploadItem,
  ArkFileUploadItemDeleteTrigger,
  ArkFileUploadItemGroup,
  ArkFileUploadItemName,
  ArkFileUploadItemPreview,
  ArkFileUploadItemPreviewImage,
  ArkFileUploadItemSizeText,
  ArkFileUploadLabel,
  ArkFileUploadRoot,
  ArkFileUploadRootProvider,
  ArkFileUploadTrigger,
  fileUploadAnatomy,
  injectArkFileUploadContext,
  injectArkFileUploadItemContext,
  useFileUpload,
  type FileUploadApi,
  type FileUploadElementIds,
  type FileUploadIntlTranslations,
  type FileUploadMachine,
  type FileUploadMachineProps,
  type FileUploadService,
  type UseFileUploadOptions,
  type UseFileUploadProps,
  type UseFileUploadReturn,
} from '@ark-ui/angular/file-upload'
import { ArkFieldRoot } from '@ark-ui/angular/field'
import { FileUploadBasicExample } from './examples/basic'
import { FileUploadMaxFilesExample } from './examples/max-files'
import { FileUploadRootProviderExample } from './examples/root-provider'
import { FileUploadWithDropzoneExample } from './examples/with-dropzone'
import { FileUploadWithImagePreviewExample } from './examples/with-image-preview'

type FileUploadPublicTypeSmoke = [
  FileUploadApi,
  FileUploadElementIds,
  FileUploadIntlTranslations,
  FileUploadMachine,
  FileUploadMachineProps,
  FileUploadService,
  UseFileUploadOptions,
  UseFileUploadProps,
  UseFileUploadReturn,
]

const makeFile = (name: string, size = 8, type = 'text/plain'): File => {
  const content = new Uint8Array(size)
  return new File([content], name, { type })
}

const makeFileList = (files: File[]): FileList => {
  const list = {
    length: files.length,
    item: (index: number) => files[index] ?? null,
    [Symbol.iterator]: function* () {
      for (const f of files) yield f
    },
  } as unknown as FileList
  for (let i = 0; i < files.length; i++) {
    Object.defineProperty(list, i, { value: files[i], enumerable: true })
  }
  return list
}

const dispatchInputChange = (el: HTMLInputElement, files: File[]) => {
  Object.defineProperty(el, 'files', { value: makeFileList(files), configurable: true })
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
}

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

describe('@ark-ui/angular/file-upload', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    // noop
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_FILE_UPLOAD_CONTEXT).toBe('object')
    expect(typeof ARK_FILE_UPLOAD_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkFileUploadContext).toBe('function')
    expect(typeof injectArkFileUploadItemContext).toBe('function')
    expect(typeof useFileUpload).toBe('function')
    expect(typeof fileUploadAnatomy).toBe('object')
    expect(ArkFileUploadRoot).toBeDefined()
    expect(ArkFileUploadRootProvider).toBeDefined()
    expect(ArkFileUploadLabel).toBeDefined()
    expect(ArkFileUploadTrigger).toBeDefined()
    expect(ArkFileUploadDropzone).toBeDefined()
    expect(ArkFileUploadHiddenInput).toBeDefined()
    expect(ArkFileUploadClearTrigger).toBeDefined()
    expect(ArkFileUploadItemGroup).toBeDefined()
    expect(ArkFileUploadItem).toBeDefined()
    expect(ArkFileUploadItemName).toBeDefined()
    expect(ArkFileUploadItemSizeText).toBeDefined()
    expect(ArkFileUploadItemPreview).toBeDefined()
    expect(ArkFileUploadItemPreviewImage).toBeDefined()
    expect(ArkFileUploadItemDeleteTrigger).toBeDefined()
    expect(undefined as FileUploadPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('orphan item-name without an item parent throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadRoot, ArkFileUploadItemName],
      template: `
        <div arkFileUpload>
          <span arkFileUploadItemName></span>
        </div>
      `,
    })
    class Orphan {}
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_FILE_UPLOAD_ITEM_CONTEXT|missing-provider|NG0201/i)
  })

  it('orphan part directive without a root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadTrigger],
      template: '<button arkFileUploadTrigger></button>',
    })
    class Orphan {}
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_FILE_UPLOAD_CONTEXT|No provider|NG0201/i)
  })

  it('file selection via the hidden input updates api.acceptedFiles', async () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadRoot, ArkFileUploadHiddenInput],
      template: `
        <div arkFileUpload [maxFiles]="5">
          <input arkFileUploadHiddenInput />
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFileUploadRoot)).injector.get(ArkFileUploadRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput)).nativeElement as HTMLInputElement
    expect(inputEl.type).toBe('file')

    dispatchInputChange(inputEl, [makeFile('a.txt'), makeFile('b.txt')])
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().acceptedFiles.map((f) => f.name)).toEqual(['a.txt', 'b.txt'])

    fixture.destroy()
  })

  it('rejected files surface when maxFiles is exceeded', async () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadRoot, ArkFileUploadHiddenInput],
      template: `
        <div arkFileUpload [maxFiles]="1">
          <input arkFileUploadHiddenInput />
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFileUploadRoot)).injector.get(ArkFileUploadRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput)).nativeElement as HTMLInputElement

    dispatchInputChange(inputEl, [makeFile('a.txt'), makeFile('b.txt')])
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().acceptedFiles.length).toBeLessThanOrEqual(1)
    expect(root.api().rejectedFiles.length).toBeGreaterThan(0)

    fixture.destroy()
  })

  it('clear trigger empties the file collection', async () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadRoot, ArkFileUploadHiddenInput, ArkFileUploadClearTrigger],
      template: `
        <div arkFileUpload [maxFiles]="5">
          <input arkFileUploadHiddenInput />
          <button arkFileUploadClearTrigger>clear</button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFileUploadRoot)).injector.get(ArkFileUploadRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput)).nativeElement as HTMLInputElement
    dispatchInputChange(inputEl, [makeFile('a.txt')])
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().acceptedFiles).toHaveLength(1)

    const clearBtn = fixture.debugElement.query(By.directive(ArkFileUploadClearTrigger))
      .nativeElement as HTMLButtonElement
    clearBtn.click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().acceptedFiles).toHaveLength(0)

    fixture.destroy()
  })

  it('item delete-trigger removes a single file', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFileUploadRoot,
        ArkFileUploadHiddenInput,
        ArkFileUploadItemGroup,
        ArkFileUploadItem,
        ArkFileUploadItemDeleteTrigger,
      ],
      template: `
        <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
          <input arkFileUploadHiddenInput />
          <ul arkFileUploadItemGroup>
            @for (f of root.api().acceptedFiles; track f.name) {
              <li arkFileUploadItem [file]="f">
                <button arkFileUploadItemDeleteTrigger>x</button>
              </li>
            }
          </ul>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFileUploadRoot)).injector.get(ArkFileUploadRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput)).nativeElement as HTMLInputElement

    dispatchInputChange(inputEl, [makeFile('a.txt'), makeFile('b.txt')])
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().acceptedFiles.map((f) => f.name)).toEqual(['a.txt', 'b.txt'])

    const triggers = fixture.debugElement.queryAll(By.directive(ArkFileUploadItemDeleteTrigger))
    ;(triggers[0].nativeElement as HTMLButtonElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().acceptedFiles.map((f) => f.name)).toEqual(['b.txt'])

    fixture.destroy()
  })

  it('item context drives item-name, item-size-text, item-preview, and item-delete-trigger attrs', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFileUploadRoot,
        ArkFileUploadHiddenInput,
        ArkFileUploadItemGroup,
        ArkFileUploadItem,
        ArkFileUploadItemName,
        ArkFileUploadItemSizeText,
        ArkFileUploadItemPreview,
        ArkFileUploadItemDeleteTrigger,
      ],
      template: `
        <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
          <input arkFileUploadHiddenInput />
          <ul arkFileUploadItemGroup>
            @for (f of root.api().acceptedFiles; track f.name) {
              <li arkFileUploadItem [file]="f">
                <div arkFileUploadItemPreview type=".*"></div>
                <span arkFileUploadItemName></span>
                <span arkFileUploadItemSizeText></span>
                <button arkFileUploadItemDeleteTrigger></button>
              </li>
            }
          </ul>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput)).nativeElement as HTMLInputElement
    dispatchInputChange(inputEl, [makeFile('a.txt')])
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const nameEl = fixture.debugElement.query(By.directive(ArkFileUploadItemName)).nativeElement as HTMLElement
    const sizeEl = fixture.debugElement.query(By.directive(ArkFileUploadItemSizeText)).nativeElement as HTMLElement
    const previewEl = fixture.debugElement.query(By.directive(ArkFileUploadItemPreview)).nativeElement as HTMLElement
    const deleteEl = fixture.debugElement.query(By.directive(ArkFileUploadItemDeleteTrigger))
      .nativeElement as HTMLElement

    expect(nameEl.getAttribute('data-scope')).toBe('file-upload')
    expect(nameEl.getAttribute('data-part')).toBe('item-name')
    expect(sizeEl.getAttribute('data-part')).toBe('item-size-text')
    expect(previewEl.getAttribute('data-part')).toBe('item-preview')
    expect(deleteEl.getAttribute('data-part')).toBe('item-delete-trigger')

    fixture.destroy()
  })

  it('item-preview-image creates a URL and exposes it via the directive', async () => {
    const origCreateObjectURL = URL.createObjectURL
    const origRevokeObjectURL = URL.revokeObjectURL
    let counter = 0
    URL.createObjectURL = () => `blob:fake-${++counter}`
    URL.revokeObjectURL = () => {}
    try {
      @Component({
        standalone: true,
        imports: [
          ArkFileUploadRoot,
          ArkFileUploadHiddenInput,
          ArkFileUploadItemGroup,
          ArkFileUploadItem,
          ArkFileUploadItemPreviewImage,
        ],
        template: `
          <div arkFileUpload #root="arkFileUpload" [maxFiles]="5">
            <input arkFileUploadHiddenInput />
            <ul arkFileUploadItemGroup>
              @for (f of root.api().acceptedFiles; track f.name) {
                <li arkFileUploadItem [file]="f">
                  <img arkFileUploadItemPreviewImage #img="arkFileUploadItemPreviewImage" alt="" />
                </li>
              }
            </ul>
          </div>
        `,
      })
      class Host {}

      TestBed.configureTestingModule({ imports: [Host] })
      const fixture = TestBed.createComponent(Host)
      document.body.appendChild(fixture.nativeElement)
      fixture.detectChanges()

      const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput))
        .nativeElement as HTMLInputElement
      dispatchInputChange(inputEl, [makeFile('a.png', 4, 'image/png')])
      await flushMicrotasks()
      TestBed.tick()
      fixture.detectChanges()
      await flushMicrotasks()
      TestBed.tick()
      fixture.detectChanges()

      const imgDir = fixture.debugElement
        .query(By.directive(ArkFileUploadItemPreviewImage))
        .injector.get(ArkFileUploadItemPreviewImage)
      expect(imgDir.url()).toMatch(/^blob:fake-/)

      fixture.destroy()
    } finally {
      URL.createObjectURL = origCreateObjectURL
      URL.revokeObjectURL = origRevokeObjectURL
    }
  })

  it('dropzone applies data-dragging when a dragenter is dispatched', async () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadRoot, ArkFileUploadDropzone],
      template: `
        <div arkFileUpload>
          <div arkFileUploadDropzone>drop</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const dropEl = fixture.debugElement.query(By.directive(ArkFileUploadDropzone)).nativeElement as HTMLElement
    expect(dropEl.getAttribute('data-scope')).toBe('file-upload')
    expect(dropEl.getAttribute('data-part')).toBe('dropzone')

    const dragEvent = new Event('dragover', { bubbles: true, cancelable: true }) as DragEvent
    Object.defineProperty(dragEvent, 'dataTransfer', {
      value: { items: [{ kind: 'file' }], types: ['Files'], files: makeFileList([]), dropEffect: 'none' },
    })
    dropEl.dispatchEvent(dragEvent)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFileUploadRoot)).injector.get(ArkFileUploadRoot)
    expect(root.api().dragging).toBe(true)
    expect(dropEl.getAttribute('data-dragging')).toBe('')

    fixture.destroy()
  })

  it('disabled state propagates to the hidden input', () => {
    @Component({
      standalone: true,
      imports: [ArkFileUploadRoot, ArkFileUploadHiddenInput],
      template: `
        <div arkFileUpload [disabled]="disabled()">
          <input arkFileUploadHiddenInput />
        </div>
      `,
    })
    class Host {
      readonly disabled = signal(true)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput)).nativeElement as HTMLInputElement
    expect(inputEl.disabled).toBe(true)

    fixture.destroy()
  })

  it('field disabled and invalid state flow into the machine context', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkFileUploadRoot, ArkFileUploadHiddenInput],
      template: `
        <div arkFieldRoot [disabled]="true" [invalid]="true">
          <div arkFileUpload>
            <input arkFileUploadHiddenInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFileUploadRoot)).injector.get(ArkFileUploadRoot)
    const hiddenProps = root.api().getHiddenInputProps() as { disabled?: boolean }
    expect(hiddenProps.disabled).toBe(true)

    fixture.destroy()
  })

  it('package source files do not import @angular/forms', () => {
    const here = dirname(fileURLToPath(import.meta.url))
    const files = readdirSync(here).filter(
      (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && !f.endsWith('.stories.ts'),
    )
    for (const file of files) {
      const source = readFileSync(join(here, file), 'utf-8')
      expect(source, `${file} must not import @angular/forms`).not.toMatch(/@angular\/forms/)
    }
  })

  it('FileUploadBasicExample renders root, label, trigger and hidden input', () => {
    TestBed.configureTestingModule({ imports: [FileUploadBasicExample] })
    const fixture = TestBed.createComponent(FileUploadBasicExample)
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadRoot))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadLabel))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadTrigger))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadHiddenInput))).toBeTruthy()
    fixture.destroy()
  })

  it('FileUploadWithDropzoneExample renders dropzone and item group', () => {
    TestBed.configureTestingModule({ imports: [FileUploadWithDropzoneExample] })
    const fixture = TestBed.createComponent(FileUploadWithDropzoneExample)
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadDropzone))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadItemGroup))).toBeTruthy()
    fixture.destroy()
  })

  it('FileUploadWithImagePreviewExample compiles', () => {
    TestBed.configureTestingModule({ imports: [FileUploadWithImagePreviewExample] })
    const fixture = TestBed.createComponent(FileUploadWithImagePreviewExample)
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadRoot))).toBeTruthy()
    fixture.destroy()
  })

  it('FileUploadMaxFilesExample renders with maxFiles=2', () => {
    TestBed.configureTestingModule({ imports: [FileUploadMaxFilesExample] })
    const fixture = TestBed.createComponent(FileUploadMaxFilesExample)
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.directive(ArkFileUploadRoot))).toBeTruthy()
    fixture.destroy()
  })

  it('FileUploadRootProviderExample wires useFileUpload() via [value]', () => {
    TestBed.configureTestingModule({ imports: [FileUploadRootProviderExample] })
    const fixture = TestBed.createComponent(FileUploadRootProviderExample)
    fixture.detectChanges()
    const provider = fixture.debugElement
      .query(By.directive(ArkFileUploadRootProvider))
      .injector.get(ArkFileUploadRootProvider)
    expect(provider.resolveValue()).toBe(fixture.componentInstance.fileUpload)
    fixture.destroy()
  })
})
