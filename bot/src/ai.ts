import cleverbot from 'cleverbot-free'

export class AI {
  private constructor() {
  }

  private static ai: AI

  static init() {
    AI.ai = new AI()
  }

  async submit(content: string, oldContent: string[]): Promise<String> {
    const response: string = await cleverbot(content, oldContent)
    // Sorry, your grammar is too good for my taste.
    return response.toLowerCase().replace('.', '').replace('?', '')
  }
}
