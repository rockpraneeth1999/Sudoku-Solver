"use strict";

function solvable(row, col, arr, value) {
  for (let i = 0; i < 9; i++) {
    if (arr[row][i] == value) {
      return false;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (arr[i][col] == value) {
      return false;
    }
  }
  let rowUpperLimit = 0;
  let colUpperLimit = 0;
  let rowLowerLimit = 0;
  let colLowerLimit = 0;
  if (row < 3 && row > -1) {
    rowLowerLimit = 0;
    rowUpperLimit = 2;
  } else if (row > 2 && row < 6) {
    rowLowerLimit = 3;
    rowUpperLimit = 5;
  } else if (row > 5 && row < 9) {
    rowLowerLimit = 6;
    rowUpperLimit = 8;
  }
  if (col < 3 && col > -1) {
    colLowerLimit = 0;
    colUpperLimit = 2;
  } else if (col > 2 && col < 6) {
    colLowerLimit = 3;
    colUpperLimit = 5;
  } else if (col > 5 && col < 9) {
    colLowerLimit = 6;
    colUpperLimit = 8;
  }
  for (let a = rowLowerLimit; a <= rowUpperLimit; a++) {
    for (let b = colLowerLimit; b <= colUpperLimit; b++) {
      if (a == row && b == col) {
        continue;
      } else if (arr[a][b] == value) {
        return false;
      }
    }
  }
  return true;
}

function solve(arr) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (arr[row][col] == 0) {
        for (let value = 1; value <= 9; value++) {
          if (solvable(row, col, arr, value)) {
            arr[row][col] = value;
            if (solve(arr)) {
              return true;
            } else {
              arr[row][col] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function checkfake(arr, value, row, col) {
  for (let i = 0; i < 9; i++) {
    if (i == col) {
      continue;
    } else if (arr[row][i] == value) {
      return true;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (i == row) {
      continue;
    } else if (arr[i][col] == value) {
      return true;
    }
  }
}

document.querySelector(".solve").addEventListener("click", function () {
  let arr = [];
  let temp = [];
  for (let i = 0; i < 9; i++) {
    temp = [];
    for (let j = 0; j < 9; j++) {
      let row = ".row" + String(i) + String(j);
      let val = Number(document.querySelector(row).value);
      if (!val) {
        temp.push(0);
      } else {
        temp.push(val);
      }
    }
    arr.push(temp);
  }

  let flag = true; //no fake values
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (arr[row][col] == 0) {
        continue;
      } else if (checkfake(arr, arr[row][col], row, col)) {
        flag = false; //fake values
        break;
      }
    }
  }

  if (flag) {
    if (solve(arr)) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          let row = ".row" + String(i) + String(j);
          document.querySelector(row).value = arr[i][j];
        }
      }
      document.querySelector("body").style.backgroundColor = "#60b347";
    } else {
      document.querySelector("body").style.backgroundColor = "#D22B2B";
    }
  } else {
    document.querySelector("body").style.backgroundColor = "#D22B2B";
  }
});
