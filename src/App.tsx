import { useState, useEffect } from "react"
import { MintButton } from "./components/MintButton"
import { MintButtonPasskey } from "./components/MintButtonPasskey"
import { ConnectPasskey } from "./components/ConnectPasskey"

type BlinkConfig = {
  name: string;
  description: string;
  image: string;
  website: string;
  actions: Array<{
    id: string;
    label: string;
  }>;
};

function App({id}: {id: string}) {
  const [blinkData, setBlinkData] = useState<BlinkConfig | null>(null)
  const [isPasskeyConnected, setIsPasskeyConnected] = useState(localStorage.getItem("sp:publicKey") !== null)
  const [connectedPasskeyAddress] = useState<string | null>(localStorage.getItem("sp:publicKey"))
  console.log({isPasskeyConnected})

  useEffect(() => {
    setIsPasskeyConnected(localStorage.getItem("sp:publicKey") !== null)
  }, [localStorage.getItem("sp:keyId"), localStorage.getItem("sp:publicKey")])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`, {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      })
      
      const data = await res.json()
      setBlinkData(data)
    }

    fetchData()
  }, [id])

  const shortenAddress = (address: string | null) => {
    if (!address) return ''
    
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }


  if(!blinkData) return null
  
  return (
    <div
      className="w-full min-w-96 flex flex-col gap-4 justify-center items-center bg-black mt-8"
    >
      <div
        className="flex flex-col gap-4 w-full border-2 border-teal-500 p-6 rounded-2xl"
      >
        <img src={blinkData?.image} alt="McDonald" className="rounded-xl h-auto max-w-full" />
        {blinkData?.website && <a
          href={blinkData?.website}
          target="_blank"
          className="text-xs font-mono text-gray-200" rel="noreferrer"
        >{new URL(blinkData?.website).hostname}</a>}

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-white">{blinkData?.name}</h1>
          <p className="text-sm text-gray-200">{blinkData?.description}</p>
        </div>

        <div className="flex gap-1 w-full">
          {
            blinkData?.actions.map((action, index) => (
              isPasskeyConnected ? <MintButtonPasskey
                key={index}
                id={id}
                actionId={action.id}
                name={action.label}
                isPasskeyConnected={isPasskeyConnected} setIsPasskeyConnected={setIsPasskeyConnected}
              /> : <MintButton
                key={index}
                id={id}
                actionId={action.id}
                name={action.label}
                isPasskeyConnected={isPasskeyConnected} setIsPasskeyConnected={setIsPasskeyConnected}
              />
            ))
          }
        </div>

        <ConnectPasskey isPasskeyConnected={isPasskeyConnected} setIsPasskeyConnected={setIsPasskeyConnected} />

        <div className="flex justify-between gap-2 items-center">
          {isPasskeyConnected && <button className="text-xs text-gray-200 px-2 py-1 rounded hover:bg-gray-800 bg-gray-900" onClick={() => {
            localStorage.removeItem("sp:keyId")
            setIsPasskeyConnected(false)
          }}>Disconnect Passkey</button>}

          <span className="text-xs text-gray-200">Source: {isPasskeyConnected ? `Passkey: ${shortenAddress(connectedPasskeyAddress)}` : 'Freighter'}</span>
        </div>
      </div>
    </div>
  )
}

export default App
