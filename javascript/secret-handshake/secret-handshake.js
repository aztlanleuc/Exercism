//
// This is only a SKELETON file for the 'Secret Handshake' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const commands = (input) => {
  let output = [];

  let inputBin = input.toString(2);

  let inputArray;

  if (!(input > 16)) {
    inputArray = inputBin.split("").reverse();

    if (inputArray[0] === "1") {
      output.push("wink");
    }

    if (inputArray[1] === "1") {
      output.push("double blink");
    }

    if (inputArray[2] === "1") {
      output.push("close your eyes");
    }

    if (inputArray[3] === "1") {
      output.push("jump");
    }
  } else {
    inputArray = inputBin.split("");
    inputArray.shift();

    if (inputArray[0] === "1") {
      output.push("jump");
    }

    if (inputArray[1] === "1") {
      output.push("close your eyes");
    }

    if (inputArray[2] === "1") {
      output.push("double blink");
    }

    if (inputArray[3] === "1") {
      output.push("wink");
    }
  }

  return output;
};
