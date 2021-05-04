function containsAlphabetical(message) {
  if (message.search(/[A-Za-z]/) !== -1) {
    return true;
  } else {
    return false;
  }
}

function isShouting(message) {
  if (message === message.toUpperCase() && containsAlphabetical(message)) {
    return true;
  } else {
    return false;
  }
}

function isQuestion(message) {
  let trimmed = message.trim();
  if (trimmed[trimmed.length - 1] === "?") {
    return true;
  } else {
    return false;
  }
}

function isSilent(message) {
  if (message.search(/\S/) === -1) {
    return true;
  } else {
    return false;
  }
}

export const hey = (message) => {
  if (isSilent(message)) {
    return "Fine. Be that way!";
  } else if (isShouting(message) && isQuestion(message)) {
    return "Calm down, I know what I'm doing!";
  } else if (isShouting(message)) {
    return "Whoa, chill out!";
  } else if (isQuestion(message)) {
    return "Sure.";
  } else {
    return "Whatever.";
  }
};
