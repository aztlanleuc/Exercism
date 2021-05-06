/*
refactoring things: 
[] not having a double nested for loop
*/

const top = -1;
const bottom = 1;
const middle = 0;
const left = -1;
const right = 1;

class WordSearch {
  constructor(grid) {
    this.grid = this.transformInputGrid(grid);
    this.matches = {};
  }

  find(wordArray) {
    // recursive version

    console.log("new test");

    for (let word of wordArray) {
      for (let row in this.grid) {
        row = Number(row);
        for (let column in this.grid[row]) {
          column = Number(column);
          if (this.grid[row][column] === word[0]) {
            console.log("we found the first letter");
            let endLocation = this.searchRecursively(word, 1, row, column);
            console.log("endLocation:", endLocation); // DEBUG
            // console.log("row, typeof row:", row, typeof row); // DEBUG
            // console.log("column, typeof column:", column, typeof column); // DEBUG
            if (endLocation) {
              this.matches[word] = {
                start: [row + 1, column + 1],
                end: [endLocation[0] + 1, endLocation[1] + 1],
              };
            }
          }
        }
      }
    }

    // console.log(this.matches);
    return this.matches;
  }

  searchForwards(word, line, linenum) {
    linenum = Number(linenum) + 1;
    let start = line.search(word) + 1;
    let end = start + word.length - 1;
    if (start !== 0) {
      this.matches[word] = { start: [linenum, start], end: [linenum, end] };
    }
  }

  searchBackwards(word, line, linenum) {
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

  transformInputGrid(input) {
    let grid = [];
    for (let row of input) {
      row = row.split("");
      grid.push(row);
    }
    return grid;
  }

  searchRecursively(string, index, rownum, columnnum, dir) {
    console.log("function called:", rownum, columnnum); // DEBUG

    console.log("dir:", dir); // DEBUG

    let i;
    let j;

    //if we've reached the end of the string, return that we found it
    if (index >= string.length) {
      return [rownum, columnnum];
    }

    for (i = top; i <= bottom; i++) {
      for (j = left; j <= right; j++) {
        console.log("i, j:", i, j); // DEBUG
        if (dir) {
          if (!(i === dir[0] && j === dir[1])) {
            continue;
          }
        }

        try {
          if (i === middle && j === middle) {
            continue;
          }

          // if we've hit the edge of the grid, return that we haven't found the string
          if (this.grid[i] === undefined || this.grid[i][j] === undefined) {
            continue;
          }

          if (this.grid[rownum + i][columnnum + j] === string[index]) {
            // console.log("matched next letter");
            return this.searchRecursively(
              string,
              index + 1,
              rownum + i,
              columnnum + j,
              [i, j]
            );
          }
        } catch (err) {
          // console.log("err:", err);
        }
      }
    }
  }
}

export default WordSearch;
