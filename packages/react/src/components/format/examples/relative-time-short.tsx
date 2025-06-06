import { Format } from '@ark-ui/react/format'

export const RelativeTimeShort = () => {
  return (
    <div>
      Edited <Format.RelativeTime value={new Date('2025-05-05')} style="short" />
    </div>
  )
}
