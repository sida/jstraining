var _u = require('underscore');
var util = require('util');

var pai_util = require('./util_pai');
var paiKind = {'MANZU':0,'SOUZU':1,'PINZU':2,'SHIFU':3,'SANGEN':4};


util.print("start\n");

var paiList = _u.shuffle(makeAllPai());
//var s = _u.sample(paiList,10);
var tePai = _u.sample(paiList,14);
// sort
tePai.sort(pai_util.compare);

_u.each(tePai,function(p){util.print(p.toString() + "\n");});

// 先頭3つ
util.print("first 3/14\n");
var f = _u.first(tePai,3);
_u.each(f,function(p){util.print(p.toString() + "\n");});
// のこり
util.print("rest 11/14\n");
var r = _u.rest(tePai,3);
_u.each(r,function(p){util.print(p.toString() + "\n");});
// 種類で分割
util.print("--start2\n");
var paiListHash = sepKind(paiList);
_u.each(_u.keys(paiListHash),function(ii){
    util.print(_u.keys(paiKind)[ii]+"\n");
    printPaiList(paiListHash[ii]);
});
util.print("--start3\n");

var inPai = paiListHash[0];
var koRetList = firstKotu(inPai);
var syuRetList = firstSyuntu(inPai);
util.print("--\n");
printPaiList(inPai);
util.print("--\n");
printPaiListList(koRetList);
util.print("--\n");
printPaiListList(syuRetList);
util.print("--\n");



//--------------------------------

// input sorted list
function firstSyuntu(paiList){
    var workList = [].concat(paiList);
    while(workList.length >= 3){
	var tmpSyuntu = [];
	var firstPai = _u.first(workList);
	if (firstPai.getNum() > 7){break;}
	workList = _u.rest(workList);
	tmpSyuntu.push(firstPai);

	var syu2 = _u.filter(workList,function(p){
	    return p.equalKN(firstPai.getKind(),firstPai.getNum()+1);
	})[0];
	if (!syu2){continue;}
	tmpSyuntu.push(syu2);
	
	var syu3 = _u.filter(workList,function(p){
	    return p.equalKN(firstPai.getKind(),firstPai.getNum()+2);
	})[0];
	if (!syu3){continue;}
	tmpSyuntu.push(syu3);

	if (tmpSyuntu.length == 3) {
	    return [tmpSyuntu, _u.difference(paiList,tmpSyuntu)];
	}
    }
    return [[],paiList];
}

// input sorted list
function firstKotu(paiList){
    var workList = [].concat(paiList);
    var retRest = [];
    var retKotu = [];
    while(workList.length >= 3){
	var firstPai = _u.first(workList);
	var filtedPai = _u.filter(workList,function(p){
	    return p.equal(firstPai);
	});
	if (filtedPai.length >= 3) {
	    return [filtedPai,retRest.concat(_u.rest(workList,3))];
	}
	workList = _u.rest(workList);
	retRest.push(firstPai);
    }
    return [[],paiList];
}

// kindで分割
function sepKind(paiList){
    var kList = _u.keys(paiKind);
    var ret = {};
    _u.each(kList,function (k){
	var kind = paiKind[k];
	var f = _u.filter(tePai,function(p){return p.getKind()==kind;});
	ret[kind]=f;
    });
    return ret;
}

// リストの表示
function printPaiList(l){
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
function printPaiListList(l){
    _u.each(l,function(lp){
	util.print("*");
	printPaiList(lp);
   });
}

function makeAllPai(){
    var serial = 0;
    var ret = [];

    for (var ii=1;ii<10;ii++){
	for (var ij=0;ij<4;ij++){
	    pai = pai_util.definePai(0,ii,serial);
	    ret.push(pai);
	    serial++;
	}
    }
    for (var ii=1;ii<10;ii++){
	for (var ij=0;ij<4;ij++){
	    pai = pai_util.definePai(1,ii,serial);
	    ret.push(pai);
	    serial++;
	}
    }
    for (var ii=1;ii<10;ii++){
	for (var ij=0;ij<4;ij++){
	    pai = pai_util.definePai(2,ii,serial);
	    ret.push(pai);
	    serial++;
	}
    }
    for (var ii=1;ii<4;ii++){
	for (var ij=0;ij<4;ij++){
	    pai = pai_util.definePai(3,ii,serial);
	    ret.push(pai);
	    serial++;
	}
    }
    for (var ii=1;ii<3;ii++){
	for (var ij=0;ij<4;ij++){
	    pai = pai_util.definePai(4,ii,serial);
	    ret.push(pai);
	    serial++;
	}
    }
    return ret;
}

