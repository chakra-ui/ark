import type { PropsWithChildren } from 'react'

export default function Template({ children }: PropsWithChildren) {
  return <div className="page-transition">{children}</div>
}
