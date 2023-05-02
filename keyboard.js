// Добавление textarea
const textarea = document.getElementById('textarea');
const rightShift = "ShiftRight";
const rightCtrl = "ControlRight";
let shiftPressed = false;
let ctrlPressed = false;
let fontSwitched = false;

let functionOn = localStorage.getItem('functionOn') === 'true';

function toggleFont() {
  const engSym = document.querySelectorAll('.engSym');
  const ruSym = document.querySelectorAll('.ruSym');
  functionOn = !functionOn;

  engSym.forEach(element => {
    element.classList.toggle('hidden');
  });
  
  ruSym.forEach(element => {
    element.classList.toggle('hidden');
  });

  localStorage.setItem('functionOn', functionOn);
}

window.addEventListener('load', () => {
  const engSym = document.querySelectorAll('.engSym');
  const ruSym = document.querySelectorAll('.ruSym');

  if (functionOn) {
    engSym.forEach(element => {
      element.classList.add('hidden');
    });
    ruSym.forEach(element => {
      element.classList.remove('hidden');
    });
  } else {
    engSym.forEach(element => {
      element.classList.remove('hidden');
    });
    ruSym.forEach(element => {
      element.classList.add('hidden');
    });
  }
});


document.addEventListener('keydown', (event) => {
  if (event.code === rightShift) {
    if (ctrlPressed) {
      toggleFont();
      fontSwitched = true;
    } else {
      shiftPressed = true;
    }
  }
  if (event.code === rightCtrl) {
    if (shiftPressed) {
      toggleFont();
      fontSwitched = true;
    } else {
      ctrlPressed = true;
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === rightShift) {
    shiftPressed = false;
    fontSwitched = false;
  }
  if (event.code === rightCtrl) {
    ctrlPressed = false;
    fontSwitched = false;
  }
});




// Отображения цифр 0-9
for (let i = 0; i < 10; i++) {
  const digit = i.toString();
  const key = document.getElementById(`key${digit}`);
  key.addEventListener('mousedown', () => {
    if (shiftLeft.classList.contains('key-click') || shiftRight.classList.contains('key-click')) {
      textarea.focus();
      textarea.value += key.querySelector('.secondSymbol').textContent;
    } else {
      textarea.focus();
      textarea.value += digit;
    }    
  })

  document.addEventListener("keydown", (event) => {
    if (event.code === `Digit${digit}` && shiftLeft.classList.contains('key-click')) {
      textarea.value += key.querySelector('.secondSymbol').textContent;
      key.classList.add('key-click');
    } else if (event.code === `Digit${digit}` && shiftRight.classList.contains('key-click')) {
      textarea.value += key.querySelector('.secondSymbol').textContent;
      key.classList.add('key-click');
    } else if (event.code === `Digit${digit}`) {
      textarea.value += digit;
      key.classList.add('key-click');
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === `Digit${digit}`) {
      key.classList.remove('key-click');
    }
  });
}


// Отображения букв A-Z
for (let i = 65; i <= 90; i++) {
  const key = document.querySelector(`#key${String.fromCharCode(i)}`);
  const ruKey = document.querySelector(`#key${String.fromCharCode(i)}`).querySelector('.ruSym');
  key.addEventListener('mousedown', () => {
    if (capsLock.classList.contains('key-click')) {
      textarea.focus();
      textarea.value +=  String.fromCharCode(i).toUpperCase();
    } else {
      textarea.focus();
      textarea.value +=  String.fromCharCode(i).toLowerCase();
    }
  });



  document.addEventListener("keydown", (event) => {
    if (functionOn === false) {
      if (event.code === `Key${String.fromCharCode(i)}` && capsLock.classList.contains("key-click")) {
        textarea.value += String.fromCharCode(i).toUpperCase();
        key.classList.add('key-click');
      } else if (event.code === `Key${String.fromCharCode(i)}` && shiftLeft.classList.contains("key-click")) {
        textarea.value += String.fromCharCode(i).toUpperCase();
        key.classList.add('key-click');
      } else if (event.code === `Key${String.fromCharCode(i)}` && shiftRight.classList.contains("key-click")) {
        textarea.value += String.fromCharCode(i).toUpperCase();
        key.classList.add('key-click');
      } else if (event.code === `Key${String.fromCharCode(i)}`) {
        textarea.value += String.fromCharCode(i).toLowerCase();
        key.classList.add('key-click');
      }
    } else if (functionOn === true) {
    if (event.code === `Key${String.fromCharCode(i)}` && capsLock.classList.contains("key-click")) {
      textarea.value += ruKey.textContent.toUpperCase();
      key.classList.add('key-click');
    } else if (event.code === `Key${String.fromCharCode(i)}` && shiftLeft.classList.contains("key-click")) {
      textarea.value += ruKey.textContent.toUpperCase();
      key.classList.add('key-click');
    } else if (event.code === `Key${String.fromCharCode(i)}` && shiftRight.classList.contains("key-click")) {
      textarea.value += ruKey.textContent.toUpperCase();
      key.classList.add('key-click');
    } else if (event.code === `Key${String.fromCharCode(i)}`) {
      textarea.value += ruKey.textContent.toLowerCase();
      key.classList.add('key-click');
    }
  }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === `Key${String.fromCharCode(i)}`) {
      key.classList.remove('key-click');
    }
  });
}


