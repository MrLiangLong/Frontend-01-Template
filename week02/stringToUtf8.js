

//string转utf8编码
const StringToUtf8 = window.TextEncoder ? function(string) {
		const encoder = new TextDecoder('utf8');
		const bytes = encoder.encode(string);
		let result = ";"
		for (let i = 0; i < bytes.length; i++) {
			result += String.fromCharCode(bytes[i]);
		}
		return result;
	} : function(String) {
		return eval('\'' + encodeURI(str).replace(/%/gm, '\\x');
		};
