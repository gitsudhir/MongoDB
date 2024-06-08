//input : aaabblllaab
//output: a3b2l3a2b1


function countTheChar(str){
    let firstChar = str.at(0);
    let result = [firstChar,1];
    for(let i =1;i<str.length-1;i++){
        if(result.at(-2)==str.at(i)){
            let nowCount = result.pop();
            result.push(nowCount+1);
        
        }else{
            result.push(str.at(i),1);
        }
    }
    return result.join('');
}

let result = countTheChar('aaabblllaabc');
console.log({result});