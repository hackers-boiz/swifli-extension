import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const observeTwitterPosts = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const twitterPosts = Array.from(document.querySelectorAll('[data-testid="tweetText"]'))
        
        twitterPosts.forEach((twitterPost) => {
          if (twitterPost.textContent.includes('swifli-frontend.vercel.app')) {
            const twitterPostId = twitterPost.id
            const wrapper = document.querySelector(`#${twitterPostId} #wrapper`)
            
            if (!wrapper) {
              const root = document.createElement("div")
              root.id = "wrapper"
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
        })
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

// Call the function to start observing
observeTwitterPosts()

// Check for card.wrapper elements
const observeCardWrappers = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const cardWrappers = Array.from(document.querySelectorAll('[data-testid="card.wrapper"]'))
        
        cardWrappers.forEach((cardWrapper) => {
          const titleElement = cardWrapper.querySelector('[data-testid="card.layoutLarge.detail"] div[dir="auto"]')
          if (titleElement) {
            const titleParts = titleElement.textContent.split('|')
            const id = titleParts[titleParts.length - 1].trim()
            
            const root = document.createElement("div")
            root.id = "wrapper"
            
            cardWrapper.appendChild(root)
            
            ReactDOM.createRoot(root).render(
              <React.StrictMode>
                <App id={id} />
              </React.StrictMode>
            )
          }
        })
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

// Call the function to start observing card wrappers
observeCardWrappers()
