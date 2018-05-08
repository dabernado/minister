async function compareSolutions (solution0, solution1) {
	let matches = []
	let data = []
	let regs = await extract(solution1)
	let combos = await doubleWords(data)
	let contrast = (checkContrariness(solution0) == checkContrariness(solution1)) ? {contrasted: false} : {contrasted: true}
	matches.push(contrast)
	for (let e of combos.phrases) {
		matches.push({
			phrase: e,
			index: combos.indices[combos.phrases.indexOf(e)]
		})
	}
	for (let e of regs) {
		let res = await collect(solution0.toLowerCase().match(e))
		if (res) {
			data.push(res)
			matches.push({
				word: res.word,
				index: res.index
			})
		}
	}
	return matches
}

async function extract (solution) {
	let words = await solution.split(/[ .\-_/'"()]+/)
	let regs = []
	for (let e of words) {
		let reg = new RegExp(e)
		regs.push(reg)
	}
	return regs
}

function collect (data) {
	let response = {
		word: '',
		index: 0,
		length: 0
	}
	if (data) {
		response.word = data[0]
		response.index = data.index
		response.length = data.index + data[0].length
		return response
	}
}

function doubleWords (data) {
	let res = {
		phrases: [],
		indices: []
	}
	for (let e of data) {
		let prev = data.indexOf(e) - 1
		if (prev > -1 && e.index - 1 == data[prev].length) {
			res.phrases.push(data[prev].word + ' ' + e.word)
			res.indices.push(e.index)
		}
	}
	return res
}

function checkContrariness (solution) {
	let negatives = [
		/dont/,
		/not/,
		/no /,
		/stop/,
		/shouldnt/
	]
	let contrary = false
	for (let e in negatives) {
		let solutionNeg = solution.toLowerCase().match(negatives[e])
		if (solutionNeg != null) {
			contrary = true
		}
	}
	return contrary
}
