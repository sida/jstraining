var util = require('util');
util.print("start\n");

var valA = {'vala' : 'a'};

var obj1 = {
    'val1' : 1,
    'val2' : 2,
    'objA' : valA,
};

var no1 = Object.create(obj1);
var no2 = Object.create(obj1);

no1.val1 = 100;
no1.objA.vala = 'b';

util.print(no2.val1+ "\n" + no2.val2+ "\n" + no2.objA.vala + "\n");
