import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import {
  DestroyRef,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  type Provider,
  type Signal,
  computed,
  inject,
  signal,
} from '@angular/core'

export type InteractionModality = 'pointer' | 'keyboard' | null

export interface InteractionContext {
  readonly modality: Signal<InteractionModality>
  readonly isFocusVisible: Signal<boolean>
}

const MODALITY_KEYS = new Set(['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape', ' '])

function isModalityKey(key: string): boolean {
  return MODALITY_KEYS.has(key)
}

@Injectable()
export class ArkInteractionService implements InteractionContext {
  private readonly _modality = signal<InteractionModality>(null)
  readonly modality: Signal<InteractionModality> = this._modality.asReadonly()
  readonly isFocusVisible: Signal<boolean> = computed(() => this._modality() === 'keyboard')

  constructor() {
    const platformId = inject(PLATFORM_ID)
    const document = inject(DOCUMENT)
    const destroyRef = inject(DestroyRef)
    if (!isPlatformBrowser(platformId)) return

    const onPointer = () => this._modality.set('pointer')
    const onKey = (event: KeyboardEvent) => {
      if (isModalityKey(event.key)) this._modality.set('keyboard')
    }

    document.addEventListener('pointerdown', onPointer, true)
    document.addEventListener('keydown', onKey, true)

    destroyRef.onDestroy(() => {
      document.removeEventListener('pointerdown', onPointer, true)
      document.removeEventListener('keydown', onKey, true)
    })
  }
}

export const ARK_INTERACTION_TOKEN = new InjectionToken<InteractionContext>('ARK_INTERACTION_TOKEN')

export function provideArkInteraction(): Provider[] {
  return [ArkInteractionService, { provide: ARK_INTERACTION_TOKEN, useExisting: ArkInteractionService }]
}

export function injectArkInteraction(): InteractionContext {
  const ctx = inject(ARK_INTERACTION_TOKEN, { optional: true })
  if (ctx) return ctx
  return {
    modality: signal<InteractionModality>(null).asReadonly(),
    isFocusVisible: signal(false).asReadonly(),
  }
}
