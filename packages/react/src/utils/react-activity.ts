'use client'

import * as React from 'react'
import type { ComponentType, ReactNode } from 'react'

interface ActivityProps {
  children?: ReactNode | undefined
  mode: 'visible' | 'hidden'
}

type ActivityComponent = ComponentType<ActivityProps>

export const getActivity = (react: object): ActivityComponent | undefined =>
  Reflect.get(react, 'Activity') as ActivityComponent | undefined

export const Activity = getActivity(React)
export const supportsActivity = Activity !== undefined
