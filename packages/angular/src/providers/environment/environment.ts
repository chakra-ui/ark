import { isPlatformBrowser } from '@angular/common'
import { InjectionToken, PLATFORM_ID, type Provider, inject } from '@angular/core'

export interface EnvironmentContext {
  getRootNode: () => Document | ShadowRoot | undefined
}

export interface ProvideArkEnvironmentConfig {
  getRootNode?: () => Document | ShadowRoot | undefined
}

export const ARK_ENVIRONMENT_TOKEN = new InjectionToken<EnvironmentContext>('ARK_ENVIRONMENT_TOKEN')

const createDefaultContext = (platformId: object): EnvironmentContext => ({
  getRootNode: () => (isPlatformBrowser(platformId) ? document : undefined),
})

export function provideArkEnvironment(config: ProvideArkEnvironmentConfig = {}): Provider {
  return {
    provide: ARK_ENVIRONMENT_TOKEN,
    useFactory: () => {
      if (config.getRootNode) {
        const getRootNode = config.getRootNode
        return { getRootNode }
      }
      const platformId = inject(PLATFORM_ID)
      return createDefaultContext(platformId)
    },
  }
}

export function injectArkEnvironment(): EnvironmentContext {
  const platformId = inject(PLATFORM_ID)
  const ctx = inject(ARK_ENVIRONMENT_TOKEN, { optional: true })
  return ctx ?? createDefaultContext(platformId)
}
