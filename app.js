const tileDisplay = document.querySelector(".tile-container")
const messageDisplay = document.querySelector(".message-container")
const keyDisplay = document.querySelector(".keyboard-container")
const word = 'DANCE'
let isGameOver = false


keyList = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','<--']


const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0

guessRows.forEach((rowOuter,rowOuterIndex) => {
	const rowElement = document.createElement('div')
	rowElement.setAttribute('id','row-'+rowOuterIndex)
	rowOuter.forEach((_guess,guessIndex) => {
		const tileElement = document.createElement('div')
		tileElement.setAttribute('id','row-'+rowOuterIndex+'-tile-'+guessIndex)
		tileElement.classList.add('tile')
		rowElement.append(tileElement)
	})
	tileDisplay.append(rowElement)
})


const handleClick = (key) => {
	console.log("click",key)
	if (key == '<--') {
		deleteLetter()
		return
	}
	else if (key === 'ENTER') {
		checkRow()
		return
	}
	addLetter(key)
}


keyList.forEach(key => {
	const buttonDisplay = document.createElement('button')
	buttonDisplay.textContent = key
	buttonDisplay.setAttribute('id',key)
	buttonDisplay.addEventListener('click',() => handleClick(key))
	keyDisplay.append(buttonDisplay)
})

const addLetter = (letter) => {
	if (currentTile < 5 && currentRow < 6) {
		const tile = returnTile()
		tile.textContent = letter
		guessRows[currentRow][currentTile] = letter
		tile.setAttribute('data',letter)
		currentTile += 1
	}
}

const deleteLetter = () => {
	if (currentTile > 0) {
		currentTile -= 1
		const tile = returnTile()
		tile.textContent = ''
		guessRows[currentRow][currentTile] = ''
		tile.setAttribute('data','')
	}
}

const checkRow = () => {
	const guess = guessRows[currentRow].join('')
	if (currentTile > 4) {
		flip()
		if (word === guess) {
			console.log("!!!!")
			if (currentRow === 6) {
				showMessage("PHEW - HAPPY BIRTHDAY!")
			}
			else {
				showMessage("HAPPY BIRTHDAY!")
			}
			isGameOver = true
			return
		} else if (currentRow >= 5) {
		} else {
			currentRow += 1
			currentTile = 0
		}
	}
}

const showMessage = (message) => {
	const messageElement = document.createElement('p')
	messageElement.textContent = message
	messageDisplay.append(messageElement)
	setTimeout(() => messageDisplay.removeChild(messageElement),6000)
}

const addColorToKey = (keyLetter,color) => {
	const key = document.getElementById(keyLetter)
	key.classList.add(color)
}

const flip = () => {
	const rowTiles = document.querySelector('#row-'+currentRow).childNodes
	let checkWord = word
	const guess = []
	
	rowTiles.forEach(tile => {
		guess.push({ letter: tile.getAttribute('data'), color:'gray-overlay'})
	})
	
	guess.forEach((guess,index) => {
		if(guess.letter == word[index]) {
			guess.color = 'green-overlay'
			checkWord = checkWord.replace(guess.letter,'')
		}
	})
	guess.forEach(guess => {
		if (checkWord.includes(guess.letter)) {
			guess.color = 'yellow-overlay'
			checkWord = checkWord.replace(guess.letter,'')
		}
	})
	
	rowTiles.forEach((tile,index) => {
		const dataLetter = tile.getAttribute('data')
		setTimeout(() => {
			tile.classList.add('flipAction')
			tile.classList.add(guess[index].color)
			addColorToKey(guess[index].letter,guess[index].color)
		},600*index)
	})
}

const returnTile = () => {
	return document.getElementById('row-'+currentRow+'-tile-'+currentTile)
}

const dictionaryCheck = () => {
	
}
