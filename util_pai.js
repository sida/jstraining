// util_pai.js
// var util = require('util');
var my_util = require('./my_util');
var _u = require('underscore');

var paiKind = {'MANZU':0,'SOUZU':1,'PINZU':2,'SHIFU':3,'SANGEN':4};
var strKind = ['MANZU','SOUZU','PINZU','SHIFU','SANGEN'];
var shortStrKind = ['M','S','P','F','G'];
var paiKindShort = {'M':0,'S':1,'P':2,'F':3,'G':4};

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
	ret[k]=f;
    });
    return ret;
}

function _definePai (k,n,s){
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
	'toString' : function () {return shortStrKind[kind]+num;}
    }
}

function _strToPaiList(str){
    var list = str.split(',');
    var serial = 0;
    return _u.map(list,function(s){
	var kind = paiKindShort[s.charAt(0)];
	var paiNum = parseInt(s.charAt(1),10);
	serial++;
	return _definePai(kind,paiNum,serial);
    });
}

module.exports = {
    'kindToStr' : _kindToStr,
    'compare' :  _compare,
    'sepKind' : _sepKind,
    'paiKind' : paiKind,
    'strToPaiList' : _strToPaiList,
    'definePai' : _definePai,
};
