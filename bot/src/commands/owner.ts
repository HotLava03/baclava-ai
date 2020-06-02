/* eslint-disable @typescript-eslint/no-unused-vars */
import { Command, Category, getCommandByName } from '../framework'
import { Message } from 'eris'
import { inspect } from 'util'

export namespace Owner {
  export class Eval implements Command {
    name = 'eval'
    description = 'Yeah that ain\'t for you'
    category = Category.OWNER
    aliases = ['fuck']
    usage = '<code>'
    minArgs = 1
    onCommand = (message: Message, args: string[]): undefined => {
      const author = message.author
      const member = message.member
      const reply = async (msg: string) => await message.channel.createMessage(msg)
      const argsRaw = args.join(' ')
      try {
        let toEval = argsRaw
        // Remove extra characters.
        if (toEval.startsWith('`')) toEval = toEval.substring(1)
        if (toEval.startsWith('``js')) toEval = toEval.substring(4)
        else if (toEval.startsWith('``')) toEval = toEval.substring(2)
        if (toEval.endsWith('`')) toEval = toEval.substring(0, toEval.length - 1)
        if (toEval.endsWith('``')) toEval = toEval.substring(0, toEval.length - 2)

        // eslint-disable-next-line no-eval
        Promise.resolve(eval(toEval)).then(str => {
          const res = inspect(str)
          message.addReaction('✅')
          if (res !== 'undefined') message.channel.createMessage(`${'```'}${res}${'```'}`)
        })
      } catch (e) {
        message.channel.client.getDMChannel(author.id).then(channel => {
          message.addReaction('❌')
          channel.createMessage(`**Error:**\n${e}`)
        })
      }
      return undefined
    }
  }
}