// Отображения символов "-", "=", "[", "\"...
function displayChar(char, keyElement) {
  textarea.value += char;
  keyElement.classList.add("key-click");
}

function handleKeyClick(char, keyElement) {
  keyElement.addEventListener("click", () => {
    if (keyElement.querySelector('.secondSymbol')) {
      displayChar(keyElement.querySelector('.secondSymbol').textContent, keyElement);
    } else {
      displayChar(char, keyElement);
    }
    setTimeout(() => {keyElement.classList.remove("key-click")}, 500);
  });
}

function handleKeyPress(char, keyElement) {
  document.addEventListener("keydown", (event) => {
    if (event.key === char) {
      if (keyElement.querySelector('.secondSymbol')) {
        displayChar(keyElement.querySelector('.secondSymbol').textContent, keyElement);
      } else {
        displayChar(char, keyElement);
      }
    }
  });
}

function handleKeyUp(keyElement) {
  document.addEventListener("keyup", () => {
    keyElement.classList.remove("key-click");
  });
}

const buttons = [
  {char: "`", keyElement: document.getElementById("keyApo")},
  {char: "-", keyElement: document.getElementById("keyMin")},
  {char: "=", keyElement: document.getElementById("keyEqu")},
  {char: "[", keyElement: document.getElementById("keyBrackL")},
  {char: "]", keyElement: document.getElementById("keyBrackR")},
  {char: ";", keyElement: document.getElementById("keySem")},
  {char: "'", keyElement: document.getElementById("keyQuot")},
  {char: "/", keyElement: document.getElementById("keySlashR")},
  {char: "\\", keyElement: document.getElementById("keyObl")},
  {char: ".", keyElement: document.getElementById("keyPoint")},
  {char: " ", keyElement: document.getElementById("keySpace")},
  {char: ",", keyElement: document.getElementById("keyComma")}
];

buttons.forEach((button) => {
  handleKeyClick(button.char, button.keyElement);
  handleKeyPress(button.char, button.keyElement);
  handleKeyUp(button.keyElement);
});



// Функционал backspace
const backspace = document.getElementById("backspace");

backspace.addEventListener('click', () => {
  textarea.value = textarea.value.slice(0, -1);
  backspace.classList.add("key-click")
  setTimeout(() => backspace.classList.remove("key-click"), 500);
});

document.addEventListener("keydown", function(event) {
  if (event.key == "Backspace") {
    textarea.value = textarea.value.slice(0, -1);
    backspace.classList.add('key-click');
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "Backspace") {
    backspace.classList.remove("key-click");
  }
});


// Функционал tab
const keyTab = document.getElementById("keyTab");

keyTab.addEventListener('click', () => {
  textarea.setRangeText("\t", textarea.selectionStart, textarea.selectionEnd, 'end');
  keyTab.classList.add("key-click")
  setTimeout(() => keyTab.classList.remove("key-click"), 500);
});

document.addEventListener("keydown", function(event) {
  if (event.key == "Tab") {
    event.preventDefault();
    textarea.setRangeText("\t", textarea.selectionStart, textarea.selectionEnd, 'end');
    keyTab.classList.add("key-click")
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "Tab") {
    keyTab.classList.remove("key-click");
  }
});


// Функционал DEL
document.getElementById("keyDel").addEventListener("click", () => {
  const value = textarea.value;
  const newValue = value.substring(0, textarea.selectionStart) + value.substring(textarea.selectionEnd);
  textarea.value = newValue;
  keyDel.classList.add("key-click")
  setTimeout(() => keyDel.classList.remove("key-click"), 500);
});

document.addEventListener("keydown", function(event) {
  if (event.key == "Delete") {
    const value = textarea.value;
    const newValue = value.substring(0, textarea.selectionStart) + value.substring(textarea.selectionEnd);
    textarea.value = newValue;
    keyDel.classList.add("key-click")
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "Delete") {
    keyDel.classList.remove("key-click");
  }
});


// Функционал Caps Lock
const capsLock = document.getElementById("keyCaps");

capsLock.addEventListener("click", () => {
  capsLock.classList.toggle("key-click");
});

document.addEventListener("keydown", (event) => {
  if (event.code === "CapsLock") {
    capsLock.classList.toggle("key-click");
  }
});


// Функционал Shift
const shiftLeft = document.getElementById("keyShiftLeft");
const shiftRight = document.getElementById("keyShiftRight");

