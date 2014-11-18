function _println_dump(l){
    process.stdout.write(_dump(l)+"\n");
}

function _dump(l){
    if (!(l instanceof Array)){
	return "non array";
    }
    var comma = '';
    var ret = '[';
    for (var ii=0;ii<l.length;ii++){
	var o = l[ii];
	var str='';
	if (o instanceof Array){
	    str = _dump(o);
	} else {
	    if(typeof o.toString == "function"){str = o.toString();}
	    else {str = 'Object';}
	}
	ret = ret + comma + str; 
	comma = ',';
    }
    return ret+']';
}

module.exports = {
    'println_dump' : _println_dump,
    'dump' : _dump,
    'print' : function(str){
	process.stdout.write(str);	
    },
    'println' : function(str){
	process.stdout.write(str+"\n");	
    }
};

