import { Format } from '@ark-ui/react/format'

export const NumberWithCurrency = () => {
  return <Format.Number value={1234.45} style="currency" currency="USD" />
}
