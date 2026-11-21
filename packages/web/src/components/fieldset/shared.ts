import type { normalizeProps } from '@zag-js/vanilla'

export const root = 'ark-fieldset'

export interface FieldsetProps {
  id: string
  disabled?: boolean
  invalid?: boolean
}

export interface FieldsetService {
  prop: <K extends keyof FieldsetProps>(key: K) => FieldsetProps[K]
  scope: { getById: (id: string) => HTMLElement | null }
}

export const machine = { initialState: () => 'idle', states: { idle: {} } }

const attr = (name: string, id: string) => ({ [`data-fieldset-${name}`]: id })
const data = (value: boolean) => (value ? '' : undefined)

export function connect(service: FieldsetService, normalize: typeof normalizeProps) {
  const id = service.prop('id')
  const disabled = !!service.prop('disabled')
  const invalid = !!service.prop('invalid')

  const ids = {
    legend: `fieldset::${id}::legend`,
    errorText: `fieldset::${id}::error-text`,
    helperText: `fieldset::${id}::helper-text`,
  }

  const hasErrorText = !!service.scope.getById(ids.errorText)
  const hasHelperText = !!service.scope.getById(ids.helperText)
  const ariaDescribedby =
    [hasErrorText && invalid ? ids.errorText : undefined, hasHelperText ? ids.helperText : undefined]
      .filter(Boolean)
      .join(' ') || undefined

  const state = { 'data-disabled': data(disabled), 'data-invalid': data(invalid) }

  return {
    ids,
    disabled,
    invalid,
    getRootProps: () =>
      normalize.element({
        ...attr('root', id),
        disabled,
        ...state,
        'aria-labelledby': ids.legend,
        'aria-describedby': ariaDescribedby,
      }),
    getLegendProps: () => normalize.element({ ...attr('legend', id), id: ids.legend, ...state }),
    getHelperTextProps: () => normalize.element({ ...attr('helper-text', id), id: ids.helperText }),
    getErrorTextProps: () =>
      normalize.element({ ...attr('error-text', id), id: ids.errorText, 'aria-live': 'polite', hidden: !invalid }),
  }
}

export type FieldsetApi = ReturnType<typeof connect>
