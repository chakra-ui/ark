import type { AnatomyInstance } from '@ark-ui/anatomy'
import '@testing-library/jest-dom'

export const getParts = (anatomy: AnatomyInstance<string>) => {
  return Object.values(anatomy.build()).map(
    (x) => `[data-scope="${x.attrs['data-scope']}"][data-part="${x.attrs['data-part']}"]`,
  )
}
