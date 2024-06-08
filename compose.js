const add5 = (num)=>num+5;
const multi6 = (num)=>num*6;
const subs10 = (num) =>num-10;

const compose = (...funArr)=>{
    return (num)=>{
        return funArr.reduceRight((acc,currenFunc)=>{
             return currenFunc(acc);
        },num);
    }
}

const composedFunction = compose(subs10,multi6,add5);// right to left

let result = composedFunction(12);
console.log(result);