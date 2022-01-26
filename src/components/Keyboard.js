import React, { useEffect } from 'react'

const Keyboard = ({ keyboard, handleLetterInput }) => {
    const handleButtonClick = (event) => {
        const letterValue = event.target.innerHTML
        if (letterValue === 'enter') {
            handleLetterInput('enter')
        } else if (letterValue === 'del') {
            handleLetterInput('backspace')
        } else {
            handleLetterInput(letterValue.toLowerCase())
        }
    }

    useEffect(() => {
        //console.log('render')
        const handleKeyPress = (event) => {
            const letterValue = event.key
            handleLetterInput(letterValue.toLowerCase())
        }

        window.addEventListener('keyup', handleKeyPress)
        return () => {
            //console.log('unmount')
            window.removeEventListener('keyup', handleKeyPress)
        }
    }, [handleLetterInput])

    return (
        <div className='keyboard'>
            <div className='keyboard-row'>
                {keyboard[0].map((letterObject, letterIndex) =>
                    <button
                        key={letterIndex}
                        className={`letter ${letterObject.state}`}
                        onClick={handleButtonClick}>{letterObject.letter}</button>
                )}
            </div>
            <div className='keyboard-row'>
                <div className='spacer--half'></div>
                {keyboard[1].map((letterObject, letterIndex) =>
                    <button
                        key={letterIndex}
                        className={`letter ${letterObject.state}`}
                        onClick={handleButtonClick}>{letterObject.letter}</button>
                )}
                <div className='spacer--half'></div>
            </div>
            <div className='keyboard-row'>
                {keyboard[2].map((letterObject, letterIndex) =>
                    <button
                        key={letterIndex}
                        className={`letter ${letterObject.letter.length !== 1 ? 'spacer--one-and-one-half' : ''} ${letterObject.state}`}
                        onClick={handleButtonClick}>{letterObject.letter}</button>
                )}
            </div>
        </div >
    )
}

export default Keyboard