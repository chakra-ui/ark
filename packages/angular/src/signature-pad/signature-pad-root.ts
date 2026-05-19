import type * as signaturePad from '@zag-js/signature-pad'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  SignaturePadDrawDetails,
  SignaturePadDrawEndDetails,
  SignaturePadDrawingOptions,
  SignaturePadElementIds,
  SignaturePadIntlTranslations,
} from './signature-pad.types'
import { ARK_SIGNATURE_PAD_CONTEXT } from './use-signature-pad-context'
import { useSignaturePad, type UseSignaturePadReturn } from './use-signature-pad'

@Directive({
  selector: '[arkSignaturePad]',
  standalone: true,
  exportAs: 'arkSignaturePad',
  providers: [{ provide: ARK_SIGNATURE_PAD_CONTEXT, useExisting: forwardRef(() => ArkSignaturePadRoot) }],
})
export class ArkSignaturePadRoot implements UseSignaturePadReturn {
  /** The unique identifier of the signature pad. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the signature pad elements. Useful for composition. */
  readonly ids: InputSignal<Partial<SignaturePadElementIds> | undefined> = input<
    Partial<SignaturePadElementIds> | undefined
  >(undefined)
  /** The localized strings for the signature pad. */
  readonly translations: InputSignal<SignaturePadIntlTranslations | undefined> = input<
    SignaturePadIntlTranslations | undefined
  >(undefined)
  /** The drawing options. */
  readonly drawing: InputSignal<SignaturePadDrawingOptions | undefined> = input<SignaturePadDrawingOptions | undefined>(
    undefined,
  )
  /** Whether the signature pad is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the signature pad is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the signature pad is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name of the hidden input used for form submission. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The controlled SVG paths of the signature pad. */
  readonly paths: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial SVG paths of the signature pad when uncontrolled. */
  readonly defaultPaths: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)

  /** Emits while the user is drawing. */
  readonly draw: OutputEmitterRef<SignaturePadDrawDetails> = output<SignaturePadDrawDetails>()
  /** Emits when drawing completes or the pad is cleared. */
  readonly drawEnd: OutputEmitterRef<SignaturePadDrawEndDetails> = output<SignaturePadDrawEndDetails>()

  private readonly machine = useSignaturePad({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      translations: this.translations(),
      drawing: this.drawing(),
      disabled: this.disabled(),
      readOnly: this.readOnly(),
      required: this.required(),
      name: this.name(),
      paths: this.paths(),
      defaultPaths: this.defaultPaths(),
      onDraw: (details) => {
        if (!arraysShallowEqual(this.paths(), details.paths)) {
          this.paths.set([...details.paths])
        }
        this.draw.emit(details)
      },
      onDrawEnd: (details) => {
        this.drawEnd.emit(details)
      },
    }),
  })

  readonly state: Signal<signaturePad.Service['state']> = this.machine.state
  readonly api: Signal<signaturePad.Api> = this.machine.api
  readonly service: signaturePad.Service = this.machine.service
  readonly send: signaturePad.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}

function arraysShallowEqual(a: string[] | undefined, b: string[] | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}
