import { PasskeyServer } from "passkey-kit"

export const account = new PasskeyServer({
  rpcUrl: import.meta.env.VITE_RPC_URL,
  launchtubeUrl: import.meta.env.VITE_LAUNCHTUBE_URL,
  launchtubeJwt: import.meta.env.VITE_LAUNCHTUBE_JWT,
  mercuryUrl: import.meta.env.VITE_MERCURY_URL,
  mercuryJwt: import.meta.env.VITE_MERCURY_JWT,
})
