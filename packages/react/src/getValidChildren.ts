import { Children, isValidElement } from 'react'

export const getValidChildren = (children: React.ReactNode) =>
  Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[]
