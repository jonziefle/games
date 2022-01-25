import React, { useState } from 'react'

import Message from './components/Message'
import Board from './components/Board'
import Keyboard from './components/Keyboard'

const App = () => {
    const [game, setGame] = useState({
        state: 'active',
        row: 0,
        column: 0
    })
    const [message, setMessage] = useState('')
    const [board, setBoard] = useState([
        [{ letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }],
        [{ letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }],
        [{ letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }],
        [{ letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }],
        [{ letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }],
        [{ letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }, { letter: '', state: '' }]
    ])
    const [keyboard, setKeyboard] = useState([
        [
            { letter: 'q', state: '' },
            { letter: 'w', state: '' },
            { letter: 'e', state: '' },
            { letter: 'r', state: '' },
            { letter: 't', state: '' },
            { letter: 'y', state: '' },
            { letter: 'u', state: '' },
            { letter: 'i', state: '' },
            { letter: 'o', state: '' },
            { letter: 'p', state: '' }
        ],
        [
            { letter: 'a', state: '' },
            { letter: 's', state: '' },
            { letter: 'd', state: '' },
            { letter: 'f', state: '' },
            { letter: 'g', state: '' },
            { letter: 'h', state: '' },
            { letter: 'j', state: '' },
            { letter: 'k', state: '' },
            { letter: 'l', state: '' }
        ],
        [
            { letter: 'del', state: '' },
            { letter: 'z', state: '' },
            { letter: 'x', state: '' },
            { letter: 'c', state: '' },
            { letter: 'v', state: '' },
            { letter: 'b', state: '' },
            { letter: 'n', state: '' },
            { letter: 'm', state: '' },
            { letter: 'enter', state: '' }
        ]
    ])

    const wordToGuess = 'zebra'

    const processGuess = () => {
        // set new board state
        const newBoard = JSON.parse(JSON.stringify(board))
        const newKeyboard = JSON.parse(JSON.stringify(keyboard))
        newBoard[game.row] = newBoard[game.row].map((boardLetter, index) => {
            let boardLetterState = ''
            if (wordToGuess[index] === boardLetter.letter) {
                boardLetterState = 'green'
            } else if (wordToGuess.includes(boardLetter.letter)) {
                boardLetterState = 'yellow'
            } else {
                boardLetterState = 'gray'
            }

            // update keyboard
            newKeyboard.forEach((row) => {
                const letterMatch = row.find(keyboardLetter => keyboardLetter.letter === boardLetter.letter)
                if (letterMatch && letterMatch.state !== 'green') {
                    letterMatch.state = boardLetterState
                }
            })

            return {
                letter: boardLetter.letter,
                state: boardLetterState
            }
        })
        setBoard(newBoard)
        setKeyboard(newKeyboard)

        if (newBoard[game.row].map(letterObject => letterObject.letter).join('') === wordToGuess) {
            setGame({
                ...game,
                state: 'win'
            })
            setMessage('You win!')
        } else if (game.row === 5) {
            setGame({
                ...game,
                state: 'lose'
            })
            setMessage('You lose!')
        } else {
            setGame({
                ...game,
                row: game.row += 1,
                column: 0
            })
        }
    }

    const handleButtonClick = (event) => {
        if (game.state === 'active') {
            const buttonValue = event.target.innerHTML
            //console.log(buttonValue)

            if (buttonValue === 'enter') {
                if (game.column === 5) {
                    processGuess()
                }

            } else if (buttonValue === 'del') {
                if (game.column > 0) {
                    const newBoard = JSON.parse(JSON.stringify(board))
                    newBoard[game.row][game.column - 1].letter = ''
                    setBoard(newBoard)
                    setGame({
                        ...game,
                        column: game.column -= 1
                    })
                }
            } else {
                if (game.column < 5) {
                    const newBoard = JSON.parse(JSON.stringify(board))
                    newBoard[game.row][game.column].letter = buttonValue
                    setBoard(newBoard)
                    setGame({
                        ...game,
                        column: game.column += 1
                    })
                }
            }
        }
    }

    return (
        <div className='container'>
            <h2>Zwordle</h2>
            <Message message={message} />
            <Board board={board} />
            <Keyboard
                keyboard={keyboard}
                handleButtonClick={handleButtonClick}
            />
        </div>
    )
}

export default App