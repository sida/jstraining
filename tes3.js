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
var inPai = pai_util.strToPaiList('M1,M2,M3,M4,M4,M6,M6,S1,S4,P3,G3,F7,F8,F9');
//var inPai = pai_util.strToPaiList('M1,M3,M5,M7,M8,S6,S9,S1,S4,P3,G3,F7,F8,F9');
// sort
inPai.sort(pai_util.compare);

my_util.println("-input---------");
my_util.println_dump(inPai);

var mm = pai_util.parseMentu(inPai);
my_util.println("-output---------");
my_util.println_dump(mm);


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

