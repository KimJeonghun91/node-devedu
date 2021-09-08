const itemList = document.querySelector('#itemList');
const enterBtn = document.querySelector('#enterBtn');
const enterText = document.querySelector('#enterText');
const notiText = document.querySelector('.notiText');
let arrData = [];

// {
//     uniqNo: 0,
//     isComplete : false,
//     contents: '',
// }

window.onload = () => {
    if(window.localStorage.getItem('arrData') !== null){
        arrData = JSON.parse(window.localStorage.getItem('arrData'));
    }
    createList();
}


enterBtn.addEventListener('click', () => {
    addItem();
});


enterText.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addItem();
    }
});


const createList = () => {
    // 로컬 스토리지 저장
    window.localStorage.setItem('arrData',JSON.stringify(arrData));

    // 부모뷰 초기화 => 모든 자식 노드 삭제
    while (itemList.hasChildNodes()) { itemList.removeChild(itemList.firstChild); }

    // 뷰 그리기
    for (const element of arrData) {
        const itemWrap = document.createElement('div');
        itemWrap.setAttribute('class', 'itemWrap');

        
        // 유일값을 저장용, 사용자에겐 보이지 않게 display: none; 적용
        const uniqSpan = document.createElement('span');
        uniqSpan.setAttribute('class', 'uniqSpan');
        uniqSpan.innerText = element.uniqNo;


        const checkBtn = document.createElement('span');
        checkBtn.innerText = 'done';
        if (element.isComplete) {
            checkBtn.setAttribute('class', 'material-icons checkBtnT');
        } else {
            checkBtn.setAttribute('class', 'material-icons checkBtnF');
        }
        checkBtn.addEventListener('click', () => {
            // 배열에서 선택된 항목 True/False 전환
            for (let i = 0; i < arrData.length; i++) {
                if (arrData[i].uniqNo === element.uniqNo) {
                    arrData[i].isComplete = !arrData[i].isComplete;
                }
            }

            // 배열 다시 배치
            createList();
        });


        const itemText = document.createElement('span');
        itemText.setAttribute('class', 'itemText');
        itemText.innerText = element.contents;


        const delBtn = document.createElement('span');
        delBtn.setAttribute('class', 'material-icons delBtn');
        delBtn.innerText = 'delete';
        delBtn.addEventListener('click', () => {
            // 배열에서 선택된 항목 삭제
            for (let i = 0; i < arrData.length; i++) {
                if (arrData[i].uniqNo === element.uniqNo) { arrData.splice(i, 1); }
            }

            // 배열 다시 배치
            createList();
        });

        itemWrap.appendChild(checkBtn); // 체크 버튼
        itemWrap.appendChild(uniqSpan); // 숨겨진 유니크값
        itemWrap.appendChild(itemText); // 할일 텍스트
        itemWrap.appendChild(delBtn);   // 삭제 버튼


        // 할일 갯수
        let todoLength = 0;
        for (const element of arrData) {
            if (!element.isComplete) { todoLength++; }
        }
        notiText.innerText = '할일이 ' + todoLength + '개 남았습니다.';


        // 생성한 아이템을 부모 리스트뷰에 넣는다.
        itemList.appendChild(itemWrap);

        enterText.value = '';
        enterText.focus();
    }
}



const addItem = () => {
    const getText = enterText.value;
    if (!getText) { return alert('내용을 입력해주세요.') }


    // uniqNo가 유일값을 가질 수 있도록 계속 증가.
    let idx = 0;
    if (arrData.length > 0) {
        idx = (arrData[0].uniqNo) + 1;
    }

    // 전체 배열에 추가
    arrData.unshift({ uniqNo: idx, isComplete: false, contents: getText });

    createList();
}