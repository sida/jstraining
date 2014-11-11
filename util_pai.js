// util_pai.js
var strKind = ['MANZU','SOUZU','PINZU','SHIFU','SANGEN'];
var shortStrKind = ['M','S','P','F','G'];

function _kindToStr(kind){
    return strKind[kind];
}

function _compare (a,b){
    if (a.getKind()!=b.getKind()) {return a.getKind()-b.getKind();}
    if (a.getNum()!=b.getNum()) {return a.getNum()-b.getNum();}
    return 0;
}

function _equal (a,b){
    return ((a.getKind()==b.getKind()) && (a.getNum()==b.getNum()));
}

module.exports = 
    {
	'kindToStr' : _kindToStr,
	'compare' :  _compare,
	'definePai' : function (k,n,s){
	    var kind = k;
	    var num = n;
	    var serialNo = s;
	    
	    return {
		'equalKN' : function (k,n) { return ((kind==k)&&(num==n)); },
		'equal' : function (p) { return _equal(this,p); },
		'getStrKind' : function () {return _kindToStr(kind);} ,
		'getKind' : function () {return kind;},
		'getNum' : function () {return num;},
		'getSerialNo' : function () {return serialNo;},
		'toString' : function () {return shortStrKind[kind]+'('+num+')';}
	    }},}
