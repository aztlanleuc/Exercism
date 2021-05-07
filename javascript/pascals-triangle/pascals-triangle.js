export const rows = (num) => {
  let output = [];

  for (let i = 1; i <= num; i++) {
    let row = [];
    row.push(1);

    try {
      for (let j = 1; j < output[i - 2].length; j++) {
        row.push(output[i - 2][j] + output[i - 2][j - 1]);
      }
      row.push(1);
    } catch {
      // suppress errors when there's no previous line to access
    }

    output.push(row);
  }

  return output;
};
