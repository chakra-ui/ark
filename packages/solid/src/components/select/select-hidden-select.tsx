import { mergeProps } from '@zag-js/solid'
import { For, Show, createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useSelectContext } from './use-select-context.ts'

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
        <ark.option value="" />
      </Show>
      <For each={select().collection.items} keyed={false}>
        {(item) => (
          <ark.option
            value={select().collection.getItemValue(item()) ?? ''}
            disabled={select().collection.getItemDisabled(item())}
          >
            {select().collection.stringifyItem(item())}
          </ark.option>
        )}
      </For>
    </ark.select>
  )
}
