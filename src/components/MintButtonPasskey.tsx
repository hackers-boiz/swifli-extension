import { signTransaction } from "@stellar/freighter-api"
import { SorobanRpc, TransactionBuilder } from "@stellar/stellar-sdk"
import * as StellarSdk from "@stellar/stellar-sdk"
import { useEffect, useState } from "react"

export const MintButtonPasskey = ({ id, actionId, name, isPasskeyConnected, setIsPasskeyConnected }: { id: string, actionId: string, name: string, isPasskeyConnected: boolean, setIsPasskeyConnected: (isPasskeyConnected: boolean) => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  useEffect(() => {
    const checkPasskey = async () => {
      try {
        setIsPasskeyConnected(localStorage.getItem("sp:keyId") !== null)
      } catch (error) {
        console.error("Error checking Passkey connection:", error)
      }
    }

    checkPasskey()
  }, [])

  const onSubmit =  async () => {   
    setIsLoading(true)

    try {
      const publicKey = localStorage.getItem("sp:publicKey")

      const fetchResult = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${id}/${actionId.toLowerCase()}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicKey: publicKey }),
        },
      )
  
      const transaction = (await fetchResult.json()).transaction
      console.log({transaction})
  
      const rpc = new SorobanRpc.Server(import.meta.env.VITE_NETWORK_URL)
  
      const tx = TransactionBuilder.fromXDR(transaction, StellarSdk.Networks.TESTNET)
      const preparedTx = await rpc.prepareTransaction(tx)
  
      const {signedTxXdr} = await signTransaction(preparedTx.toXDR(), {
        networkPassphrase: StellarSdk.Networks.TESTNET
      })

      const {hash} = await rpc.sendTransaction(StellarSdk.TransactionBuilder.fromXDR(
        signedTxXdr,
        StellarSdk.Networks.TESTNET,
      ),)
      console.log({hash})
      setTxHash(hash)

      setIsLoading(false)
    } catch (error) {

      console.error(error)
      setIsLoading(false)

    } finally {
      setIsLoading(false)
    }
  }

  if(txHash) {
    return <a href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} target="_blank" rel="noreferrer" className="bg-teal-500 text-black font-bold px-4 py-2 rounded flex-1 hover:bg-teal-600 text-center disabled:bg-gray-700 disabled:text-white">See transaction</a>
  }

  return <button onClick={onSubmit} disabled={isLoading} className="bg-teal-500 text-black font-bold px-4 py-2 rounded flex-1 hover:bg-teal-600 text-center disabled:bg-gray-700 disabled:text-white">[P] {isLoading ? 'Loading...' : name}</button>
}

