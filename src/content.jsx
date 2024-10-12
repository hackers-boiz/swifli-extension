import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

setInterval(() => {
  const root = document.createElement("div")
  root.id = "wrapper"
  const twitterPosts = document.querySelectorAll('[data-testid="tweetText"]')

  for(const twitterPost of twitterPosts) {
    const twitterPostId = twitterPost.id
    const wrapper = document.querySelector(`#${twitterPostId} #wrapper`)
  
    if (!wrapper && twitterPost.textContent.includes('swifli-frontend.vercel.app')) {
      const url = twitterPost.querySelector('a').textContent
      const id = url.split('/').pop()

      document.querySelector(`#${twitterPostId}`).appendChild(root)

      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App id={id} />
        </React.StrictMode>
      )
    }
  }
  
  // data-testid="card.wrapper"
  // check card.wrapper, if existing search for title, get last | - it's ID
}, 1000)
