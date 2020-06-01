import Eris from 'eris'
import { runCommand } from './framework'
// import { AI } from './ai'

(async () => {
  const client = new Eris.Client(process.env.TOKEN ?? '')
  client.on('messageCreate', message => {
    if (!message.content.match(/^>>\w+/)) return
    const returned = runCommand(message.content.split(/\s+/)[0].substring(2), message)
    if (!returned) return
    message.channel.createMessage(returned)
  })
  client.connect()
}).call(this)
