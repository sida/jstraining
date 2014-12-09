var _u = require('underscore');
var util = require('util');

var pai_util = require('./util_pai');
var my_util = require('./my_util');

my_util.println("start");

// 入力データ
//var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5,M6');
//var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5');
//var inPai = pai_util.strToPaiList('M1,M1,M2,M2,M3,M3,M3,M4,M4,M4,M5,M6,M6,M6');
//var inPai = pai_util.strToPaiList('M1,S1,M2,S2,M3,P3,P3,P4,M4,M4,P5,M6,M6,P6');
//var inPai = pai_util.strToPaiList('M1,M2,M3,M4,M4,M6,M6,S1,S4,P3,P3,P4,P6,P8');
//var inPai = pai_util.strToPaiList('M1,M2,M3,M4,M4,M6,M6,S1,S4,P3,G3,F7,F8,F9');
//var inPai = pai_util.strToPaiList('M1,M3,M5,M7,M8,S6,S9,S1,S4,P3,G3,F7,F8,F9');
var inPai = pai_util.strToPaiList('M1,M2,M3,M4,M4,M4,M6,M6,S1,S2,S3,F4,F4,F4');

/*
[
  [[M4,M6,M6],[M4,M4],[M1,M2,M3],[S1,S2,S3],[F3,F4,F5]],
  [[M1,M6,M6],[M4,M4],[M2,M3,M4],[S1,S2,S3],[F3,F4,F5]],
  [[M6,M6],[M4,M4,M4],[M1,M2,M3],[S1,S2,S3],[F3,F4,F5]],
  [[M1,M4,M4],[M6,M6],[M2,M3,M4],[S1,S2,S3],[F3,F4,F5]],
  [[M1,M4,M4,M6,M6],[M2,M3,M4],[S1,S2,S3],[F3,F4,F5]]
]


[
  [[M4,M6,M6],[M4,M4],[M1,M2,M3],[S1,S2,S3],[F4],[F4,F4]],
  [[M4,M6,M6],[M4,M4],[M1,M2,M3],[S1,S2,S3],[F4,F4,F4]],
  [[M1,M6,M6],[M4,M4],[M2,M3,M4],[S1,S2,S3],[F4],[F4,F4]],
  [[M1,M6,M6],[M4,M4],[M2,M3,M4],[S1,S2,S3],[F4,F4,F4]],
  [[M6,M6],[M4,M4,M4],[M1,M2,M3],[S1,S2,S3],[F4],[F4,F4]],

  [[M6,M6],[M4,M4,M4],[M1,M2,M3],[S1,S2,S3],[F4,F4,F4]],

  [[M1,M4,M4],[M6,M6],[M2,M3,M4],[S1,S2,S3],[F4],[F4,F4]],
  [[M1,M4,M4],[M6,M6],[M2,M3,M4],[S1,S2,S3],[F4,F4,F4]],
  [[M1,M4,M4,M6,M6],[M2,M3,M4],[S1,S2,S3],[F4],[F4,F4]],
  [[M1,M4,M4,M6,M6],[M2,M3,M4],[S1,S2,S3],[F4,F4,F4]]]

*/


// sort
inPai.sort(pai_util.compare);

my_util.println("-input---------");
my_util.println_dump(inPai);

var mm = pai_util.parseMentu(inPai);
my_util.println("-output---------");
my_util.println_dump(mm);
my_util.println("-output2---------");

isTen(mm,0,0);
//my_util.println(retCount);



function isTen(ll){
    _u.each(ll,function(l){
	var retCount = countMentu(l,0,0);
	my_util.println("--");
	my_util.println_dump(l);
	my_util.println(retCount);	
    });   
}


