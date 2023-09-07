import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'

export type SelectProps = Assign<
  Omit<ComponentPropsWithoutRef<typeof ark.div>, 'children'>,
  UseSelectProps
> & {
  children?: ReactNode | ((state: UseSelectReturn) => ReactNode)
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const [useSelectProps, { children, ...localProps }] = createSplitProps<UseSelectProps>()(props, [
    'closeOnSelect',
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
    'invalid',
    'isItemDisabled',
    'items',
    'itemToString',
    'itemToValue',
    'loop',
    'multiple',
    'name',
    'onChange',
    'onClose',
    'onFocusOutside',
    'onHighlight',
    'onInteractOutside',
    'onOpen',
    'onPointerDownOutside',
    'open',
    'positioning',
    'readOnly',
    'selectOnBlur',
    'value',
  ])
  const api = useSelect(useSelectProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <SelectProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </SelectProvider>
  )
})

Select.displayName = 'Select'
