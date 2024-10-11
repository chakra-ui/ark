import { Format } from '@ark-ui/react/format'

export const NumberWithCompact = () => {
  return <Format.Number value={1500000} notation="compact" compactDisplay="short" />
}