function countMentu(list,initToituCount,initMentuCount){
    var toituCount = initToituCount;
    var mentuCount = initMentuCount;
    var unKnownCount = 0;
    var unKnownListLast = [];

    _u.each(list,function(l){
	if (isMentu(l)){mentuCount++;}
	else if (toituCount==0 && isToitu(l)){
	    toituCount++;
	}
	else{
	    unKnownCount++;
	    unKnownListLast = l;
	}
    });

    //my_util.println(toituCount +'/'+ mentuCount +'/'+ unKnownCount);
    if ((toituCount==1)&&(mentuCount==4)&&(unKnownCount==0)) {return 'AGARI';}
    else if ((toituCount==0)&&(mentuCount==4)&&(unKnownCount==1)) {
	if (unKnownListLast.length==2){return 'TENPAI1';}
	else {return 'ERR1';}
    }
    else if ((toituCount==1)&&(mentuCount==3)&&(unKnownCount==1)) {
	if (unKnownListLast.length==3){
	    if (isTenPaiMentu(unKnownListLast)) {return 'TEMPAI2';}
	}
	else {return 'ERR2';}
    }
    return 'NOTEN';
}

// TODO 名前
function isTenPaiMentu(l){
    if (l.length!=3){return false;}
    l.sort(pai_util.compare);
    var l1num = l[0].getNum();
    var l2num = l[1].getNum();
    var l3num = l[2].getNum();   

    if ((l1num==l2num)||(l2num==l3num)||(l1num==l3num)){return true;}
    if (l1num+1==l2num){return true;}
    // if (l1num==l3num+1){} この条件になる場合は l1==l2 になるはず
    if (l2num+1==l3num){return true;}
    return false;
}

function isSyuntu(l){
    if (l.length!=3){return false;}
    if (pai_util.isShifu(l[0]) || pai_util.isSangen(l[0])){return false;}
    l.sort(pai_util.compare);
    var l1num = l[0].getNum();
    if (l1num>=8){return false;}
    var l2num = l[1].getNum();
    var l3num = l[2].getNum();   
//    my_util.println(l1num +'/'+ l2num +'/'+ l3num);
    if ((l1num+1==l2num)&&(l2num+1==l3num)) {
	//my_util.println('the syuntu');
	return true;}
	//my_util.println('not syuntu');
    return false;
}

function isKotu(l){
    if (l.length!=3){return false;}
    var l1num = l[0].getNum();
    var l2num = l[1].getNum();
    var l3num = l[2].getNum();   
    if ((l1num==l2num)&&(l2num==l3num)) {return true;}
    return false;    
}

function isToitu(l){
    if (l.length!=2){return false;}
    var l1num = l[0].getNum();
    var l2num = l[1].getNum();
    return (l1num==l2num);
}

function isMentu(l){
    // my_util.println('---');
    // my_util.println_dump(l);
    // if ((isSyuntu(l)||isKotu(l))){
    // 	my_util.println('mentu');
    // }
    // else{
    // 	my_util.println('nomen');
    // }
    // my_util.println('---');

    return (isSyuntu(l)||isKotu(l));
}






// 
// function makeAllPai(){
//     var serial = 0;
//     var ret = [];

//     for (var ii=1;ii<10;ii++){
// 	for (var ij=0;ij<4;ij++){
// 	    pai = pai_util.definePai(0,ii,serial);
// 	    ret.push(pai);
// 	    serial++;
// 	}
//     }
//     for (var ii=1;ii<10;ii++){
// 	for (var ij=0;ij<4;ij++){
// 	    pai = pai_util.definePai(1,ii,serial);
// 	    ret.push(pai);
// 	    serial++;
// 	}
//     }
//     for (var ii=1;ii<10;ii++){
// 	for (var ij=0;ij<4;ij++){
// 	    pai = pai_util.definePai(2,ii,serial);
// 	    ret.push(pai);
// 	    serial++;
// 	}
//     }
//     for (var ii=1;ii<4;ii++){
// 	for (var ij=0;ij<4;ij++){
// 	    pai = pai_util.definePai(3,ii,serial);
// 	    ret.push(pai);
// 	    serial++;
// 	}
//     }
//     for (var ii=1;ii<3;ii++){
// 	for (var ij=0;ij<4;ij++){
// 	    pai = pai_util.definePai(4,ii,serial);
// 	    ret.push(pai);
// 	    serial++;
// 	}
//     }
//     return ret;
// }

