const functionUtils = {
    removeItemInArray:(arr, value)=>{
        var i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }
        return arr;
    }
};
module.exports = functionUtils;
