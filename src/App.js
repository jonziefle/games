import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Message from './components/Message'
import Hint from './components/Hint'
import Board from './components/Board'
import Keyboard from './components/Keyboard'

import wordsToGuess from './data/wordsToGuess'
import validWords from './data/validWords'

const App = () => {
    const [game, setGame] = useState({
        state: 'active',
        row: 0,
        column: 0
    })
    const [wordIndex, setWordIndex] = useState(null)
    const [wordToGuess, setWordToGuess] = useState('')
    const [hint, setHint] = useState('')
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
            { letter: 'enter', state: '' },
            { letter: 'z', state: '' },
            { letter: 'x', state: '' },
            { letter: 'c', state: '' },
            { letter: 'v', state: '' },
            { letter: 'b', state: '' },
            { letter: 'n', state: '' },
            { letter: 'm', state: '' },
            { letter: 'del', state: '' }
        ]
    ])

    useEffect(() => {
        const initialDate = new Date(2022, 0, 25)
        const currentDate = new Date()
        const index = Math.round((currentDate.setHours(0, 0, 0, 0) - initialDate.setHours(0, 0, 0, 0)) / (1000 * 3600 * 24))

        setWordIndex(index)
        setWordToGuess(wordsToGuess[index])
        getHint(wordsToGuess[index])
    }, [])

    const getHint = (word) => {
        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                try {
                    setHint(response.data[0].meanings[0].definitions[0].definition)
                }
                catch (error) {
                    setHint('')
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const processGuess = () => {
        const newWord = board[game.row].map(letterObject => letterObject.letter).join('')

        if (validWords.includes(newWord)) {
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
                setMessage('Good job, you win!')
            } else if (game.row === 5) {
                setGame({
                    ...game,
                    state: 'lose'
                })
                setMessage(`Sorry, the word was "${wordToGuess.toUpperCase()}"`)
            } else {
                setGame({
                    ...game,
                    row: game.row += 1,
                    column: 0
                })
            }
        } else {
            setMessage(`${newWord.toUpperCase()} is not a valid word`)
        }
    }

    const handleLetterInput = (letterValue) => {
        if (game.state === 'active') {
            setMessage('')
            if (letterValue === 'enter') {
                if (game.column === 5) {
                    processGuess()
                } else {
                    setMessage('Not enough letters!')
                }

            } else if (letterValue === 'backspace') {
                if (game.column > 0) {
                    const newBoard = JSON.parse(JSON.stringify(board))
                    newBoard[game.row][game.column - 1].letter = ''
                    setBoard(newBoard)
                    setGame({
                        ...game,
                        column: game.column -= 1
                    })
                }
            } else if (letterValue.length === 1 && letterValue >= 'a' && letterValue <= 'z') {
                if (game.column < 5) {
                    const newBoard = JSON.parse(JSON.stringify(board))
                    newBoard[game.row][game.column].letter = letterValue
                    setBoard(newBoard)
                    setGame({
                        ...game,
                        column: game.column += 1
                    })
                }
            }
        }
    }

    const handleShare = () => {
        let shareString = `Zwordle #${wordIndex + 1} ${game.row + 1}/${board.length}\n\n`
        shareString += board.map((row) => {
            return row.map(letterObject => {
                switch (letterObject.state) {
                    case 'green':
                        return '🟩'
                    case 'yellow':
                        return '🟨'
                    case 'gray':
                        return '⬜'
                    default:
                        return ''
                }
            }).join('')
        }).join('\n').trim()

        navigator.clipboard.writeText(shareString)
    }

    return (
        <div className='zwordle-game'>
            <div className='container'>
                <h2>Zwordle #{wordIndex + 1}</h2>
                <Message
                    game={game}
                    message={message}
                    handleShare={handleShare} />
                <Hint
                    hint={hint} />
                <Board board={board} />
                <Keyboard
                    keyboard={keyboard}
                    handleLetterInput={handleLetterInput}
                />
            </div>
        </div>
    )
}

export default App