import { mergeProps } from '@zag-js/solid'
import { Index, Show, createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useSelectContext } from './use-select-context'

export interface SelectHiddenSelectBaseProps extends PolymorphicProps<'select'> {}
export interface SelectHiddenSelectProps extends HTMLProps<'select'>, SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = (props: SelectHiddenSelectProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getHiddenSelectProps(), props)
  const isValueEmpty = createMemo(() => select().value.length === 0)
  const field = useFieldContext()

  return (
    <ark.select aria-describedby={field?.().ariaDescribedby} {...mergedProps}>
      <Show when={isValueEmpty()}>
        <option value="" />
      </Show>
      <Index each={select().collection.items}>
        {(item) => (
          <option
            value={select().collection.getItemValue(item) ?? ''}
            disabled={select().collection.getItemDisabled(item)}
          />
        )}
      </Index>
    </ark.select>
  )
}
