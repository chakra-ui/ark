import { Pressable as PressableRoot, type PressableProps } from './pressable'
import { usePressable, type UsePressableReturn } from './use-pressable'

const Pressable = Object.assign(PressableRoot, {
  Root: PressableRoot,
})

export { Pressable, usePressable }
export type { PressableProps, UsePressableReturn }
