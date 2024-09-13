import { Format } from '@ark-ui/react'

export const ByteSizes = () => {
  const byteSizes = [50, 5000, 5000000, 5000000000]

  return (
    <div>
      {byteSizes.map((size, index) => (
        <div key={index}>
          <Format.Byte value={size} />
        </div>
      ))}
    </div>
  )
}
