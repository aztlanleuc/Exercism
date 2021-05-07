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

    for (let word of wordArray) {
      for (let row in this.grid) {
        row = Number(row);
        for (let column in this.grid[row]) {
          column = Number(column);
          if (this.grid[row][column] === word[0]) {
            let endLocation = this.searchRecursively(word, 1, row, column);

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

    return this.matches;
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
    let i;
    let j;

    //if we've reached the end of the string, return that we found it
    if (index >= string.length) {
      return [rownum, columnnum];
    }

    for (i = top; i <= bottom; i++) {
      for (j = left; j <= right; j++) {
        if (dir) {
          if (!(i === dir[0] && j === dir[1])) {
            continue;
          }
        }

        if (i === middle && j === middle) {
          continue;
        }

        // if we've hit the edge of the grid, move on to the next cell
        if (
          this.grid[rownum + i] === undefined ||
          this.grid[rownum + i][columnnum + j] === undefined
        ) {
          continue;
        }

        if (this.grid[rownum + i][columnnum + j] === string[index]) {
          let result = this.searchRecursively(
            string,
            index + 1,
            rownum + i,
            columnnum + j,
            [i, j]
          );
          if (!result) {
            continue;
          }

          return result;
        }
      }
    }
  }
}

export default WordSearch;
