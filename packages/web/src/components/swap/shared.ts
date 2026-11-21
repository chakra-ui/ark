import type { normalizeProps } from '@zag-js/vanilla'

export const root = 'ark-swap'

export type IndicatorType = 'on' | 'off'

export interface SwapProps {
  id: string
  swap?: boolean
}

interface SwapService {
  prop: <K extends keyof SwapProps>(key: K) => SwapProps[K]
}

export const machine = { initialState: () => 'idle', states: { idle: {} } }

export function connect(service: SwapService, normalize: typeof normalizeProps) {
  const swap = !!service.prop('swap')
  return {
    swap,
    getRootProps: () =>
      normalize.element({ 'data-swap-root': '', 'data-swap': swap ? 'on' : 'off', style: { display: 'inline-grid' } }),
    getIndicatorProps: ({ type }: { type: IndicatorType }) =>
      normalize.element({
        'data-swap-indicator': '',
        'data-type': type,
        style: { gridArea: '1 / 1', display: 'inline-flex' },
      }),
  }
}

export type SwapApi = ReturnType<typeof connect>

export const typeOf = (el: HTMLElement): IndicatorType => (el.getAttribute('type') === 'on' ? 'on' : 'off')
