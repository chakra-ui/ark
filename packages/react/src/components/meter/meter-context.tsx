'use client'

import type { ReactNode } from 'react'
import { type UseMeterContext, useMeterContext } from './use-meter-context.ts'

export interface MeterContextProps {
  children: (context: UseMeterContext) => ReactNode
}

export const MeterContext = (props: MeterContextProps) => props.children(useMeterContext())
