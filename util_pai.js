// util_pai.js
var strKind = ['MANZU','SOUZU','PINZU','SHIFU','SANGEN'];
var shortStrKind = ['M','S','P','F','S'];

function _kindToStr(kind){
    return strKind[kind];
}

module.exports = 
    {
	'kindToStr' : _kindToStr,
	'definePai' : function (k,n,s){
	    var kind = k;
	    var num = n;
	    var serialNo = s;
	    
	    return {
		getStrKind : function () {return _kindToStr(kind);} ,
		getKind:function () {return kind;},
		getNum:function () {return num;},
		getSerialNo:function () {return serialNo;},
		toString : function () {return shortStrKind[kind]+'('+num+')';}
	    }},}
