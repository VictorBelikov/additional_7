// Mentor's solution
// function help(num) {
//   return Math.floor(num / 3);
// }

// function count(row, col, matrix) {
//   const suggestions = [];
//   row = help(row) * 3; // 0 || 3 || 6
//   col = help(col) * 3; // 0 || 3 || 6

//   for (let i = 0; i < 9; i++) {
//     suggestions.push([matrix[row][i], matrix[i][col], matrix[row + (i % 3)][col + help(i)]]);
//   }
//   return suggestions;
// }

// function solveSudoku(matrix) {
//   const newMatrix = matrix; // must be deep copy
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       if (matrix[row][col] === 0) {
//         const suggestions = count(row, col, newMatrix);
//         for (const suggestion of suggestions) {
//           newMatrix[row][col] = suggestion;
//           solveSudoku(newMatrix);
//         }
//       }
//     }
//   }
//   return newMatrix;
// }

function isFullMatrix(m) {
  for (let i = 0; i < m.length; i++) {
    if (m[i].includes(0)) return false;
  }
  return true;
}

function possibleEntries(x, y, matrix) {
  const possibility = [];
  const exist = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false };

  // Проверим горизонталь
  for (let i = 0; i < 9; i++) {
    if (matrix[y][i]) {
      exist[matrix[y][i]] = true;
    }
  }

  // Проверим вертикаль
  for (let i = 0; i < 9; i++) {
    if (matrix[i][x]) {
      exist[matrix[i][x]] = true;
    }
  }

  // Проверим квадрат 3x3
  if (x <= 2) x = 0;
  else if (x <= 5) x = 3;
  else x = 6;

  if (y <= 2) y = 0;
  else if (y <= 5) y = 3;
  else y = 6;

  for (let i = y; i < y + 3; i++) {
    for (let j = x; j < x + 3; j++) {
      if (matrix[i][j]) {
        exist[matrix[i][j]] = true;
      }
    }
  }

  // Добавим возможные вхождения в массив
  for (const key in exist) {
    if (!exist[key]) possibility.push(+key);
  }
  return possibility;
}

module.exports = function solveSudoku(matrix) {
  let x, y;
  let flag = false;

  for (let i = 0; i < 9; i++) {
    if (flag) break;
    for (let j = 0; j < 9; j++) {
      if (!matrix[i][j]) {
        y = i;
        x = j;
        flag = true;
        break;
      }
    }
  }

  if (!flag) return; // матрица заполнена
  const possibility = possibleEntries(x, y, matrix); // possibility is an array

  for (let i = 0; i < possibility.length; i++) {
    matrix[y][x] = possibility[i];
    solveSudoku(matrix);
    if (isFullMatrix(matrix)) return matrix; // возвр. matrix с самой нижней рекурсии наверх
  }
  matrix[y][x] = 0; // possibility пустой, либо его перебор ничего не дал --> backtrack
};

/*
console.log(
  solveSudoku([
    // [5, 3, 4, 6, 7, 8, 9, 0, 0],
    // [6, 7, 2, 1, 9, 5, 3, 4, 8],
    // [1, 9, 8, 3, 4, 2, 5, 6, 7],
    // [8, 5, 9, 7, 6, 1, 4, 2, 3],
    // [4, 2, 6, 8, 5, 3, 7, 9, 1],
    // [7, 1, 3, 9, 2, 4, 8, 5, 6],
    // [9, 6, 1, 5, 3, 7, 2, 8, 4],
    // [2, 8, 7, 4, 1, 9, 6, 3, 5],
    // [3, 4, 5, 2, 8, 6, 1, 7, 9]
    [0, 5, 0, 4, 0, 0, 0, 1, 3],
    [0, 2, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 8, 5, 6, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 0, 0],
    [3, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 7, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0]
  ])
);
*/
