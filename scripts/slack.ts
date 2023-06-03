import fetch from 'node-fetch'
import yargs from 'yargs'

const main = async () => {
  const argv = yargs(process.argv.slice(2))
    .options({
      p: { type: 'string' },
      v: { type: 'string' },
      c: { type: 'string' },
    })
    .parseSync()
  fetch(
    'https://hooks.slack.com/workflows/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',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        package_name: argv.p,
        version: argv.v,
        changelog: argv.c,
      }),
    },
  )
}

main()
