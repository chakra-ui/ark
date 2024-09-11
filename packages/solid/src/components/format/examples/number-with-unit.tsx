import { Format } from '../..'

export const NumberWithUnit = () => {
  return <Format.Number value={384.4} style="unit" unit="kilometer" />
}
