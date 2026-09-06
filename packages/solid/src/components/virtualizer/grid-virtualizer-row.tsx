import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { VirtualRow } from '@zag-js/virtualizer'
import type { Assign } from '../../types.ts'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
import { GridVirtualizerRowProvider } from './use-grid-virtualizer-row-context.ts'

interface RowProps {
  /**
   * The virtual row to render.
   */
  row: VirtualRow
  /**
   * Whether to measure the rendered height of the row and use it instead of the estimate.
   * @default false
   */
  measure?: boolean | undefined
}

export interface GridVirtualizerRowBaseProps extends RowProps, PolymorphicProps<'div'> {}
export interface GridVirtualizerRowProps extends Assign<HTMLProps<'div'>, GridVirtualizerRowBaseProps> {}

const splitRowProps = createSplitProps<RowProps>()

export const GridVirtualizerRow = (props: GridVirtualizerRowProps) => {
  const [rowProps, localProps] = splitRowProps(props, ['row', 'measure'])
  const virtualizer = useGridVirtualizerContext()
  const mergedProps = mergeProps(
    () => ({
      ...virtualizer.getRowAriaAttrs(rowProps.row.row),
      style: normalizeProps.style(virtualizer.getRowStyle(rowProps.row)),
    }),
    localProps,
  )

  const measureRef = (element: HTMLElement | null) => {
    if (rowProps.measure) rowProps.row.measureRow(element)
  }

  return (
    <GridVirtualizerRowProvider value={() => rowProps.row}>
      <ark.div {...mergedProps} data-index={rowProps.row.row} ref={composeRefs(measureRef, localProps.ref)} />
    </GridVirtualizerRowProvider>
  )
}
