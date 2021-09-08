const whitebox = document.querySelector('#whitebox');
const enterText = document.querySelector('#enterText');
const ibox = document.querySelector('#ibox');
const p_1 = document.querySelector('#p_1');


let arrDate = [];   
window.onload = () => {     
    if (window.localStorage.getItem('arrDate') !== null) {  
        arrDate = JSON.parse(window.localStorage.getItem('arrDate'));
    }
    createList();
}

innerBtn.addEventListener('click', () => { 
    create(); 
});

enterText.addEventListener('keyup', event => { 
    if (event.key === 'Enter') { 
        create();  
    }
})

const createList = () => {
    if (arrDate !== null) {
        window.localStorage.setItem('arrDate', JSON.stringify(arrDate))
    }

    while (ibox.hasChildNodes()) { ibox.removeChild(ibox.firstChild); };
    var idx2 = 0;
    if(arrDate === []) {
        idx2 = 0;
    }
    console.log(arrDate)
    for (const element of arrDate) {
        const whitebox = document.createElement('div');
        whitebox.setAttribute('class', 'whitebox');

        const ic1 = document.createElement('span');
        ic1.innerText = 'done';
        if (element.isComplete === false) {
            ic1.setAttribute('class', 'ic1F material-icons');
        } else {
            ic1.setAttribute('class', 'ic1T material-icons');
        }
        ic1.addEventListener('click', () => {
            if(element.isComplete === false) {
                ic1.setAttribute('class', 'ic1T material-icons');
                element.isComplete = true;
            } else {
                ic1.setAttribute('class', 'ic1F material-icons');
                element.isComplete = false;
            }
            
            createList();
        });
           
        const uniqNo = document.createElement('h2')
        uniqNo.setAttribute('class', 'uniqNo')
        uniqNo.innerHTML = element.uniqNo;
        

        const todoT = document.createElement('h2')
        todoT.setAttribute('class', 'todo');
        todoT.innerText = element.contents;

        const ic2 = document.createElement('span');
        ic2.innerHTML = 'delete';
        ic2.setAttribute('class', 'material-icons ic2');
        ic2.addEventListener('click', () => {
            for(let i = 0;i < arrDate.length; i++) {
                if(arrDate[i].uniqNo === element.uniqNo) {
                    arrDate.splice(i, 1);
                    history.go(0);
                }
            }
            createList();
        });

        whitebox.appendChild(ic1);
        whitebox.appendChild(uniqNo)
        whitebox.appendChild(todoT);
        whitebox.appendChild(ic2);
        
        if (element.isComplete === false) {
            idx2 = idx2 + 1;
        }
        

        p_1.innerText = '할 일이 ' + idx2 +'개 남았습니다.'; 
        ibox.appendChild(whitebox);

        enterText.value = ''; 
        enterText.focus;
    }
}

const create = () => { 
    const getText = enterText.value;  
    if (!getText) {return alert('내용을 입력해주세요.')} 
    let idx = 0;
    for (const element of arrDate) {
        if(arrDate.length > 0) {
            idx = element.uniqNo + 1;
        }
    }
    arrDate.push({uniqNo: idx, isComplete: false, contents: getText }); 

    createList();
}