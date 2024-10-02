import { Format } from '@ark-ui/solid/format'

export const NumberWithCurrency = () => {
  return <Format.Number value={1234.45} style="currency" currency="USD" />
}
