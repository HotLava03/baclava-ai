import cleverbot from 'cleverbot-free'

export class AI {
  // This is a singleton, no need for a constructor.
  private constructor() {
  }

  private static ai: AI
  private static cache: Map<String, UserHistory>
  private static readonly greets = [
    'oh hello', 'oh hi', 'hey', 'sup bitch',
    'hello', 'hi', 'hii', 'heyy'
  ]

  static init() {
    AI.ai = new AI()
    AI.cache = new Map()
  }

  public static instance(): AI {
    return AI.ai
  }

  public async submit(id: string, content: string): Promise<String> {
    const response: string = await cleverbot(content, AI.cache.get(id)?.getConversations() ?? [])
    let greet = ''
    if (this.addToCache(id, response, content)) greet = this.randomGreet()
    // Sorry, your grammar is too good for my taste.
    return greet + response.toLowerCase().replace('.', '').replace('?', '').trim()
  }

  /**
   * Add a new conversation to cache.
   * @param id The user ID.
   * @param conversation The latest conversation.
   * @returns True if the history was reset after 10 minutes past of inactivity.
   */
  private addToCache(id: string, conversation: string, response: string): boolean {
    const now = Date.now()
    const history = AI.cache.get(id)
    if (!history) {
      AI.cache.set(id, new UserHistory(conversation, response, now))
      return false
    }
    history.add(conversation, response)
    return history.resetIfApplicable(now)
  }

  private randomGreet(): string {
    return AI.greets[Math.floor(Math.random() * (AI.greets.length - 1))] + '\n'
  }
}

export class UserHistory {
  private conversations: string[]
  private timestamp: number

  constructor(conversation: string, response: string, timestamp: number) {
    this.conversations = [response, conversation]
    this.timestamp = timestamp
  }

  public resetIfApplicable(timestamp: number): boolean {
    // 600000ms = 10min
    console.log(timestamp - this.timestamp)
    if (timestamp - this.timestamp < 6000) return false
    console.log('Reset')
    this.timestamp = timestamp
    this.conversations = []
    return true
  }

  public add(conversation: string, response: string) {
    this.conversations.push(conversation, response)
  }

  public getConversations(): string[] {
    return this.conversations
  }
}
