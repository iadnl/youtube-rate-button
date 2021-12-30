// ==UserScript==
// @name         youtube button rate
// @namespace    youtube
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://www.youtube.com*
// @grant        none
// ==/UserScript==

var allowsetval=false;
var rate = document.createElement('div'); //Создание общего контейнера
rate.className = 'button-rate';
rate.innerHTML = '<div class="button-rate-a"><span>1</span><span>1.5</span><span>2</span><span>2.5</span><span>3.0</span></div><div class="button-rate-b"><span class="rate-plus-minus">-0.1</span><span id="rate-now">1</span><span class="rate-plus-minus">+0.1</span></div>';
var rate_styles = document.createElement('style'); //Создание контейнера стилей
rate_styles.innerHTML = '.button-rate{ top:20px; z-index: 99999;right:0;position:fixed;width:59px;margin: 30px;height: 100px;user-select: none;} .button-rate span:hover{background-color: #3F3F3F;} .button-rate-b{margin-top:5px;}  .button-rate > div {display: inline-block; width: 60px;} .button-rate span{width: 100%;float: left;display: block;background-color: #2C2C2C;text-align: center;padding: 6px 0px;cursor:pointer; font-size: 11px; color:#ccc;}';
document.body.append(rate_styles);// Добавление в конец body
document.body.append(rate);// Добавление в конец body
// обработка клика по элементам со статичными значениями
rate.querySelectorAll('.button-rate-a span').forEach(function(e){
    e.onclick = function(e2) {
        rate.querySelector('#rate-now').innerHTML = e.innerHTML;
    };
});
// обработка клика по элементу увеличения и уменьшения значения
rate.querySelectorAll('.rate-plus-minus').forEach(function(e){
    e.onclick = function(e2) {
        rate.querySelector('#rate-now').innerHTML = Number(Number(e.innerHTML)+Number(rate.querySelector('#rate-now').innerHTML)).toFixed(1);
    };
});
if ((localStorage.getItem('musicrate')!==undefined) && (localStorage.getItem('musicrate')!==null)) {
    rate.querySelector('#rate-now').innerHTML = String(localStorage.getItem('musicrate'));//Восстановление значения из localstorage
} else localStorage.setItem('musicrate', 1);
allowsetval=true;
setInterval(function(){//Проверка через каждые 0,1 сек.
    if(allowsetval===true){
        try{
            if(Number(document.querySelector('video').playbackRate) != Number(rate.querySelector('#rate-now').innerHTML)){//Если скорость в аудиоплеере не совпадает со скоростью ползунка
                document.querySelector('video').playbackRate = rate.querySelector('#rate-now').innerHTML;//Присвоить новую скорость
                localStorage.setItem('musicrate', rate.querySelector('#rate-now').innerHTML);//Сохранить новую скорость в localstorage
            }
        }catch(e){}
    }
},100);