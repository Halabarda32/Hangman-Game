import styles from './HangmanWord.module.css'

type HangmanWordProps = {
	guessedLetters: string[]
	wordToGuess: string
	reveal?: boolean
}

export const HangmanWord = ({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) => {
	return (
		<div className={styles.container}>
			{wordToGuess.split('').map((letter, index) => (
				<span className={styles.underscore} key={index}>
					<span
						className={`${styles.letter} ${
							guessedLetters.includes(letter) || reveal ? styles.active : styles.inactive
						} ${styles.reveal} ${!guessedLetters.includes(letter) && reveal ? styles.red : styles.blue}`}>
						{letter}
					</span>
				</span>
			))}
		</div>
	)
}
