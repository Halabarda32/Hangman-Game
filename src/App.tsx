import { useState, useEffect, useCallback } from 'react'
import styles from './App.module.css'
import words from './wordList.json'
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

const getWord = () => {
	return words[Math.floor(Math.random() * words.length)]
}

function App() {
	const [wordToGuess, setWordToGuess] = useState(getWord)
	const [guessedLetters, setGuessedLetters] = useState<string[]>([])
	const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

	const isLoser = incorrectLetters.length >= 6
	const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))

	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return

			setGuessedLetters(currentLetters => [...currentLetters, letter])
		},
		[guessedLetters, isLoser, isWinner]
	)

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key.toLowerCase()

			if (!key.match(/^[a-z]$/)) return

			e.preventDefault()
			addGuessedLetter(key)
		}

		document.addEventListener('keypress', handler)

		return () => {
			document.removeEventListener('keypress', handler)
		}
	}, [guessedLetters, addGuessedLetter])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key

			if (key !== 'Enter') return
			setWordToGuess(getWord())
			e.preventDefault()
			setGuessedLetters([])
		}

		document.addEventListener('keypress', handler)

		return () => {
			document.removeEventListener('keypress', handler)
		}
	}, [])

	return (
		<div className={styles.containetr}>
			<div className={styles.header}>
				{isWinner && 'Winner! - Refresh to try again'}
				{isLoser && 'Nice Try - Refresh to try again'}
			</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
			<Keyboard
				activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
				inactiveLetters={incorrectLetters}
				addGuessedLetter={addGuessedLetter}
				disabled={isWinner || isLoser}
			/>
		</div>
	)
}

export default App
