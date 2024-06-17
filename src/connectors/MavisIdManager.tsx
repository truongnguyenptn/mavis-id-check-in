import { MavisIdProvider } from '@sky-mavis/mavis-id-sdk'

export class MavisIdManager {
  private static instance: MavisIdManager | null = null
  private APP_ID = 'c9848a4d-8a6e-4e2e-908e-8876ba543dd8'
  private CHAIN_ID = 2021
  public provider = MavisIdProvider.create({
    clientId: this.APP_ID,
    chainId: this.CHAIN_ID,
  })

  private constructor() {}
  
  public static getInstance(): MavisIdManager {
    if (!MavisIdManager.instance) {
      MavisIdManager.instance = new MavisIdManager()
    }
    return MavisIdManager.instance
  }

  async connect() {
    const data = await this.provider.request({ method: 'eth_requestAccounts' })
    return data
  }

  async getAddress(): Promise<string> {
    const accounts = await this.provider.request<string[]>({ method: 'eth_accounts' })

    if (accounts.length === 0) {
      throw new Error('No accounts found')
    }

    return accounts[0]
  }

  disconnect() {
    this.provider?.disconnect()
  }
}