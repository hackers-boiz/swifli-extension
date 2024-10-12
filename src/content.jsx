import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

setTimeout(() => {
  const root = document.createElement("div")
  root.id = "wrapper"
  const twitterPost = document.querySelector('[data-testid="tweetText"]')
  if (twitterPost && twitterPost.textContent.includes('swifli-frontend.vercel.app')) {
    const url = twitterPost.querySelector('a').textContent
    const id = url.split('/').pop()

    document.querySelector('[data-testid="tweetText"]').appendChild(root)

    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App id={id} />
      </React.StrictMode>
    )
  }
}, 3 * 1000)
