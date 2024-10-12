import { send } from "../lib/passkey"
import { account } from "../lib/common-client"

import { SignerStore } from "passkey-kit"

export const ConnectPasskey = () => {

  async function addSigner() {
    console.log('start')

    try {
      console.log('start2')
      const at = await account.addSecp256r1("", "", new Map(), SignerStore.Persistent)
      console.log({at})
      await account.sign(at, { keyId: import.meta.env.VITE_KEY_ID })
      const res = await send(at.built!.toXDR())

      console.log(res)

      window.opener?.postMessage(
        { name: "superpeach", message: "OK" },
        origin,
      )

      
    } catch (err: any) {
      alert(err.message)

      window.opener?.postMessage(
        { name: "superpeach", message: "ERROR" },
        origin,
      )

    } 
  }


  return <button onClick={addSigner} className="bg-teal-500 text-black font-bold px-4 py-2 rounded flex-1 hover:bg-teal-600 text-center">Connect</button>

}

