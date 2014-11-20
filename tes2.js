var _u = require('underscore');
var util = require('util');

var pai_util = require('./util_pai');
var my_util = require('./my_util');

my_util.println("start");

// 入力データ
//var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5,M6');
//var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5');
//var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5,M6,M6,M6');
var inPai = pai_util.strToPaiList('M1,S1,M2,S2,M3,P3,P3,P4,M4,M4,P5,M6,M6,P6');
// sort
inPai.sort(pai_util.compare);

my_util.println("-input---------");
my_util.println_dump(inPai);

// 種類で分割
my_util.println("--split kind");
var paiListHash = pai_util.sepKind(inPai);
// 種類毎に分割
var kresu = {};
_u.each(paiListHash,function(v,k){
    my_util.print(k+":");
    my_util.println_dump(v);
    kresu[k] = parse(v);
});
// 表示
_u.each(kresu,function(v,k){
    my_util.print(k+":\n");
    my_util.println_dump(v);
});

my_util.println("-final---------");
my_util.println_dump(tes(kresu));

// 全パターン組み合せ
function tes(inHash){
    var inList = _u.values(inHash);
    return _tes(inList);
}

function _tes(kresu){
    var o = kresu.pop();
    if (kresu.length==0){
	return o;
    }
    var r = _tes(kresu);
    // o と r を結合して返す
    //if ((_u.keys(o)).length==0){return r;}
    var ret = [];
    _u.each(o,function(ol){
	_u.each(r,function(rl){
	    var n = ol;
	    n.concat(rl);
	    my_util.println("-n---------");
	    my_util.println_dump(n);
	    my_util.println("--");

	    ret.push(n);
	});
    });
    return ret;
}


// my_util.println_dump(kresu['MANZU']);


// var t = parse(paiListHash[0]);
// _u.each(t,function(v,k){
//     my_util.print(k+':');
//     my_util.println_dump(v);
// });

// // 表示
// var kresu = {};
// _u.each(paiListHash,function(v,k){
//     my_util.print(k+":");
//     my_util.println_dump(v);
//     var t = parse(v);
//     kresu[k+'#'] = t;
// });

// my_util.println("--start3");
// _u.each(kresu,function(v,k){
//     my_util.print(k+":");
//     my_util.println_dump(v);
// });

// my_util.println("--start3");

// my_util.println_dump(inPai);

// var sList = parse(inPai);
// my_util.println("-output---------");
// _u.each(sList,function(v,k){
//     my_util.print(k+':');
//     my_util.println_dump(v);
// });


function print_parsedResult(r){
    _u.each(r,function(v,k){
	my_util.print(k+':');
	my_util.println_dump(v);
    });
}

function parse(inPaiList){
    var result = {};

    // 先に対子を取った組み合せを作る
    var toituPattern = searchAllToitu(inPaiList);
    // 組み合せを作る
    _u.each(toituPattern,function(ll){
	var rest = [];
	rest.push(ll[1]);
	_parse(ll[0],rest,result);
    });
    // そのままで組み合せを作る
    _parse(inPaiList,[],result);

    // ユニーク化のためのキーを外してリストに変換する
    return _u.values(result);
}

function _parse(restL,parsedLL,result){
    var listUpedRestLLL = listUpKotuSyuntu(restL);
    if (listUpedRestLLL.length==0){
	// 引数を解析してももうなにもでなかったので引数を合成して返す
	if (parsedLL.length==0){return;}
	if (restL.length>0){
	    parsedLL.unshift(restL);
	}
	var key = mkLLKey(parsedLL);
	result[key] = parsedLL;
	return;
    }
    _u.each(listUpedRestLLL,function(paiLL){
	var newRest = paiLL.shift();
	var newBody = parsedLL.concat(paiLL);
	_parse(newRest,newBody,result);
    });
}

function listUpKotuSyuntu(paiList){
    var res = searchAllSyuntu(paiList);
    var kotu = findKotu(paiList,0);
    if (kotu[1].length){
	res.push(kotu);
    }
    return res;        
}


function mkLLKey(ll){
    return listToStringList(listListToStringList(ll).sort());
}

// [[M4,M4,M6],[M1,M2,M3],[M1,M2,M3],[M3,M4,M5]]
// my_util.println("-l--------");
// my_util.println_dump(l);
// my_util.println("---");
function listListToStringList(ll){
    return _u.map(ll,function(l){
	if (l.length==0) return 'N';// 残りパートが無くなると通る
	return _u.reduce(l,function (memo,p){
	    return memo + p.toString();
	});
    });
}

function listToStringList(l){
    return _u.reduce(l,function (memo,p){
	return memo + '-' + p.toString();
    });
}


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

// とれる対子を全て洗い出す
function searchAllToitu(paiList){
    var retListList = [];
    var prevPai = null;
    for (var ii=0;ii<paiList.length;ii++){
	if (prevPai){
	    // 同じ牌が並らんでいたらスキップ
	    if (prevPai.getNum()==paiList[ii].getNum()){continue};
	}
	prevPai = paiList[ii];
	var toitu = getSamePai(paiList,ii,2);
	if (toitu.length){
	    // 対子がとれたら登録
	    retListList.push([_u.difference(paiList,toitu) ,toitu]);
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

