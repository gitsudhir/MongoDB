function secondLarget(arr){
    let max = -Infinity;
    let secondmax = -Infinity;
    for(const nowVal of arr){
        if(nowVal>max){
            secondmax = max;
            max = nowVal; 

        }else if(nowVal>secondmax && nowVal < max){
            secondmax = nowVal;
        }
    }
    return [max,secondmax];
}

const arrvalues = [2,4,5,6,7,1,8];
const result = secondLarget(arrvalues);
console.log(result);