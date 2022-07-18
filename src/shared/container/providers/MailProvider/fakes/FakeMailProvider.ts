import IMailProvider from '../models/IMailProvider'
import ISenMailDTO from '../dtos/ISendMailDTO'

export default class FakeMailProvider implements IMailProvider {
  private messages: ISenMailDTO[] = []

  public async sendMail(message: ISenMailDTO): Promise<void> {
    this.messages.push(message)
  }
}
