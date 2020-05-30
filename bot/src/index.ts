import Eris from 'eris'

(() => {
  const client = new Eris.Client(process.env.TOKEN ?? '')
  client.on('messageCreate', message => {
    if (!message.content.match(/^>>\w+/)) return
    // TODO: Call runCommand and use the returned values to create messages from there.
  })
}).call(this)
