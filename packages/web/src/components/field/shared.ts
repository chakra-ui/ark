import type { normalizeProps } from '@zag-js/vanilla'

export const root = 'ark-field'
export const itemTag = 'ark-field-item'

export interface FieldProps {
  id: string
  getRootNode?: () => ShadowRoot | Document | Node
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
  required?: boolean
  target?: string
}

export interface FieldService {
  prop: <K extends keyof FieldProps>(key: K) => FieldProps[K]
  scope: { getById: (id: string) => HTMLElement | null }
}

// A stateless machine: the field only derives props and ids from its attributes
export const machine = { initialState: () => 'idle', states: { idle: {} } }

const attr = (name: string, id: string) => ({ [`data-field-${name}`]: id })
const data = (value: boolean | undefined) => (value ? '' : undefined)
const itemControlId = (control: string, value: string) => `field::${control}::item::${value}`

export function connect(service: FieldService, normalize: typeof normalizeProps) {
  const id = service.prop('id')
  const disabled = !!service.prop('disabled')
  const invalid = !!service.prop('invalid')
  const readOnly = !!service.prop('readOnly')
  const required = !!service.prop('required')
  const target = service.prop('target')

  const ids = {
    control: `field::${id}::control`,
    label: `field::${id}::label`,
    errorText: `field::${id}::error-text`,
    helperText: `field::${id}::helper-text`,
  }

  const hasErrorText = !!service.scope.getById(ids.errorText)
  const hasHelperText = !!service.scope.getById(ids.helperText)
  const ariaDescribedby =
    [hasErrorText && invalid ? ids.errorText : undefined, hasHelperText ? ids.helperText : undefined]
      .filter(Boolean)
      .join(' ') || undefined

  const state = { 'data-disabled': data(disabled), 'data-invalid': data(invalid), 'data-readonly': data(readOnly) }

  const controlProps = (part: string, item?: string) =>
    normalize.element({
      ...attr(part, id),
      id: item ? itemControlId(id, item) : ids.control,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': invalid || undefined,
      'data-invalid': data(invalid),
      'data-required': data(required),
      'data-readonly': data(readOnly),
      required,
      disabled,
      readOnly,
    })

  return {
    ids,
    disabled,
    invalid,
    readOnly,
    required,
    ariaDescribedby,
    itemControlId: (value: string) => itemControlId(id, value),
    getRootProps: () => normalize.element({ ...attr('root', id), role: 'group', ...state }),
    getLabelProps: (item?: string) =>
      normalize.label({
        ...attr('label', id),
        id: item ? `${itemControlId(id, item)}::label` : ids.label,
        ...state,
        'data-required': data(required),
        htmlFor: item ? itemControlId(id, item) : target ? itemControlId(id, target) : ids.control,
      }),
    getInputProps: (item?: string) => controlProps('input', item),
    getTextareaProps: (item?: string) => controlProps('textarea', item),
    getSelectProps: (item?: string) => controlProps('select', item),
    getHelperTextProps: () =>
      normalize.element({ ...attr('helper-text', id), id: ids.helperText, 'data-disabled': data(disabled) }),
    getErrorTextProps: () =>
      normalize.element({ ...attr('error-text', id), id: ids.errorText, 'aria-live': 'polite', hidden: !invalid }),
    getRequiredIndicatorProps: () => normalize.element({ ...attr('required-indicator', id), 'aria-hidden': true }),
  }
}

export type FieldApi = ReturnType<typeof connect>

export const itemValueOf = (el: HTMLElement) => {
  const item = el.closest(itemTag)
  return item && el.closest(root)?.contains(item) ? (item.getAttribute('value') ?? undefined) : undefined
}
