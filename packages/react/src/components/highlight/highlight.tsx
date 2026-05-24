import { Fragment } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { UseHighlightProps } from './use-highlight.ts'
import { useHighlight } from './use-highlight.ts'

export interface HighlightBaseProps extends UseHighlightProps {}

export interface HighlightProps extends Assign<React.ComponentProps<'mark'>, HighlightBaseProps> {}

const splitHighlightBaseProps = createSplitProps<HighlightBaseProps>()

export const Highlight = (props: HighlightProps) => {
  if (typeof props.text !== 'string') {
    throw new Error('[ark-ui/highlight] text must be a string')
  }

  const [highlightProps, localProps] = splitHighlightBaseProps(props, [
    'query',
    'text',
    'ignoreCase',
    'matchAll',
    'exactMatch',
  ])

  const chunks = useHighlight(highlightProps)

  return (
    <Fragment>
      {chunks.map(({ text, match }, i) =>
        match ? (
          <mark key={i} {...localProps}>
            {text}
          </mark>
        ) : (
          <Fragment key={i}>{text}</Fragment>
        ),
      )}
    </Fragment>
  )
}
