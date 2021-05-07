//
// This is only a SKELETON file for the 'RNA Transcription' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const toRna = (inputSequence) => {
  let output = "";
  for (const letter of inputSequence) {
    switch (letter) {
      case "C":
        output += "G";
        break;
      case "G":
        output += "C";
        break;
      case "A":
        output += "U";
        break;
      case "T":
        output += "A";
        break;
    }
  }

  return output;
};
