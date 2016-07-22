function solve(el, arr) {  

    return function task1 (el, arr) {
        if (el instanceof HTMLElement) {
            
        } else if (typeof el === 'string') {
            el = document.getElementById(el);
            if (el === null) {
                throw new Error();
            }
        }
        else {
            throw new Error();
        }

        if (arr === null) {
            throw new Error();
        }

        var res = '';
        for (var i = 0; i < arr.length; i+=1) {
            if (typeof arr[i] !== 'string' && typeof arr[i] !== 'number') {
                throw new Error();
            }
            res += '<div>' + arr[i] + '</div>';
        }
        el.innerHTML = res;
    }
}