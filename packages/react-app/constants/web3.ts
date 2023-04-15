const TESTNET_NODE_URL = 'https://nodes-testnet.wavesnodes.com'
const MAINNET_NODE_URL = ''

export const NODE_URL = process.env.NODE_ENV === 'production' ? MAINNET_NODE_URL : TESTNET_NODE_URL
