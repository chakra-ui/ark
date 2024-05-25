'use client'
import { useEffect, useState } from 'react'
import { Progress, type ProgressProps } from '~/components/ui/progress'

export const Demo = (props: ProgressProps) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => (value === 100 ? 0 : value + 1))
    }, Math.random() * 500)

    return () => clearInterval(interval)
  })

  return <Progress type="circular" {...props} value={value} min={0} max={100} />
}
