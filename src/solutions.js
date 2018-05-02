// Should it check for negative words?

async function evaluate (str, str1) {
  let matches = []
  let data = []
  let regs = await extract(str1)
  for (let e of regs) {
    let res = await collect(str.toLowerCase().match(e))
    if (res) {
      data.push(res)
      matches.push({
        word: res.word,
        index: res.index
      })
    }
  }
  let combos = await doubleWords(data)
  for (let e of combos.phrases) {
    matches.push({
      phrase: e,
      index: combos.indices[combos.phrases.indexOf(e)]
    })
  }
  return matches
}

async function extract (str) {
  let words = await str.split(/[ .\-_/'"()]+/)
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

async function negative (str, str1) {
  let negatives = [
    /dont/,
    /not/,
    /no/,
    /stop/
  ]
}
