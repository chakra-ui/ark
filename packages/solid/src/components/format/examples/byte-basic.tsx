import { Format } from '@ark-ui/solid/format'

export const ByteBasic = () => {
  return (
    <div>
      File size: <Format.Byte value={1450.45} />
    </div>
  )
}
