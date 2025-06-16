import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseClipboardProps } from './use-clipboard.svelte'

const splitFn = createSplitProps<UseClipboardProps>()

export const splitClipboardProps = <T extends UseClipboardProps>(props: T) =>
  splitFn(props, ['defaultValue', 'id', 'ids', 'onStatusChange', 'onValueChange', 'timeout', 'value'])