shiftLeft.addEventListener('click', () => {
  shiftLeft.classList.add("key-click")
  setTimeout(() => {shiftLeft.classList.remove("key-click")}, 500);
});

shiftRight.addEventListener('click', () => {
  shiftRight.classList.add("key-click")
  setTimeout(() => {shiftRight.classList.remove("key-click")}, 500);
});

document.addEventListener("keydown", (event) => {
  if (event.code === "ShiftLeft") {
    shiftLeft.classList.add("key-click");
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ShiftLeft") {
    shiftLeft.classList.remove("key-click");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "ShiftRight") {
    shiftRight.classList.add("key-click");
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ShiftRight") {
    shiftRight.classList.remove("key-click");
  }
});

// Функционал Enter
document.getElementById("keyEnter").addEventListener('click', () => {
  textarea.value += '\n'; // вставляем новую строку
  textarea.selectionStart = textarea.value.length; // устанавливаем курсор на новую строку
  textarea.selectionEnd = textarea.value.length; // устанавливаем конечную позицию выделения на новую строку
  document.getElementById("keyEnter").classList.add('key-click');
  setTimeout(() => {document.getElementById("keyEnter").classList.remove('key-click');}, 500);
});


document.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    textarea.value += '\n'; // вставляем новую строку
    textarea.selectionStart = textarea.value.length; // устанавливаем курсор на новую строку
    textarea.selectionEnd = textarea.value.length; // устанавливаем конечную позицию выделения на новую строку
    document.getElementById("keyEnter").classList.add('key-click');
  };
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    document.getElementById("keyEnter").classList.remove('key-click');
  }
})

// Функционал стрелочек
document.addEventListener('keydown', (event) => {
  if (event.code === "ArrowLeft") {
    textarea.value += '←';
    document.getElementById("keyArrLeft").classList.add('key-click');
  } else if (event.code === "ArrowRight") {
    textarea.value += "→";
    document.getElementById("keyArrRight").classList.add('key-click');
  } else if (event.code === "ArrowUp") {
    textarea.value += "↑";
    document.getElementById("keyArrUp").classList.add('key-click');
  } else if (event.code === "ArrowDown") {
    textarea.value += "↓"
    document.getElementById("keyArrDown").classList.add('key-click');
  }
});
document.addEventListener('keyup', (event) => {
  if (event.code === "ArrowLeft") {
    textarea.value += '←';
    document.getElementById("keyArrLeft").classList.remove('key-click');
  } else if (event.code === "ArrowRight") {
    textarea.value += "→";
    document.getElementById("keyArrRight").classList.remove('key-click');
  } else if (event.code === "ArrowUp") {
    textarea.value += "↑";
    document.getElementById("keyArrUp").classList.remove('key-click');
  } else if (event.code === "ArrowDown") {
    textarea.value += "↓"
    document.getElementById("keyArrDown").classList.remove('key-click');
  }
});

document.getElementById('keyArrLeft').addEventListener('click', () => {
  textarea.value += '←';
});
document.getElementById('keyArrDown').addEventListener('click', () => {
  textarea.value += '↓';
});
document.getElementById('keyArrRight').addEventListener('click', () => {
  textarea.value += '→';
});
document.getElementById('keyArrUp').addEventListener('click', () => {
  textarea.value += '↑';
});

// Функционал ctrl
document.addEventListener('keydown', (event) => {
  if (event.code === "ControlRight") {
    document.querySelector('#keyCtrl2').classList.add('key-click');
  } else if (event.code === "ControlLeft") {
    document.querySelector('#keyCtrl1').classList.add('key-click');
  }
})
document.addEventListener('keyup', (event) => {
  if (event.code === "ControlRight") {
    document.querySelector('#keyCtrl2').classList.remove('key-click');
  } else if (event.code === "ControlLeft") {
    document.querySelector('#keyCtrl1').classList.remove('key-click');
  }
})

//Фунционал Alt
document.addEventListener('keydown', (event) => {
  if (event.code === "AltLeft") {
    document.querySelector('#keyAlt1').classList.add('key-click');
  } else if (event.code === "AltRight") {
    document.querySelector('#keyAlt2').classList.add('key-click');
  };
});
document.addEventListener('keyup', (event) => {
  if (event.code === "AltLeft") {
    document.querySelector('#keyAlt1').classList.remove('key-click');
  } else if (event.code === "AltRight") {
    document.querySelector('#keyAlt2').classList.remove('key-click');
  };
});

//Фунционал Win
document.addEventListener('keydown', (event) => {
  if (event.code === "MetaLeft") {
    document.querySelector('#keyWin').classList.add('key-click');
  }
});
document.addEventListener('keyup', (event) => {
  if (event.code === "MetaLeft") {
    document.querySelector('#keyWin').classList.remove('key-click');
  }
});