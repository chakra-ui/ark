'use client'

import { formatTime, type FormatTimeOptions } from '@zag-js/i18n-utils'
import { useMemo } from 'react'
import { useLocaleContext } from '../../providers/locale'

export interface FormatTimeProps extends FormatTimeOptions {
  /**
   * The time to format
   */
  value: string | Date
}

export const FormatTime = (props: FormatTimeProps) => {
  const { locale } = useLocaleContext()
  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatTime(value, locale, intlOptions)
  }, [props, locale])
  return <>{text}</>
}

FormatTime.displayName = 'FormatTime'
