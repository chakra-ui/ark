import { Format } from '@ark-ui/solid/format'

export const RelativeTimeBasic = () => {
  return (
    <div>
      Edited <Format.RelativeTime value={new Date('2025-05-05')} />
    </div>
  )
}
