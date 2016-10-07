'use strict';

 function getMessage(a,b) {

    if (typeof a === 'boolean') {
        if (a === true) {
            return('Я попал в ' + b);
        } else {
            return('Я никуда не попал');
        }

    } else if (typeof a === 'number') {
        return('Я прыгнул на ' + a*100 + ' сантиметров');

    } else if (Array.isArray(a)) {
        var numberOfSteps = 0;

        for(var i = 0; i < a.length; i++) {
            numberOfSteps = a[i] + numberOfSteps;
        }

        if (Array.isArray(b)) {
            var distancePath = 0;

            for(var i = 0; i < Math.min(a.length, b.length); i++) {
                distancePath = a[i]*b[i] + distancePath;
            }
            return('Я прошёл ' + distancePath + ' метров');

        } else {
            return('Я прошёл ' + numberOfSteps + ' шагов');
        }

    } else {
        return('Переданы некорректные данные');
    }
}

window.getMessage = getMessage;
