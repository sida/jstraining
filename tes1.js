var _u = require('underscore');
var util = require('util');

var pai_util = require('./util_pai');
//var paiKind = {'MANZU':0,'SOUZU':1,'PINZU':2,'SHIFU':3,'SANGEN':4};

util.print("start\n");

var paiList = _u.shuffle(makeAllPai());
//var s = _u.sample(paiList,10);
var tePai = _u.sample(paiList,14);
// sort
tePai.sort(pai_util.compare);
_u.each(tePai,function(p){util.print(p.toString() + "\n");});

// 種類で分割
util.print("--start2\n");
var paiListHash = pai_util.sepKind(tePai);
// 表示
_u.each(_u.keys(paiListHash),function(ii){
    util.print(_u.keys(pai_util.paiKind)[ii]+"\n");
    pai_util.printPaiList(paiListHash[ii]);
});
util.print("--start3\n");

var inPai = paiListHash[0];
var koRetList = firstKotu(inPai);
//var syuRetList = firstSyuntu(inPai);
var syuRetList = findSyuntu(inPai,0);
util.print("--\n");
pai_util.printPaiList(inPai);
util.print("--\n");
pai_util.printPaiListList(koRetList);
util.print("--\n");
pai_util.printPaiListList(syuRetList);
util.print("--\n");



//--------------------------------


function searchPaiNumIndex(list,start,num){
    for (var ii=start;ii<list.length;ii++){
	if (list[ii].getNum()==num) {return ii;}
	if (list[ii].getNum()>num) {return -1;}
    }
    return -1;
}

function getSyuntu(paiList,idx){
    var firstPai = paiList[idx];
    var hitIdx1 = searchPaiNumIndex(paiList,idx,firstPai.getNum()+1);
    if (hitIdx1<0) {return [];}
    var hitIdx2 = searchPaiNumIndex(paiList,idx,firstPai.getNum()+2);
    if (hitIdx2<0) {return [];}
    var ret = [];
    ret.push(firstPai);
    ret.push(paiList[hitIdx1]);
    ret.push(paiList[hitIdx2]);
    return ret;
}

// input sorted list
function findSyuntu(paiList,idx){
    for (var ii=idx;ii < paiList.length-2;ii++){
	var syuntu = getSyuntu(paiList,ii);
	if (syuntu.length){
	    return [syuntu, _u.difference(paiList,syuntu)];
	}
    }
    return [[],paiList];
}

// input sorted list
function firstKotu(paiList){
    return firstSamePai(paiList,3);
}

function firstToitu(paiList){
    return firstSamePai(paiList,2);
}

function firstKantu(paiList){
    return firstSamePai(paiList,4);
}

// input sorted list
function firstSamePai(paiList,num){
    var workList = [].concat(paiList);
    var retRest = [];
    var retKotu = [];
    while(workList.length >= num){
	var firstPai = _u.first(workList);
	var filtedPai = _u.filter(workList,function(p){
	    return p.equal(firstPai);
	});
	if (filtedPai.length >= num) {
	    return [filtedPai,retRest.concat(_u.rest(workList,num))];
	}
	workList = _u.rest(workList);
	retRest.push(firstPai);
    }
    return [[],paiList];
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

