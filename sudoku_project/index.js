let input_List = new Array();
input_List = document.getElementsByClassName("number");

let game_process = false; //game status 
let resultSudokuList = Array.from(Array(9) , () => new Array(9)); //problem answer
let getResult = false; //decide whether to get results or not
let timeLimit = 0;
let numberOfProblem = 36 + Math.floor(Math.random() * 5);
let level = 1;
let alreadyExistValueList = new Array();

function btn_Result_Click() {
  let sudoku_List = Array.from(Array(9), () => new Array(9));
  //i have to make list of function
  //first : the index of the value i am trying to find
  //use fuction List = arr.splice , arr.push() ,in
  let already_Exist_Value_List = new Array();
  //input_List change sudoku_List..
  let index = 0;
  let zeroRowList = new Array();
  let zeroColList = new Array();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (input_List[index].value == "") {
        zeroRowList.push(i);
        zeroColList.push(j);
        index += 1;
        continue;
      }
      sudoku_List[i][j] = parseInt(input_List[index].value);
      already_Exist_Value_List.push(index);
      index += 1;
    }
  }
  let sorted = false;
  function dfs(dfs_Index) {
    if (sorted === true) {
      return;
    }
    if (dfs_Index == zeroRowList.length) {
      sorted = true;
      if (getResult == true){
        for (let i = 0; i < 9; i++){
          for (let j = 0; j < 9; j++){
            resultSudokuList[i][j] = "";
          }
        }
        for(let i =0; i < 9; i++){
          for (let j = 0; j < 9; j++){
            resultSudokuList[i][j] = sudoku_List[i][j];
          }
        }
      }
      else{
      sorted = true;
      let input_Index = 0;
      let already_List_Index = 0;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          input_List[input_Index].value = sudoku_List[i][j];
          if (input_Index == already_Exist_Value_List[already_List_Index]) {
            input_List[input_Index].style.color = "red";
            already_List_Index += 1;
          }
          input_Index += 1;
          }
        }
        if (timeLimit != 0){
          setTimeout(() =>{
          already_List_Index = 0;
          for (let i =0;i < 81; i++){
            if (already_Exist_Value_List[already_List_Index] != i){
              input_List[i].value = "";
            }
            else{
              already_List_Index += 1;
            }
            input_List[i].style.color = "black";
          }
        },timeLimit);
        }
      }
    } else {
      let y = zeroRowList[dfs_Index];
      let x = zeroColList[dfs_Index];
      let promising = is_promising(y, x);
      for (let i = 0; i < promising.length; i++) {
        sudoku_List[y][x] = promising[i];
        dfs(dfs_Index + 1);
        sudoku_List[y][x] = 0;
      }
    }
  }
  function in_Array(value, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (value == arr[i]) {
        return true;
      }
    }
    return false;
  }
  function is_promising(row, col) {
    let promising = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let value = 0;
    let startX = 0;
    let startY = 0;
    for (let i = 0; i < 9; i++) {
      value = sudoku_List[i][col];
      if (i == row) {
        continue;
      }
      if (in_Array(value, promising)) {
        promising.splice(promising.indexOf(sudoku_List[i][col]), 1);
      }
    }
    for (let i = 0; i < 9; i++) {
      value = sudoku_List[row][i];
      if (i == col) {
        continue;
      }
      if (in_Array(value, promising)) {
        promising.splice(promising.indexOf(sudoku_List[row][i]), 1);
      }
    }
    startX = Math.floor(row / 3);
    startY = Math.floor(col / 3);
    startX *= 3;
    startY *= 3;
    for (let i = startX; i < startX + 3; i++) {
      for (let j = startY; j < startY + 3; j++) {
        if (i == row && j == col) {
          continue;
        }
        value = sudoku_List[i][j];
        if (in_Array(value, promising)) {
          promising.splice(promising.indexOf(sudoku_List[i][j]), 1);
        }
      }
    }
    return promising;
  }
  dfs(0);
}
function timeLimit5(){
  timeLimit = 5000;
}
function timeLimit10(){
  timeLimit = 10000;
}
function timeLimitNone(){
  timeLimit = 0;
}
function value_Clear() {
  game_process = false;
  let input_List = document.getElementsByClassName("number");
  for (let i = 0; i < input_List.length; i++) {
    input_List[i].value = "";
    input_List[i].style.color = "black";
  }
}
function change_Color(object) { //index find success
  let focus_Index = 0;
  for (let i = 0; i < 81; i++) {
    input_List[i].style.backgroundColor = "white";
    input_List[i].style.opacity = "1";  
    if (input_List[i] == object) {
        focus_Index = i;
    }
  }
  let startX_Index = Math.floor(focus_Index / 9) * 9;
  let startY_Index = focus_Index % 9;
  for (let i = startX_Index; i < startX_Index + 9; i++){
      if (i == focus_Index){
          input_List[i].style.backgroundColor = "rgba(255,255,130,0.3)";
          continue;
      }
      input_List[i].style.backgroundColor = "rgba(0,0,0,0.1)";
  }
  while(startY_Index < 81){
      if (startY_Index == focus_Index){
          startY_Index += 9;
          continue;
      }
      input_List[startY_Index].style.backgroundColor = "rgba(0,0,0,0.1)";
      startY_Index += 9;
  }
  let row = Math.floor(focus_Index / 9);
  let col = focus_Index % 9;
  let startRow = Math.floor(row / 3);
  let startCol = Math.floor(col / 3);
  startRow *= 3;
  startCol *= 3;
  let startIndex = startCol + (startRow * 9);
  for(let i =0; i < 3; i++){
      for(let j =0; j < 3; j++){
          if (startIndex == focus_Index){
              if(j != 2){startIndex += 1;}
              continue;
          }
          input_List[startIndex].style.backgroundColor = "rgba(0,0,0,0.1)";
          if (j != 2){startIndex += 1;}
      }
      startIndex += 7;
  }
}
function check_Value(object) {
  let input_Index = 0;
  if (game_process == false){
    return;
  }
  else {
    for (let i = 0; i < 81; i++){
      if (input_List[i] == object){
        input_Index = i;
      }
    }
    for (let i = 1; i < 10; i++){
      if (input_List[input_Index].value == i){
        break;
      }
      if (i == 9){
        return;
      }
    }   
    let row = Math.floor(input_Index / 9);
    let col = input_Index % 9;
    if (resultSudokuList[row][col] != input_List[input_Index].value){
      input_List[input_Index].style.color = "red";
      let lifeCount = document.getElementsByClassName("lifeCount");
      lifeCount[0].innerHTML = parseInt(lifeCount[0].innerHTML) - 1;
      setTimeout(() => {
      if (parseInt(lifeCount[0].innerHTML) == 0){
        result = window.confirm("다시 하시겠습니까?");
        if (result == true){
          let alreadyExistIndex = 0;
          for (let i = 0; i < 81; i++){
            if(alreadyExistValueList[alreadyExistIndex] == i){
              alreadyExistIndex += 1;
              continue;
            }
            input_List[i].value = "";
          }
          lifeCount[0].innerHTML = 3;
        }
        else{
          value_Clear();
          lifeCount[0].innerHTML = 3;
        }
      }
    },300);
      setTimeout(() => input_List[input_Index].style.color = "black", 500);
    }
  }
}
function btn_Complete(){ //reaization complete
  game_process = true;
  getResult = true;
  btn_Result_Click();
  getResult = false;
  alreadyExistValueList = new Array();
  for (let i = 0; i < 81; i++){
    if (input_List[i].value != ""){
      alreadyExistValueList.push(i);
    }
  }
}
function beginner(){
  level = 1;
}
function intermediate(){
  level = 2;
}
function advance(){
  level = 3;
}
function problemPosing(){
  game_process = true;
  for (let i = 0; i < 81; i++){
    input_List[i].value = "";
    input_List[i].style.color = "black";
  }
  let colLimit = 0;
  let numberCount = 0;
  let inputIndex = 0;
  let inputRow = 0;
  let colCount = 0;
  let inputNumber = 0;
  if (level == 1){
    numberOfProblem = 36 + Math.floor(Math.random() * 5);
    colLimit = 6;
  }
  else if (level == 2){
    numberOfProblem = 28 + Math.floor(Math.random() * 5);
    colLimit = 5;
  }
  else{
    numberOfProblem = 20 + Math.floor(Math.random() * 5);
    colLimit = 4;
  }
  while (numberCount != numberOfProblem){
    inputIndex = Math.floor(Math.random() * 81);
    inputRow = Math.floor(inputIndex / 9);
    colCount = 0;
    if (input_List[inputIndex].value != ""){
      continue;
    }
    for (let i = inputRow * 9; i < (inputRow * 9) + 9; i++){
      if (input_List[i] != ""){
        colCount += 1;
      }
      if (colCount == colLimit){
        continue;
      }
    }
    while(true){
      inputNumber = 1 + Math.floor(Math.random() * 9);
      if (checkNumber(inputNumber , inputIndex)){
        input_List[inputIndex].value = inputNumber;
        numberCount += 1;
        break;
      }
    }
  }
  getResult = true;
  btn_Result_Click();
  getResult = false;
  alreadyExistValueList = new Array();
  for (let i = 0; i < 81; i++){
    if(input_List[i].value != ""){
      alreadyExistValueList.push(i);
    }
  }
}
function checkNumber(value,index){
  let row = Math.floor(index / 9);
  let col = index % 9;
  for (let i = row * 9; i < (row * 9) + 9; i++){
    if (input_List[i].value == value){
      return false;
    }
  }
  for (let i = col; i < 81;){
    if (input_List[i].value == value){
      return false;
    }
    i += 9;
  }
  let startRow = Math.floor(row / 3);
  let startCol = Math.floor(col / 3);
  startRow *= 3;
  startCol *= 3;
  let startIndex = startCol + (startRow * 9);
  for(let i =0; i < 3; i++){
    for(let j =0; j < 3; j++){
      if(input_List[startIndex].value == value){
        return false;
      }
      if (j != 2){startIndex += 1;}
    }
    startIndex += 7;
  }
  return true;
}