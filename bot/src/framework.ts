import { Message, MessageContent, AdvancedMessageContent } from 'eris'
import { Basic } from './commands/basic'
import { Owner } from './commands/owner'

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
  BASIC, FUN, MODERATION, TOOLS, OWNER, NONE
}

export const getCommandByName = (name: string): Command | undefined => {
  if (commands.get(name)) return commands.get(name)
  for (const cmdName in commands) {
    const cmd = commands.get(cmdName)
    if (cmd?.aliases?.includes(name)) return cmd
  }
}

export const runCommand = (name: string, message: Message) => {
  const cmd = getCommandByName(name)
  if ((message.author.id !== '362753440801095681' &&
    cmd?.category === Category.OWNER) || !cmd) return
  const args = message.content.split(/\s+/).slice(1)
  if (cmd.minArgs > args.length) {
    message.channel.createMessage(!cmd.usage ? 'Invalid usage.' : `Usage: >>${cmd.name} ${cmd.usage}`)
    return
  }
  return cmd.onCommand(message, args)
}

const commands = new Map<String, Command>([
  ['help', new Basic.Help()],
  ['eval', new Owner.Eval()]
])
