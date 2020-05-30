import { Command, Category, helpMessage } from '../framework'

export namespace Basic {
  export class Help implements Command {
    name = 'help'
    description = 'Stop it. Get some help.'
    category = Category.BASIC
    args = ['helpme', 'halp']
    minArgs = 0
    onCommand = (_message: any, args: string | any[]) => {
      if (args.length === 0) return helpMessage
    }
  }
}
