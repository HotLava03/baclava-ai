import { Message, MessageContent, AdvancedMessageContent } from 'eris'
import { Basic } from './commands/basic'

export interface Command {
  name: string
  description: string
  aliases?: string[]
  category: Category
  usage?: string
  minArgs: number
  onCommand: (message: Message, args: string[]) => string | MessageContent | AdvancedMessageContent | undefined
}

export enum Category {
  BASIC, FUN, MODERATION, OWNER, NONE
}

export const getCommandByName = (name: string): Command | undefined => {
  if (commands.get(name)) return commands.get(name)
  for (const cmdName in commands) {
    const cmd = commands.get(cmdName)
    if (cmd?.aliases?.includes(name)) return cmd
  }
}

export const runCommand = (name: string, message: Message) => getCommandByName(name)?.onCommand(message, message.content.split(/\s+/).slice(1))

const commands = new Map<String, Command>([
  ['help', new Basic.Help()]
])
