import { Format } from '@ark-ui/react'

export const ByteWithUnitDisplay = () => {
  const value = 50345.53
  const unitDisplays = ['narrow', 'short', 'long'] as const

  return (
    <div>
      {unitDisplays.map((unitDisplay) => (
        <Format.Byte key={unitDisplay} value={value} unitDisplay={unitDisplay} />
      ))}
    </div>
  )
}
