import { describe, expect, it } from 'vitest'
import type {
  ArkBooleanInput,
  ArkEmittedDetail,
  ArkModelChannel,
  ArkProps,
  ArkProviderContext,
  ArkRenderContext,
} from './types'

describe('ArkBooleanInput', () => {
  it('accepts boolean and string variants', () => {
    const a: ArkBooleanInput = true
    const b: ArkBooleanInput = false
    const c: ArkBooleanInput = ''
    const d: ArkBooleanInput = 'true'
    const e: ArkBooleanInput = 'false'

    expect(a).toBe(true)
    expect(b).toBe(false)
    expect(c).toBe('')
    expect(d).toBe('true')
    expect(e).toBe('false')
  })
})

describe('ArkModelChannel', () => {
  it('describes a readonly value/controlled pair', () => {
    const channel: ArkModelChannel<boolean> = { value: true, controlled: false }
    expect(channel.value).toBe(true)
    expect(channel.controlled).toBe(false)

    const numeric = { value: 42, controlled: true } satisfies ArkModelChannel<number>
    expect(numeric.value).toBe(42)
    expect(numeric.controlled).toBe(true)
  })
})

describe('ArkProps / ArkRenderContext / ArkProviderContext', () => {
  it('are open-ended record shapes', () => {
    const props = { id: 'root', 'data-state': 'open' } satisfies ArkProps
    const render = { open: true } satisfies ArkRenderContext
    const provider = { locale: 'en-US' } satisfies ArkProviderContext

    expect(props['id']).toBe('root')
    expect(render['open']).toBe(true)
    expect(provider['locale']).toBe('en-US')
  })
})

describe('ArkEmittedDetail', () => {
  it('wraps a detail payload', () => {
    const event: ArkEmittedDetail<{ value: string }> = { detail: { value: 'hello' } }
    expect(event.detail.value).toBe('hello')
  })
})
