import { Format } from '@ark-ui/react'

export const ByteWithUnit = () => {
  const value = 1450.45
  const unit = 'bit'

  return (
    <div>
      File size: <Format.Byte value={value} unit={unit} />
    </div>
  )
}
