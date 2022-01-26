import React from 'react'

const Message = ({ game, message, handleShare }) => {
    if (message === '') {
        return (
            <div className='message-area'></div>
        )
    }

    return (
        <div className='message-area'>
            <div className='message'>
                <span>{message}</span>
                {
                    game.state === 'win' &&
                    <button
                        className='share-button'
                        onClick={handleShare}>Share</button>
                }
            </div>
        </div>
    )
}

export default Message