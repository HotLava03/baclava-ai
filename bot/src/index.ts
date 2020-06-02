import Eris from 'eris'
import { runCommand } from './framework'
import { AI } from './ai'

(async () => {
  const client = new Eris.Client(process.env.TOKEN ?? '')
  AI.init()
  client.on('messageCreate', message => {
    if (message.content.match(/^<@(!)*554401969234771969>/)) {
      const args = message.content.split(/\s+/).slice(1)
      if (args.length === 0) runCommand('help', message)
      else {
        message.channel.sendTyping()
        AI.instance().submit(message.author.id, args.join(' ')).then(str => {
          message.channel.createMessage(`<@${message.author.id}> ` + str.toString())
        })
      }
    }
    if (!message.content.match(/^>>\w+/)) return
    const returned = runCommand(message.content.split(/\s+/)[0].substring(2), message)
    if (!returned) return
    message.channel.createMessage(returned)
  })
  client.connect()
}).call(this)
