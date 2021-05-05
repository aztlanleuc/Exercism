/*
refactoring things: 
[] not having a double nested for loop
*/

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
            // console.log("we found the first letter");
            let isFound = this.searchRecursively(word, 1, row, column, "all");
            // console.log("isFound:", isFound); // DEBUG
            // console.log("row, typeof row:", row, typeof row); // DEBUG
            // console.log("column, typeof column:", column, typeof column); // DEBUG
            if (isFound) {
              this.matches[word] = {
                start: [row + 1, column + 1],
                end: [row + 1, column + word.length],
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

  calcDirection(ogrow, ogcolumn, newrow, newcolumn) {
    console.log("time to calculate the direction");
    let direction = "";
    if (ogcolumn > newcolumn) {
      direction += "top-";
    } else if (ogcolumn === newcolumn) {
      direction += "middle-";
    } else if (ogcolumn < newcolumn) {
      direction += "bottom-";
    }

    if (ogrow > newrow) {
      direction += "left";
    } else if (ogrow === newrow) {
      direction += "middle";
    } else if (ogrow < newrow) {
      direction += "right";
    }

    console.log("direction:", direction); // DEBUG
    return direction;
  }

  searchRecursively(string, index, rownum, columnnum, dir) {
    console.log("function called:", rownum, columnnum); // DEBUG

    console.log("dir:", dir); // DEBUG

    for (let i = rownum - 1; i <= rownum + 1; i++) {
      for (let j = columnnum - 1; j <= columnnum + 1; j++) {
        console.log("i, j:", i, j); // DEBUG
        try {
          if (!(i === rownum && j === columnnum)) {
            //if we've reached the end of the string, return that we found it
            if (index >= string.length) {
              return true;
            }
            // if we've hit the edge of the grid, return that we haven't found the string
            if (
              this.grid[rownum] === undefined ||
              this.grid[rownum][columnnum] === undefined
            ) {
              continue;
            }
            // if neither of those cases occur, and the letter we're looking at is the next one in the string
            // look to see if we can find the next one too
            if (this.grid[i][j] === string[index]) {
              // console.log("matched next letter");
              // work out direction somehow
              let currentDir = this.calcDirection(rownum, columnnum, i, j);
              // console.log("currentDir:", currentDir); // DEBUG
              return this.searchRecursively(
                string,
                index + 1,
                i,
                j,
                currentDir
              );
            }
          }
        } catch (err) {
          // console.log("err:", err);
        }
      }
    }
  }
}

export default WordSearch;
