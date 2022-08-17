function onload(){
    var card = document.querySelector('.card');
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });
    for (let i = 0;i<16;i++){
        let number = document.querySelector('.card__face--number');
        let span = document.createElement('span');
        if (i%4===0 && i!==0){
            let tab =document.createElement('span')
            tab.className ='card__face--number--tab'
            number.appendChild(tab)
        }

        span.className = 'card__face--number--digit';
        span.textContent = '#'
        number.appendChild(span)

    }
    let mm = document.getElementById('MM')
    let yy = document.getElementById('YY')
    for (let i=1;i<13;i++){
        let s = String(i)
        if (s.length ===1){
            s = '0'.concat(s)
        }
        let option = document.createElement('option')
        option.text = s;
        option.value = i;
        mm.appendChild(option)
    }
    for (let i=2022;i<2035;i++){
        let option = document.createElement('option')
        option.text = i;
        option.value = i;
        yy.appendChild(option)
    }

}


let inputNumber = document.getElementsByClassName('inputs__number')[0]

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
inputNumber.oninput =  function (e) {
    if (position ==='back'){
        document.getElementsByClassName('card__face--front')[0].click()
        position = 'front'
    }
    if (e.data) {
        inputNumber.value = inputNumber.value.replace(/[^0-9]/g,'')
        inputNumber.value = inputNumber.value.replace(/\s\d/g, '')
        let newstr = ''
        for (let i = 0; i < inputNumber.value.length; i++) {
            newstr = newstr.concat(inputNumber.value[i])
            if (i % 4 === 3 && i !== 15)
                newstr = newstr.concat(' ')
        }
        inputNumber.value = newstr
    }
    let number = inputNumber.value.replace(/\s/g,'')
    number = number.concat(' '.repeat(16-number.length))
    for (let i=0;i<number.length;i++){
        let numberArea = document.querySelectorAll(".card__face--number--digit");
        if (number[i] == ' '){
            numberArea[i].textContent = '#';
        }
        else {

            if (numberArea[i].textContent!==number[i]) {
                numberArea[i].className = 'card__face--number--digit'
                numberArea[i].textContent = number[i]
            }
        }

    }
    if (inputNumber.value =='4'){
        document.querySelector('.company').className = document.querySelector('.company').className.replace(/\s[a-z]+/,' visa')
    }
    if (inputNumber.value =='3'){
        document.querySelector('.company').className = document.querySelector('.company').className.replace(/\s[a-z]+/,' mastercard')

    }

}

document.getElementsByClassName('inputs__holder')[0].oninput = function (e){
    this.value = this.value.toUpperCase()
    if (position ==='back'){
        document.getElementsByClassName('card__face--front')[0].click()
        position = 'front'}
    let value = document.getElementsByClassName('inputs__holder')[0].value;
    document.getElementsByClassName('card__face--name')[0].innerText = value;



}
document.querySelector('.card__face--front').onclick = function (){
    position = 'back'

}
document.querySelector('.card__face--back').onclick = function (){
    position = 'front'

}
document.getElementById('MM').addEventListener('change',function (e){
    let date = document.querySelector('.card__face--date');
    let content = date.textContent;
    date.textContent = content.replace(/(MM\/|\d+\/)/,this.value.concat('/'))
})
document.getElementById('YY').addEventListener('change',function (e){
    let date = document.querySelector('.card__face--date');
    let content = date.textContent;
    date.textContent = content.replace(/(\/YY|\/\d+)/,'/'.concat(this.value))
})
document.getElementsByClassName('inputs__cvv')[0].oninput =function(e){
    e.target.value = e.target.value.replace(/[^0-9]/g,'')
    if (position ==='front'){
        document.getElementsByClassName('card__face--front')[0].click()
        position = 'back'
    }
    document.querySelector('.card__face--back--cvv').innerText = document.getElementsByClassName('inputs__cvv')[0].value


}
let position = 'front'
onload()