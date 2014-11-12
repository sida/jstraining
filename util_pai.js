// util_pai.js
var util = require('util');
var _u = require('underscore');

var paiKind = {'MANZU':0,'SOUZU':1,'PINZU':2,'SHIFU':3,'SANGEN':4};
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

// kindで分割
function _sepKind(paiList){
    var kList = _u.keys(paiKind);
    var ret = {};
    _u.each(kList,function (k){
	var kind = paiKind[k];
	var f = _u.filter(paiList,function(p){return p.getKind()==kind;});
	ret[kind]=f;
    });
    return ret;
}

// リストの表示
function _printPaiList(l){
    _u.each(l,function(p){
	if (p){
	    util.print(p.toString() + ':');
	}
	else{
	    util.print('null:');
	}
    });
    util.print("\n");
}

// リストリストの表示
function _printPaiListList(l){
    _u.each(l,function(lp){
	util.print("*");
	_printPaiList(lp);
   });
}

module.exports = 
    {
	'kindToStr' : _kindToStr,
	'compare' :  _compare,
	'sepKind' : _sepKind,
	'printPaiListList' : _printPaiListList,
	'printPaiList' : _printPaiList,
	'paiKind' : paiKind,
	'definePai' : function (k,n,s){
	    var kind = k;
	    var num = n;
	    var serialNo = s;
	    
	    return {
		'equalKN' : function (k,n) { return ((kind==k)&&(num==n)); },
		'equal' : function (p) { return _equal(this,p); },
		//'getStrKind' : function () {return _kindToStr(kind);} ,
		'getKind' : function () {return kind;},
		'getNum' : function () {return num;},
		'getSerialNo' : function () {return serialNo;},
		'toString' : function () {return shortStrKind[kind]+'('+num+')';}
	    }},}
