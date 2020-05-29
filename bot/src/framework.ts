import { Embed } from 'eris'

export type Command = {
  name: string
  description: string
  args: string[]
  minArgs: number
  onCommand: () => string | Embed | undefined
}
