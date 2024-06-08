function isBalanceParathensis(str) {
  let stack = [];
  let parMap = { "[": "]", "{": "}", "(": ")" };
  let Allpara = Object.entries(parMap).flat(1);
  for (const nowVal of str.split("")) {
    if (Allpara.includes(nowVal)) {
      // parenth occured
      // delete the if the last value is match the parenthh condition
      if(parMap[stack.at(-1)] == nowVal){
        stack.pop();
      }else{
        stack.push(nowVal);
      }
    }
  }
  return stack.length == 0;
}

let result = isBalanceParathensis("{[(2-4)*(4+5)]}[]");
console.log({ result });
