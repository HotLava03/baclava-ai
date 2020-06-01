import { Command, Category, getCommandByName } from '../framework'
import { Message } from 'eris'

export namespace Basic {
  export class Help implements Command {
    name = 'help'
    description = 'Stop it. Get some help.'
    category = Category.BASIC
    aliases = ['helpme', 'halp']
    usage = '[command]'
    minArgs = 0
    onCommand = (_message: Message, args: string[]) => {
      if (args.length === 0) return 'You can get help here: http://baclava.wtf/help'
      const command = getCommandByName(args[0])
      if (!command) return 'Unknown command.'
      else return `**${command.name}** - ${command.description}\nUsage: >>${(command.name + ' ') + (command.usage ?? '')}`
    }
  }
}
