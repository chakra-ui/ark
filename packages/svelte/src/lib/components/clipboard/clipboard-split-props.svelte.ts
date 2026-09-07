import type { Optional } from '$lib/types'
import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseClipboardProps } from './use-clipboard.svelte.ts'

const splitFn = createSplitProps<Optional<UseClipboardProps, 'id'>>()

export const splitClipboardProps = <T extends Optional<UseClipboardProps, 'id'>>(props: T) =>
  splitFn(props, ['defaultValue', 'id', 'ids', 'onStatusChange', 'onValueChange', 'timeout', 'translations', 'value'])
