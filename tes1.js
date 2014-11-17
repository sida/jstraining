var _u = require('underscore');
var util = require('util');

var pai_util = require('./util_pai');
var my_util = require('./my_util');
//var paiKind = {'MANZU':0,'SOUZU':1,'PINZU':2,'SHIFU':3,'SANGEN':4};

my_util.println("start");

var paiList = _u.shuffle(makeAllPai());
//var s = _u.sample(paiList,10);
var tePai = _u.sample(paiList,14);
// sort
tePai.sort(pai_util.compare);
pai_util.printPaiList(tePai);

// 種類で分割
my_util.println("--start2");
var paiListHash = pai_util.sepKind(tePai);
// 表示
_u.each(_u.keys(paiListHash),function(ii){
    my_util.println(_u.keys(pai_util.paiKind)[ii]);
    pai_util.printPaiList(paiListHash[ii]);
});
my_util.println("--start3");

my_util.println("--input");
var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5,M6');
pai_util.printPaiList(inPai);

my_util.println("--kotu");
var koRetList = findKotu(inPai,0);
pai_util.printPaiListList(koRetList);

my_util.println("--syuntu");
var syuRetList = findSyuntu(inPai,0);
pai_util.printPaiListList(syuRetList);

my_util.println("--all syuntu");
//var sList = searchAllSyuntu(inPai);
//console.log(util.inspect(inPai));

// my_util.println("----dump inp s------");
// var m1 = [inPai,[]];
// var m1pop = m1.shift();
// console.log(util.inspect(m1));
// my_util.println("----");
// console.log(util.inspect(m1pop));
// my_util.println("----dump e------");


var sList1 = parse1Time([[inPai,[]]]);
var sList = parse1Time(sList1);

_u.each(sList,function(ll){
    my_util.print("--\n");
    pai_util.printPaiListList(ll);
});

my_util.println("----------");


// --------------------------------------------------

    // var workLLL;
    // if (paiLLL[1].length<=1){
    // 	workLLL = [[].concat(paiLLL) ,[]];
    // }
    // else{
    // 	workLLL = [].concat(paiLLL);
    // }


function parse1Time(paiLLL){
//console.log(util.inspect(paiLLL));

    workLLL = [].concat(paiLLL);
    var res = [];
    _u.each(workLLL,function(bodyLL){

	my_util.println("--body s");
	pai_util.printPaiListList(bodyLL);
	my_util.println("--body e");


	var rest = bodyLL.shift();

	my_util.println("--rest s");
	pai_util.printPaiListList(rest);
	my_util.println("--rest e");

	 // my_util.println("----dump s------");
	 // console.log(util.inspect(rest));
	 // my_util.println("----dump e------");

	var listUpedRestLLL = listUpKotuSyuntu(rest);
	res = [];
	_u.each(listUpedRestLLL,function(paiLL){
	    var newRest = paiLL.pop();
	    var newBody = bodyLL.concat(paiLL);
	    var newResult = [newRest,newBody];
	    res.push(newResult);
	});

    });
    return res;
}

function listUpKotuSyuntu(paiList){
    var res = searchAllSyuntu(paiList);
    var kotu = findKotu(paiList,0);
    if (kotu[0].length){
	res.push(kotu);
    }
    return res;        
}




// function parseList(paiListList){
//     _u.each(paiListList,function(paiList){
// 	// paiListの最後尾は未確認の残り牌
	
//     });

// }

// function parseOneLL(paiListList){
//     var rest = [].concat(paiListList);
//     var last = rest(pop);

//     var resultLllist = searchAllSyuntu(paiList);
//     var kotu = findKotu(paiList,0);
//     if (kotu[0].length){
// 	resultLllist.push(kotu);
//     }
//     return resultLllist;
// }

// function parseOne(paiList){
//     var resultLllist = searchAllSyuntu(paiList);
//     var kotu = findKotu(paiList,0);
//     if (kotu[0].length){
// 	resultLllist.push(kotu);
//     }
//     return resultLllist;
// }

// buggee
function listListToString(llist){
    return _u.reduce(llist,function(memo,list){
	return memo + ':' + _u.reduce(list,function(memo,pai){
	    return memo + pai.toString()+',';
	})
    });
}

// buggee
function listToString(list){
    return _u.reduce(list,function(memo,pai){
	return memo+pai.toString();
    });
}

// buggee
// リストのリストを文字列のリストに変換する
function paiListListToStringList(ll){
    return _u.map(ll,function(l){
	return _u.reduce(l,function(memo,pai){
	    return memo+pai.toString();
	})});}

//--------------------------------

// とれる順子を全て洗い出す
//  重複はしない
function searchAllSyuntu(paiList){
    var retListList = [];
    var prevPai = null;
    for (var ii=0;ii<paiList.length;ii++){
	if (prevPai){
	    // 同じ牌が並らんでいたらスキップ
	    if (prevPai.getNum()==paiList[ii].getNum()){continue};
	}
	prevPai = paiList[ii];
	var syuntu = getSyuntu(paiList,ii);
	if (syuntu.length){
	    // 順子がとれたら登録
	    retListList.push([_u.difference(paiList,syuntu) ,syuntu]);
	}
    }
    return retListList;
}

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
	    return [_u.difference(paiList,syuntu),syuntu];
	}
    }
    return [paiList,[]];
}

function getSamePai(paiList,idx,n){
    var firstPai = paiList[idx];
    var idxList = [idx];
    for (var ii=1;ii<n;ii++){
	var hitIdx = searchPaiNumIndex(paiList,idx+ii,firstPai.getNum());
	if (hitIdx<0) {return [];}
	idxList.push(hitIdx);
    }
    var ret = [];
    for (var ii=0;ii<idxList.length;ii++){
	ret.push(paiList[idxList[ii]]);
    }
    return ret;
}

function findSamePai(paiList,idx,n){
    for (var ii=idx;ii < paiList.length-2;ii++){
	var kotu = getSamePai(paiList,ii,n);
	if (kotu.length){
	    return [_u.difference(paiList,kotu) ,kotu];
	}
    }
    return [paiList,[]];
}

function findKotu (paiList,idx){
    return findSamePai(paiList,idx,3);
}

function findToitu (paiList,idx){
    return findSamePai(paiList,idx,2);
}

function findKantu (paiList,idx){
    return findSamePai(paiList,idx,4);
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

