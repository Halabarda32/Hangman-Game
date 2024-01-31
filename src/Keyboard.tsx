import styles from './Keyboard.module.css'

const KEYS = [
	'q',
	'w',
	'e',
	'r',
	't',
	'y',
	'u',
	'i',
	'o',
	'p',
	'a',
	's',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'z',
	'x',
	'c',
	'v',
	'b',
	'n',
	'm',
]

type KeyboardProps = {
	disabled?: boolean
	activeLetters: string[]
	inactiveLetters: string[]
	addGuessedLetter: (letter: string) => void
}

export const Keyboard = ({ activeLetters, inactiveLetters, addGuessedLetter, disabled = false }: KeyboardProps) => {
	const rows = [KEYS.slice(0, 10), KEYS.slice(10, 19), KEYS.slice(19)]

	return (
		<div className={styles.containerStyle}>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className={styles.rowStyle}>
					{row.map(key => {
						const isActive = activeLetters.includes(key)
						const isInactive = inactiveLetters.includes(key)

						return (
							<button
								onClick={() => {
									addGuessedLetter(key)
								}}
								className={`${styles.btn} ${isActive ? styles.active : ''} ${isInactive ? styles.inactive : ''}`}
								disabled={isActive || isInactive || disabled}
								key={key}>
								{key}
							</button>
						)
					})}
				</div>
			))}
		</div>
	)
}
