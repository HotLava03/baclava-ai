import Eris from 'eris'

(() => {
  const client = new Eris.Client(process.env.TOKEN ?? '')
  client.on('messageCreate', message => {
    if (!message.content.match(/^>>(.)*/)) return
    // TODO: continue
  })
}).call(this)
