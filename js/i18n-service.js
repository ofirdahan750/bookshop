'use strict'

function setLang(lang) {
    gCurrLang = lang;
}

var gTrans = {
    title: {
        en: 'Ofir Book Shop',
        he: 'חנות הספרים של אופיר'
    },
    'drop-down-list': {
        en: 'language preferences:',
        he: 'אנא בחר שפה'
    }
}
var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}