import { cookies } from 'next/headers'

export type Framework = (typeof frameworks)[number]
export const frameworks = ['react', 'vue', 'svelte', 'solid'] as const

export const getFramework = async (): Promise<Framework> => {
  const cookieStore = await cookies()
  const framework = cookieStore.get('framework')?.value ?? 'react'

  return framework as Framework
}
