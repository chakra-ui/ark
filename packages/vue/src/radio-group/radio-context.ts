import { type connect } from '@zag-js/radio-group'
import { createContext } from '../context'
import type { RadioProps } from './radio'

export type RadioContext = Parameters<ReturnType<typeof connect>['getRadioProps']>[0]

export const [RadioProvider, useRadioContext] = createContext<RadioProps>('RadioContext')
