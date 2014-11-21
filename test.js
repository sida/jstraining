var util = require('util');
util.print("start\n");


// Object.defineProperty
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// で実装する方法もある


function defPai(k,n,s){
    var kind = k;
    var num = n;
    var serialNo = s;

    function _getKind(){
	return kind;
    }

    function _getNum(){
	return num;
    }

    function _getSerialNo(){
	return serialNo;
    }
    
    return {
	getKind:_getKind,
	getNum:_getNum,
	getSerialNo:_getSerialNo,
    };
}


var pai1 = defPai(0,0,0);
var pai2 = defPai(0,1,1);

util.print(''+pai1.getKind()+'/'+pai1.getNum()+'/'+pai1.getSerialNo()+"\n");
util.print(''+pai2.getKind()+'/'+pai2.getNum()+'/'+pai2.getSerialNo()+"\n");
