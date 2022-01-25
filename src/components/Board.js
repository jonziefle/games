import React from 'react'

const Board = ({ board }) => {
    return (
        <div className='board'>
            {board.map((row, rowIndex) => {
                return (
                    <div
                        key={rowIndex}
                        className='board-row'>
                        {row.map((letterObject, letterIndex) =>
                            <div
                                key={letterIndex}
                                className={`box ${letterObject.state}`}>{letterObject.letter}</div>
                        )}
                    </div>
                )
            })}
        </div >
    )
}

export default Board