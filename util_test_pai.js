// test


var baseObj = {
//    kind : 0,
//    num : 0,
//    serialNo : 0,
    getKind:function () {return this.kind;},
    getNum:function () {return this.num;},
    getSerialNo:function () {return this.serialNo;},
    'kindNameList':['MANZU','SOUZU','PINZU','SHIFU','SANGEN'],
};

function defPai (k,n,s){
    var my = Object.create(baseObj);
    my.kind = k;
    my.num = n;
    my.serialNo = s;
    
    return {
	getKind : my.getKind,
	getNum : my.getNum,
	getSerialNo : my.getSerialNo,
    }
}

module.exports = 
    {
	definePai : defPai,
    };
