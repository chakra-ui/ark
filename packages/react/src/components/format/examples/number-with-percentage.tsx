import { Format } from '../..'

export const NumberWithPercentage = () => {
  return (
    <Format.Number
      value={0.145}
      style="percent"
      maximumFractionDigits={2}
      minimumFractionDigits={2}
    />
  )
}
