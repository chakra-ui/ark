import fetch from 'node-fetch'
import yargs from 'yargs'

const main = async () => {
  const url = process.env.SLACK_WEBHOOK_URL

  if (!url) {
    throw new Error('Missing Slack Webhook URL')
  }

  const argv = yargs(process.argv.slice(2))
    .options({
      n: { type: 'string' },
      v: { type: 'string' },
    })
    .parseSync()

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      changelog_url: `https://ark-ui.com/docs/${argv.n?.split('/')[1]}/overview/changelog`,
      package_name: argv.n,
      version: argv.v,
    }),
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

main()
