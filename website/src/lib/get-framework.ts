import { cookies } from 'next/headers'
import { type Framework, defaultFramework } from './frameworks'

export const getFramework = async (): Promise<Framework> => {
  const cookieStore = await cookies()
  return (cookieStore.get('framework')?.value as Framework) ?? defaultFramework
}
