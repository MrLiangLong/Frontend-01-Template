
//方法一、性能低
function find(source,pattern){
    for(let i=0;i<source.length;i++){
        let matched = true;
        for(let j=0;j<pattern.length;j++){
            if(source[i+j]!==pattern[j]){
                matched=false;
                break;
            }
        }
        if(matched)
            return true;
    }
    return false;
}

//方法二、O(n)
function find(source,pattern){
    //解决 find('abcabcabx','abcabx') = false  因为abcabc走完消耗掉前面的abc
    let table = new Array(pattern.length).fill(0);
    let k = 0;
    for(let j=1;j<pattern.length;j++){
        if(pattern[i]===pattern[k]){
            k++;
        }else{
            k=0;
        }
        table[j]=k;
    }
    //计算重复的位 abcabx-->[0,0,0,1,2,0]
    console.log(table)

    let j=0;
    for(let i=0;i<source.length;i++){
        if(source[i]===pattern[j]){
            j++
        }else{ 
            //解决：find("abcxxy","xy") = false  双数重复x被消耗
            while(source[i]!==pattern[j]){
                j= table[j-1]; //回退重复的位
            }
            if(source[i]===pattern[j]){
                j++
            }else{
                j=0;//回到头
            }
        }
        if(j===pattern.length)
            return true;
    }
    return false;
}













