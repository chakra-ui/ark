import { createSplitProps } from '$lib/utils/create-split-props'
import type { UseSizerProps } from './use-sizer.svelte'

const splitFn = createSplitProps<UseSizerProps>()

export const splitSizerProps = <T extends UseSizerProps>(props: T) => splitFn(props, ['onSizeChange'])
