var utility = {};

utility.preZero = function (num, length){
    length = length || 2;
    num = num +'';
    var str = '';
    if(num.length < length) {
        for(var i=0;i<(length-num.length); i++){
            str += '0';
        }
    }
    return str + num;
}


module.exports = utility;