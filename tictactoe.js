// Tictactoe 게임

let turn = 'X';
let myeotjul;
let myeotkan;
let win;


//결과 체크 함수
function test() {
    //세 칸 다 채워졌나?
    win = false;
    // 가로줄 검사
    if (
        cols[myeotjul][0].textContent === turn &&
        cols[myeotjul][1].textContent === turn &&
        cols[myeotjul][2].textContent === turn
    ) {
        win = true;
    }

    //세로줄 검사
    if (
        cols[0][myeotkan].textContent === turn &&
        cols[1][myeotkan].textContent === turn &&
        cols[2][myeotkan].textContent === turn
    ) {
        win = true;
    }

    //대각선 검사
    if (
        cols[0][0].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][2].textContent === turn
    ) {
        win = true;
    }

    if (
        cols[0][2].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][0].textContent === turn
    ) {
        win = true;
    }
}

function init(tie) { //초기화 함수
    if (tie) {
        result.textContent = '무승부';
        setTimeout(function() {
            cols.forEach(function (row) {
                row.forEach(function (col) {
                    col.textContent = '';
                    col.style.background = '#ffffff';
                });
            });
            result.textContent = '';
            turn = 'X';
            }, 2000);
    } else {
        result.textContent = turn + '의 승리!';
   
    win = false;
    setTimeout(function() {
        cols.forEach(function (row) {
            row.forEach(function (col) {
                col.textContent = '';
                col.style.background = '#ffffff';
            });
        });
        result.textContent = '';
        turn = 'X';
        }, 2000);
    }
}

//비동기 콜백
let callback = function(e) { //칸을 클릭했을 때
    e.preventDefault();
    if (turn === 'O') {
        return;
    }
    if (e.target.textContent === '') {
        e.target.textContent = turn;
        if (e.target.textContent === 'X') {
            e.target.style.background = '#F09489';
        }
        myeotjul = rows.indexOf(e.target.parentNode);
        myeotkan = cols[myeotjul].indexOf(e.target);

        //승리 여부 체크
        test();

        //모든 칸이 다 찼는가?
        let huboKan = [];
        cols.forEach(function (row) {
            row.forEach(function (col) {
                huboKan.push(col);
            });
        });

        huboKan = huboKan.filter(function (col) {
            return !col.textContent
        });

        if (win) { // 이겼을 경우
            init();
        } else if (huboKan.length === 0) { //칸을 더 이상 선택할 수 없음
            init(true);
        } else { // 칸이 다 안찼으면
            if (turn === 'X') {
                turn = 'O';
            }
            
            setTimeout(function() {
                // 빈 칸 중 하나를 고른다.
                let choice = huboKan[Math.floor(Math.random() * huboKan.length)];
                choice.textContent = turn;
                choice.style.background = "#9BF0B6";
                //컴퓨터 승리 체크
                myeotjul = rows.indexOf(choice.parentNode);
                myeotkan = cols[myeotjul].indexOf(choice);
                // let winOx = test(myeotjul, myeotkan);
                test();
                //다 찼으면
                if (win) { // 컴퓨터가 이겼을 경우
                    init();
                }
                turn = 'X';
            }, 1000);
        }

    } else {
        // 빈 칸이 아닐 경우 아무것도 실행 x
    }   
};

//틱택토 칸 만들기
let body = document.body;
let container = document.querySelector('#container');
let table = document.createElement('table');
let result = document.createElement('div');

let rows = []; //줄들
let cols = []; // 칸들

let wrap = document.createElement('div');
wrap.classList.add('wrap');

for (let i = 0; i < 3; i ++) {
    let row = document.createElement('tr');
    rows.push(row);
    cols.push([]);

    for (let j = 0; j < 3; j ++) {
        let col = document.createElement('td');
        cols[i].push(col);
        row.appendChild(col);
        col.addEventListener('click', callback);
    }
    table.appendChild(row);
}

wrap.append(table);
container.append(wrap);

result.classList.add('result');
wrap.append(result);