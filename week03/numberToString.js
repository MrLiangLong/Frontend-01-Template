
function numberToString(number,hex=10){
	let int = Math.floor(number),fraction,str="";
	if(hex===10){
		const matches = String(number).match(/\.\d*/);
		fraction = matches? matches[0]:"";
	}
	while(int>0){
		str = int%hex + str;
		int = Math.floor(int/hex);
	}
	return fraction?`${str}${fraction}`:str;
}