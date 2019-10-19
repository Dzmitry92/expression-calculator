function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const parsedExpression = expr.split('').filter(item => item !== ' ');
    let countOpened = 0;
    let countClosed = 0;
    for (let i = 0; i < parsedExpression.length; i++) {

        if (parsedExpression[i] === '(') {
            countOpened++;
        }
        if (parsedExpression[i] === ')') {
            countClosed++;
        }
        
    }
    if (countOpened - countClosed !== 0) { throw ("ExpressionError: Brackets must be paired");}

    const arr = [];
    let temp = '';

    for (let i = 0; i < parsedExpression.length; i++) {
        if (Number.isInteger(+parsedExpression[i])) {
            temp = temp + parsedExpression[i];
        } else {
            if (temp) {
                arr.push(temp);
            }
            arr.push(parsedExpression[i]);
            temp = '';
        }
        if (i === parsedExpression.length - 1 && temp) {
            arr.push(temp);
        }
    }
    

    const stackSign = [];
    const queue = [];

    for (let j = 0; j < arr.length; j++) {
        if (Number.isInteger(+arr[j])) {
            queue.push(+arr[j]);
        }
        else {
            
            if (arr[j] === '+' || arr[j] === '-') {
                if (stackSign.length === 0) {
                    stackSign.push(arr[j]);
                } else {
                    const top = stackSign[stackSign.length - 1];
                    if (top === '*' || top === '/') {
                        while(stackSign.length) {
                            const sign = stackSign.pop();
                            if (sign === '(') {
                                stackSign.push(sign);
                                break;
                            } else {
                                queue.push(sign);
                            }
                        }
                    }
                    if (top === '+' || top === '-') {
                        queue.push(stackSign.pop());
                    }
                    stackSign.push(arr[j]);
                }
            }

            if (arr[j] === '*' || arr[j] === '/') {
                if (stackSign.length === 0) {
                    stackSign.push(arr[j]);
                } else {
                    const top = stackSign[stackSign.length - 1];
                    if (top === '*' || top === '/') {
                        queue.push(stackSign.pop());
                    }
                    stackSign.push(arr[j]);
                }
            }

            if (arr[j] === '(') {
                stackSign.push(arr[j]);
            }

            if (arr[j] === ')') {
                while(stackSign.length) {
                    const sign = stackSign.pop();
                    if (sign === '(') {
                        break;
                    } else {
                        queue.push(sign);
                    }
                }
            }


        }
    }

    while(stackSign.length) {
        queue.push(stackSign.pop());
    }

    const summStack = [];

    for (let i = 0; i < queue.length; i++) {
        const element = queue[i];
        if (Number.isInteger(element)) {
            summStack.push(element);
        } else {
            const first = summStack.pop();
            const second = summStack.pop();
            switch (element) {
                case '+':
                    summStack.push(second + first);
                    break;
                case '-':
                    summStack.push(second - first);
                    break;
                case '*':
                    summStack.push(second * first);
                    break;
                case '/':
                    if (first === 0) {
                        throw ("TypeError: Division by zero.");
                    }
                    summStack.push(second / first);
                    break;
                default:
                    break;
            }
        }

    }
    return summStack.pop();
}

module.exports = {
    expressionCalculator
}