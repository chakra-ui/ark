'use client'

import { mergeProps } from '@zag-js/react'
import type { VirtualRow } from '@zag-js/virtualizer'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
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

export interface GridVirtualizerRowBaseProps extends RowProps, PolymorphicProps {}

export interface GridVirtualizerRowProps extends HTMLProps<'div'>, GridVirtualizerRowBaseProps {}

const splitRowProps = createSplitProps<RowProps>()

export const GridVirtualizerRow = forwardRef<HTMLDivElement, GridVirtualizerRowProps>((props, ref) => {
  const [{ row, measure }, localProps] = splitRowProps(props, ['row', 'measure'])
  const virtualizer = useGridVirtualizerContext()
  const composedRef = useComposedRefs(measure ? row.measureRow : undefined, ref)
  const mergedProps = mergeProps(
    { ...virtualizer.getRowAriaAttrs(row.row), style: virtualizer.getRowStyle(row) },
    localProps,
  )

  return (
    <GridVirtualizerRowProvider value={row}>
      <ark.div {...mergedProps} data-index={row.row} ref={composedRef} />
    </GridVirtualizerRowProvider>
  )
})

GridVirtualizerRow.displayName = 'GridVirtualizerRow'
