import React, { useState } from 'react'

const Hint = ({ hint }) => {
    const [visible, setVisible] = useState(false)

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