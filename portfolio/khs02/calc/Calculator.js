const all = document.querySelector('#all');
const result = document.querySelector('#result');
const screen = document.querySelector('#screen');
const buttons = document.querySelector('#buttons');

var arr = []

function btnNum(char) {
    var screen = document.getElementById('screen')
    screen.innerText = screen.innerText + char
}

function btnCalc(char) {
    if (screen.innerText !== '') {
        arr.push(screen.innerText)
    }
    
    if (arr.length === 0) {
        alert("숫자를 입력하세요")
    } else {
        const lastValue = arr[arr.length - 1]
        if (lastValue === '+' || lastValue === '-' || lastValue === '*' || lastValue === '/') {
            alert("수식을 중복하여 입력하지마시오")
        } else {
            arr.push(char)
        }

        let allText = ''
        for (i = 0; i < arr.length; i++) {
            allText = allText + arr[i]
        }
        result.innerText = allText
        screen.innerText = ''
    }
    console.log(arr)
}

function btnClear() {
    result.innerText = ''
    screen.innerText = ''
    arr = []
}

function btnDel() {
    screen.innerText = screen.innerText.slice(0, -1)
}

function equal() {
    const sit = screen.innerText
    if(sit === '') {
        arr.splice(-1, 1)
        let allText = ''
        for (i = 0; i < arr.length; i++) {
            allText = allText + arr[i]
        }
        result.innerText = allText
        const res = eval(result.innerText)
        result.innerText = ''
        screen.innerText = res
        arr = []
    } else {
        arr.push(screen.innerText)
        let allText = ''
        for (i = 0; i < arr.length; i++) {
            allText = allText + arr[i]
        }
        result.innerText = allText
        const res = eval(result.innerText)
        result.innerText = ''
        screen.innerText = res
        arr = []
    }
    
}
