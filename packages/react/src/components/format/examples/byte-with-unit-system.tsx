import { Format } from '@ark-ui/react/format'

export const ByteWithUnitSystem = () => {
  return (
    <div>
      <p>
        Decimal (1000 bytes): <Format.Byte value={1024} unitSystem="decimal" />
      </p>
      <p>
        Binary (1024 bytes): <Format.Byte value={1024} unitSystem="binary" />
      </p>
    </div>
  )
}
