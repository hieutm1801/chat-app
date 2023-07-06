import React from 'react'
import Football from './football'
import JoinChat from './join-chat'
import './../css/main.css'

function Main() {
  return (
    <body>
      <div className="container">
        <div className="left-body">

          <Football />
        </div>
        <div className='chat-box'>
          <JoinChat />
        </div>
      </div>
    </body>
  )
}

export default Main