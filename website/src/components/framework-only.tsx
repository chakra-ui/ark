import type { ReactNode } from 'react'
import { defaultFramework, type Framework } from '~/lib/frameworks'
import { getServerContext } from '~/lib/server-context'

interface Props {
  framework: Framework | Framework[]
  children: ReactNode
}

export const FrameworkOnly = (props: Props) => {
  const current = getServerContext().framework ?? defaultFramework
  const allowed = Array.isArray(props.framework) ? props.framework : [props.framework]

  return allowed.includes(current) ? props.children : null
}
