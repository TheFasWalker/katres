// вычисление ширины полосы прокрутки
let divAdditional = document.createElement('div');
divAdditional.style.overflowY = 'scroll';
divAdditional.style.width = '50px';
divAdditional.style.height = '50px';
document.body.append(divAdditional);
let scrollWidth = divAdditional.offsetWidth - divAdditional.clientWidth;
divAdditional.remove();
// Ловушка фокуса
function tabableElements(modal) {
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    var focusableElements = modal.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);
    var firstTabStop = focusableElements[0];
    var lastTabStop = focusableElements[focusableElements.length-1];
    focusableElements[0].focus();
    modal.addEventListener('keydown', function (e) {
        if (e.keyCode === 9) {
            if (e.shiftKey) {
                if (document.activeElement === firstTabStop) {
                    e.preventDefault();
                    lastTabStop.focus();
                }
            } else {
                if (document.activeElement === lastTabStop) {
                    e.preventDefault();
                    firstTabStop.focus();
                }
            }
        }
    })
};