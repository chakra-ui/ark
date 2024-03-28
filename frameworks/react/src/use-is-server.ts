import { useEffect, useState } from 'react'

export const useIsServer = () => {
  const [isServer, setServer] = useState(true)

  useEffect(() => {
    setServer(false)
  }, [])

  return isServer
}
