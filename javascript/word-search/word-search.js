/*
refactoring things: 
[] not having a double nested for loop
*/

class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.matches = {};
  }

  find(wordArray) {
    this.matches[wordArray];

    // search for horizontal words
    for (let rownum in this.grid) {
      for (let word of wordArray) {
        this.#searchForwards(word, this.grid[rownum], rownum);
        this.#searchBackwards(word, this.grid[rownum], rownum);
      }
    }

    // search for vertical matches?

    // console.log(this.matches);
    return this.matches;
  }

  #searchForwards(word, line, linenum) {
    linenum = Number(linenum) + 1;
    let start = line.search(word) + 1;
    let end = start + word.length - 1;
    if (start !== 0) {
      this.matches[word] = { start: [linenum, start], end: [linenum, end] };
    }
  }

  #searchBackwards(word, line, linenum) {
    linenum = Number(linenum) + 1;

    // reverse the word so that we can find backwards versions
    let temp = word.split("");
    temp.reverse();
    let wordReverse = temp.join("");

    let end = line.search(wordReverse) + 1;
    let start = end + wordReverse.length - 1;
    if (end !== 0) {
      this.matches[word] = { start: [linenum, start], end: [linenum, end] };
    }
  }
}

export default WordSearch;
