import { Command, Category } from '../framework'
import { Message } from 'eris'

export namespace Tools {
  export class Weather implements Command {
    name = 'weather'
    description = 'How\'s the weather?'
    category = Category.TOOLS
    usage = '<location>'
    minArgs = 1
    onCommand = (_message: Message, _args: string[]) => {
      // TODO: Add config and hide API keys properly before working with APIs.
      return 'soontm'
    }
  }
}
