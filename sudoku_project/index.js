function btn_Click(){
    let input_List = new Array();
    input_List = document.getElementsByClassName("number");
    
    let sudoku_List = Array.from(Array(9) , () => new Array(9));
    //i have to make list of function
    //first : the index of the value i am trying to find
    //use fuction List = arr.splice , arr.push() ,in
    let already_Exist_Value_List = new Array();
    //input_List change sudoku_List..
    let index = 0;
    let zeroRowList = new Array();
    let zeroColList = new Array();
    for (let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if (input_List[index].value == ""){
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
    function dfs(dfs_Index){
        if (sorted === true){
            return;
        }
        if (dfs_Index == zeroRowList.length){
            sorted = true;
            let input_Index = 0;
            let already_List_Index = 0;
            for (let i = 0; i < 9; i++){
                for (let j = 0; j < 9; j++){
                    input_List[input_Index].value = sudoku_List[i][j];
                    if (input_Index == already_Exist_Value_List[already_List_Index]){
                        input_List[input_Index].style.color = "red";
                        already_List_Index += 1;
                    }
                    input_Index += 1;
                }
            }
        }
        else{
            let y = zeroRowList[dfs_Index];
            let x = zeroColList[dfs_Index];
            let promising = is_promising(y,x);
            for (let i = 0; i < promising.length; i++){
                sudoku_List[y][x] = promising[i];
                dfs(dfs_Index + 1);
                sudoku_List[y][x] = 0;
            }
        }
    }
    function in_Array(value , arr){
        for (let i = 0; i < arr.length; i++){
            if (value == arr[i]){
                return true;
            }
        }
        return false;
    }
    function is_promising(row, col){
        let promising = [1,2,3,4,5,6,7,8,9]
        let value = 0;
        let remainder = 0;
        for (let i = 0; i < 9; i++){
            value = sudoku_List[i][col];
            if (i == row){
                continue;
            }
            if (in_Array(value, promising)){
                promising.splice(promising.indexOf(sudoku_List[i][col]),1);
            }
        }
        for(let i = 0; i < 9; i++){
            value = sudoku_List[row][i];
            if (i == col){
                continue;
            }
            if (in_Array(value , promising)){
                promising.splice(promising.indexOf(sudoku_List[row][i]), 1);
            }
        }
        remainder = row % 3;
        row = row - remainder;
        remainder = col % 3;
        col = col - remainder;
        row = row / 3;
        col = col / 3;
        row *= 3;
        col *= 3;
        for (let i = row; i < row + 3; i++){
            for (let j = col; j < col + 3; j++){
                if (i == row && j == col){
                    continue;
                }
                value = sudoku_List[i][j];
                if (in_Array(value, promising)){
                    promising.splice(promising.indexOf(sudoku_List[i][j]), 1);
                }
            }
        }
        return promising;
    }
    dfs(0);
}
function value_Clear(){ 
    let input_List = document.getElementsByClassName("number");
    for (let i = 0; i < input_List.length; i++){
        input_List[i].value = "";
        input_List[i].style.color = "black";
    }   
}