import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Index, Show, createMemo } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectHiddenSelectBaseProps extends PolymorphicProps<'select'> {}
export interface SelectHiddenSelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement>,
    SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = (props: SelectHiddenSelectProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getControlProps(), props)
  const isValueEmpty = createMemo(() => select().value.length === 0)

  return (
    <ark.select {...mergedProps}>
      <Show when={isValueEmpty()}>
        <option value="" />
      </Show>
      <Index each={select().collection.toArray()}>
        {(option) => <option value={option().value}>{option().label}</option>}
      </Index>
    </ark.select>
  )
}
