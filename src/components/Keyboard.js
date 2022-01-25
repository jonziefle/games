import React from 'react'

const Keyboard = ({ keyboard, handleButtonClick }) => {
    return (
        <div className='keyboard'>
            {keyboard.map((row, rowIndex) => {
                return (
                    <div
                        key={rowIndex}
                        className='keyboard-row'>
                        {row.map((letterObject, letterIndex) =>
                            <button
                                key={letterIndex}
                                className={`letter ${letterObject.state}`}
                                onClick={handleButtonClick}>{letterObject.letter}</button>
                        )}
                    </div>
                )
            })}
        </div >
    )
}

export default Keyboard