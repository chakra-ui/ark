'use client'

import * as splitter from '@zag-js/splitter'

export interface SplitterRegistryProps extends splitter.SplitterRegistryOptions {}

export interface SplitterRegistryReturn extends splitter.SplitterRegistry {}

export const createSplitterRegistry = (props?: splitter.SplitterRegistryOptions): splitter.SplitterRegistry => {
  return splitter.registry(props)
}
