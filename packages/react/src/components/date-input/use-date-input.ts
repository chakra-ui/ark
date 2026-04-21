'use client'

import * as dateInput from '@zag-js/date-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseDateInputProps extends Optional<dateInput.Props, 'id'> {}
export type UseDateInputReturn = ReturnType<typeof useDateInput>

export const useDateInput = (props: UseDateInputProps = {}): dateInput.Api => {
  const id = useId()
  const { dir, locale } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()
  const context: dateInput.Props = { id, dir, locale, getRootNode, ...props }
  const service = useMachine(dateInput.machine, context)
  return dateInput.connect(service, normalizeProps)
}
