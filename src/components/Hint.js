import React, { useState } from 'react'
import axios from 'axios'

const Hint = ({ wordToGuess }) => {
    const [hint, setHint] = useState('')
    const [visible, setVisible] = useState(false)

    axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToGuess}`)
        .then(response => {
            try {
                setHint(response.data[0].meanings[0].definitions[0].definition)
            }
            catch (error) {
                setHint('')
            }
        }, [])

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    if (hint === '') {
        return null
    } else {
        return (
            <div className='hint'>
                <div style={hideWhenVisible}>
                    <button
                        className='hint-button'
                        onClick={toggleVisibility}>Hint?</button>
                </div>
                <div style={showWhenVisible}>
                    <span>Definition: </span>
                    {hint}
                </div>
            </div>
        )
    }


}

export default Hint