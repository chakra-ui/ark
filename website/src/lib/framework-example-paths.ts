import { join } from 'node:path'
import { Match } from 'effect'

const progressExampleVariants = new Set(['circular', 'linear'])

const getProgressVariant = (component: string) => {
  const [base, variant] = component.split('-')
  if (base !== 'progress' || !variant || !progressExampleVariants.has(variant)) return undefined
  return { base, variant }
}

const getProgressExamplePath = (component: string) => {
  const progressVariant = getProgressVariant(component)
  return progressVariant ? `components/progress/examples/${progressVariant.variant}` : undefined
}

export const getFrameworkExtension = (framework: string) => {
  return Match.value(framework).pipe(
    Match.when('vue', () => 'vue'),
    Match.when('svelte', () => 'svelte'),
    Match.when('angular', () => 'ts'),
    Match.orElse(() => 'tsx'),
  )
}

export const getExamplePath = (component: string) => {
  const progressPath = getProgressExamplePath(component)
  if (progressPath) return progressPath

  return Match.value(component).pipe(
    Match.when(
      () => ['environment', 'locale'].includes(component),
      () => `providers/${component}/examples`,
    ),
    Match.orElse(() => `components/${component}/examples`),
  )
}

export const getSrcPath = (framework: string) => {
  return Match.value(framework).pipe(
    Match.when('svelte', () => 'src/lib'),
    Match.orElse(() => 'src'),
  )
}

export const getPackageBasePath = (framework: string) => {
  if (framework === 'angular') {
    return join(process.cwd(), '..', 'packages', 'angular')
  }
  return join(process.cwd(), '..', 'packages', framework, getSrcPath(framework))
}

export const getFrameworkExampleDir = (framework: string, component: string) => {
  if (framework === 'angular') {
    const progressVariant = getProgressVariant(component)
    if (progressVariant) {
      return join(getPackageBasePath(framework), progressVariant.base, 'examples', progressVariant.variant)
    }
    return join(getPackageBasePath(framework), component, 'examples')
  }
  return join(getPackageBasePath(framework), getExamplePath(component))
}

export const getFrameworkExampleFilePath = (framework: string, component: string, id: string) => {
  return join(getFrameworkExampleDir(framework, component), `${id}.${getFrameworkExtension(framework)}`)
}

export const getFrameworkExampleDisplayPath = (framework: string, component: string) => {
  if (framework === 'angular') {
    const progressVariant = getProgressVariant(component)
    if (progressVariant) {
      return `packages/angular/${progressVariant.base}/examples/${progressVariant.variant}`
    }
    return `packages/angular/${component}/examples`
  }
  return `packages/${framework}/${getSrcPath(framework)}/${getExamplePath(component)}`
}

export const cleanExampleCode = (framework: string, content: string): string => {
  const iconPackage = Match.value(framework).pipe(
    Match.when('react', () => 'lucide-react'),
    Match.when('solid', () => 'lucide-solid'),
    Match.when('svelte', () => 'lucide-svelte'),
    Match.when('vue', () => 'lucide-vue-next'),
    Match.orElse(() => undefined),
  )
  const code = iconPackage ? content.replaceAll(/from '\.\/icons'/g, `from '${iconPackage}'`) : content
  return code.replace(/.*@ts-expect-error.*\n/g, '')
}
