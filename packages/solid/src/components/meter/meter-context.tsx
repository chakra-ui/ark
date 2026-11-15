import type { JSX } from '@solidjs/web'
import { type UseMeterContext, useMeterContext } from './use-meter-context.ts'

export interface MeterContextProps {
  children: (context: UseMeterContext) => JSX.Element
}

export const MeterContext = (props: MeterContextProps) => props.children(useMeterContext())
