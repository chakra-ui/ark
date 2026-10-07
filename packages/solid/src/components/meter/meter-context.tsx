import type { JSX } from 'solid-js'
import { type UseMeterContext, useMeterContext } from './use-meter-context.ts'

export interface MeterContextProps {
  children: (context: UseMeterContext) => JSX.Element
}

export const MeterContext = (props: MeterContextProps) => props.children(useMeterContext())
