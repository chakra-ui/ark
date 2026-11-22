import { join } from 'node:path'
import { Match } from 'effect'

export const getFrameworkExtension = (framework: string) =>
  Match.value(framework).pipe(
    Match.when('vue', () => 'vue'),
    Match.when('svelte', () => 'svelte'),
    Match.when('web', () => 'ts'),
    Match.orElse(() => 'tsx'),
  )

export const getExamplePath = (component: string) =>
  Match.value(component).pipe(
    Match.when(
      () => ['progress-circular', 'progress-linear'].includes(component),
      () => `components/progress/examples/${component.split('-')[1]}`,
    ),
    Match.when(
      () => ['environment', 'hotkeys', 'interaction', 'locale'].includes(component),
      () => `providers/${component}/examples`,
    ),
    Match.orElse(() => `components/${component}/examples`),
  )

export const getSrcPath = (framework: string) =>
  Match.value(framework).pipe(
    Match.when('svelte', () => 'src/lib'),
    Match.orElse(() => 'src'),
  )

export const getExampleRelPath = (framework: string, component: string) =>
  `packages/${framework}/${getSrcPath(framework)}/${getExamplePath(component)}`

export const getExampleDir = (framework: string, component: string) =>
  join(process.cwd(), '..', getExampleRelPath(framework, component))
