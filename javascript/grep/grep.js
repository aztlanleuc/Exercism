#!/usr/bin/env node

// The above line is a shebang. On Unix-like operating systems, or environments,
// this will allow the script to be run by node, and thus turn this JavaScript
// file into an executable. In other words, to execute this file, you may run
// the following from your terminal:
//
// ./grep.js args
//
// If you don't have a Unix-like operating system or environment, for example
// Windows without WSL, you can use the following inside a window terminal,
// such as cmd.exe:
//
// node grep.js args
//
// Read more about shebangs here: https://en.wikipedia.org/wiki/Shebang_(Unix)

const fs = require("fs");
const path = require("path");

/**
 * Reads the given file and returns lines.
 *
 * This function works regardless of POSIX (LF) or windows (CRLF) encoding.
 *
 * @param {string} file path to file
 * @returns {string[]} the lines
 */
function readLines(file) {
  const data = fs.readFileSync(path.resolve(file), { encoding: "utf-8" });
  return data.split(/\r?\n/);
}

const VALID_OPTIONS = [
  "n", // add line numbers
  "l", // print file names where pattern is found
  "i", // ignore case
  "v", // reverse files results
  "x", // match entire line
];

const ARGS = process.argv;

// create a bunch of variables to use later in the code
let flags = [];
let files = [];
let string;
let outputString = "";

// remove the first two arguments, as they are information about the process and not relevant to this code
let args = ARGS.splice(2);

// go through each argument, and sort them into file names (contains .txt), flags (starts with a -), and the string we need to search for
for (let i in args) {
  let item = args[i];

  if (item.startsWith("-")) {
    flags.push(item);
  } else if (item.includes(".txt")) {
    files.push(item);
  } else {
    string = item;
  }
}

// this function handles the two flags that alter the matching process
function doesMatch(line, string) {
  if (flags.includes("-i")) {
    // if we should ignore case, convert them to lower case
    line = line.toLowerCase();
    string = string.toLowerCase();
  }
  if (flags.includes("-x")) {
    // if we should match the entire line, do that
    if (line === string) {
      return true;
    }
  } else {
    // if we can just check for a subset of the string, do that instead
    if (line.includes(string)) {
      return true;
    } else {
      return false;
    }
  }
}

function shouldOutput(bool) {
  if (flags.includes("-v")) {
    // if we should be returning the lines that don't match, invert the matches boolean
    return !bool;
  } else {
    // otherwise we're good with the boolean that got passed in
    return bool;
  }
}

function outputType(allowed) {
  let final = ""; // this is the string that will be output by the function, with the relevant information about the match on this line
  if (files.length > 1 && !flags.includes("-l")) {
    //if grep is searching through multiple files and the flag to return only the file names is not set, add the file name to the start of the string
    final += "file + ':' + ";
  }
  if (flags.includes("-l") && allowed) {
    // if the flag to return only the file name is set, add the file name to the string
    final += "file";
  } else if (flags.includes("-n") && allowed) {
    // if the file names flag is not set, check if the show line numbers flag is set
    // if it is, add the line index plus one (because indexes start at 0) and the line itself to the string
    final += "(Number(l) + 1) + ':' + line";
  } else if (allowed) {
    // if neither of those flags are set, but we did find a match, add just the line to the string
    final += "line";
  } else {
    // if we didn't find a match, make sure the string returned is empty
    final = "''";
  }
  return final;
}

function checkAlreadyMatched(string) {
  // this just checks if the line we've just matched has already been identified as a match, so that we don't add it
  //console.log(typeof outputString, string, outputString.includes(string));
  if (!outputString.includes(string)) {
    outputString += string + "\n"; // if it hasn't been matched already, add it to the final output, as well as a new line afterwards
  }
}

for (let file of files) {
  // go through each file in the files array

  let lines = readLines(file); //retrieve the lines contained within that file and store them in an array

  for (let l in lines) {
    // go through the indexes in the lines array

    let line = lines[l]; // retrieve the line stored at that index (done this way so that I can access the line number)

    // run the functions to parse the flags and determine what should be output, and then evaluate the string returned and store the value in a variable
    let toAppend = eval(outputType(shouldOutput(doesMatch(line, string))));
    checkAlreadyMatched(toAppend); // run the check to see if this match has already been found
  }
}

console.log(outputString); //console log the whole thing (this is the output the tests check for!!)
