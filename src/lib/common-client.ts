import { PasskeyKit, PasskeyServer, SACClient } from "passkey-kit"
import { WebAuthn } from "@darkedges/capacitor-native-webauthn"
import { basicNodeSigner } from "@stellar/stellar-sdk/lib/contract"
import { Keypair, StrKey, SorobanRpc, Account } from "@stellar/stellar-sdk"
import { Buffer } from "buffer"

// export const rpc = new SorobanRpc.Server(import.meta.env.VITE_RPC_URL)

// export const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32))
// export const mockSource = new Account(mockPubkey, '0')

// export const fundKeypair = new Promise<Keypair>(async (resolve) => {
//   const now = new Date()

//   now.setMinutes(0, 0, 0)

//   const nowData = new TextEncoder().encode(now.getTime().toString())
//   const hashBuffer = await crypto.subtle.digest('SHA-256', nowData)
//   const keypair = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer))
//   const publicKey = keypair.publicKey()

//   rpc.getAccount(publicKey)
//     .catch(() => rpc.requestAirdrop(publicKey))
//     .catch(() => { })

//   resolve(keypair)
// })
// export const fundPubkey = (await fundKeypair).publicKey()
// export const fundSigner = basicNodeSigner(await fundKeypair, import.meta.env.VITE_NETWORK_PASSPHRASE)

export const account = new PasskeyKit({
  rpcUrl: import.meta.env.VITE_RPC_URL,
  networkPassphrase: import.meta.env.VITE_NETWORK_PASSPHRASE,
  factoryContractId: import.meta.env.VITE_FACTORY_CONTRACT_ID,
  WebAuthn
})
export const server = new PasskeyServer({
  rpcUrl: import.meta.env.VITE_RPC_URL,
  launchtubeUrl: import.meta.env.VITE_LAUNCHTUBE_URL,
  launchtubeJwt: import.meta.env.VITE_LAUNCHTUBE_JWT,
  mercuryUrl: import.meta.env.VITE_MERCURY_URL,
  mercuryJwt: import.meta.env.VITE_MERCURY_JWT,
})

export const sac = new SACClient({
  rpcUrl: import.meta.env.VITE_RPC_URL,
  networkPassphrase: import.meta.env.VITE_NETWORK_PASSPHRASE,
})
export const native = sac.getSACClient(import.meta.env.VITE_NATIVE_CONTRACT_ID)
