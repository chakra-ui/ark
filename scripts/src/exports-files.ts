import { globby, globbySync } from 'globby'

const frameworks = ['react', 'solid', 'vue']

const main = async () => {
  const components = await globby(['../frameworks/react/src/components'], {
    onlyDirectories: true,
    deep: 1,
  })

  const result = components.sort().map((component) =>
    frameworks.map((framework) => ({
      framework,
      files: globbySync([component.replace('react', framework)], { deep: 1 })
        .filter((file) => !file.endsWith('.stories.tsx'))
        .filter((file) => !file.endsWith('.stories.vue'))
        .filter((file) => !file.endsWith('.props.ts'))
        .filter((file) => !file.endsWith('.test.tsx'))
        .map((file) => file.replace(`../frameworks/${framework}/src/components/`, '')),
    })),
  )

  console.log(removeCommonFiles(result).slice(0, 2))
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

type FrameworkFiles = {
  framework: string
  files: string[]
}

function removeCommonFiles(data: FrameworkFiles[][]): FrameworkFiles[][] {
  return data
    .map((subArray) => {
      const commonFiles = subArray.reduce<string[]>((common, item, index) => {
        if (index === 0) {
          return item.files.slice()
        }
        return common.filter((file) => item.files.includes(file))
      }, [])

      return subArray
        .map((item) => ({
          framework: item.framework,
          files: item.files.filter((file) => !commonFiles.includes(file)),
        }))
        .filter((item) => item.files.length > 0)
    })
    .filter((subArray) => subArray.length > 0)
}
