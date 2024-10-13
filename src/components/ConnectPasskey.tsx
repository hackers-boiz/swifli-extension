import base64url from "base64url"
import { account, native, server } from "../lib/common-client"
import { useEffect, useState } from "react"

export const ConnectPasskey = ({isPasskeyConnected, setIsPasskeyConnected}: {isPasskeyConnected: boolean, setIsPasskeyConnected: (isPasskeyConnected: boolean) => void}) => {
  const [keyId, setKeyId] = useState<string | null>(localStorage.getItem("sp:keyId") || null)
  const [publicKey, setPublicKey] = useState<string | null>(localStorage.getItem("sp:publicKey") || null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsPasskeyConnected(localStorage.getItem("sp:publicKey") !== null)
  }, [localStorage.getItem("sp:keyId"), localStorage.getItem("sp:publicKey")])

  const createPasskey = async () => {
    setIsLoading(true)

    const {
      keyId_base64,
      contractId,
      built,
    } = await account.createWallet("Swifli", "Swifli Wallet")

    const {
      transaction,
      hash,
      status,
    } = await server.send(built)
    console.log({transaction, hash, status})

    localStorage.setItem("sp:keyId", keyId_base64.toString())
    setKeyId(keyId_base64.toString())
    
    localStorage.setItem("sp:publicKey", contractId)
    setPublicKey(contractId)

    const signers = await getWalletSigners(contractId)
    console.log({signers})

    // await fundWallet(contractId, signers[0].key, fundSigner)
    await getWalletBalance(contractId)

    setIsLoading(false)
  }

  async function connect(keyId: string) {
    try {
      const { keyId: kid, contractId } = await account.connectWallet(
        {
          keyId,
          getContractId: (keyId) => server.getContractId({ keyId }),
        },
      )

      keyId = base64url(kid)
      localStorage.setItem("sp:keyId", keyId)
      setKeyId(keyId)

      localStorage.setItem("sp:publicKey", contractId)
      setPublicKey(contractId)

      setIsPasskeyConnected(true)
    } catch (err: any) {
      // alert(err.message)
    }
  }

  async function getWalletSigners(contractId: string) {
    const signers = await server.getSigners(contractId)
    console.log(signers)

    return signers
  }

  async function getWalletBalance(contractId: string) {
    console.log("Getting balance", contractId)
    const { result } = await native.balance({ id: contractId })

    const balance = result.toString()
    console.log({balance})

    return balance
  }

  if(isPasskeyConnected) return null

  if(!keyId && !publicKey) {
    return <button onClick={createPasskey} className="bg-white text-black font-bold px-4 py-2 rounded flex-1 hover:bg-gray-200 text-center">{isLoading ? 'Creating...' : 'Create Passkey'}</button>
  }
  
  return <button onClick={async () => await connect(keyId ?? "")} className="bg-white text-black font-bold px-4 py-2 rounded flex-1 hover:bg-gray-200 text-center">Connect Passkey</button>
}

