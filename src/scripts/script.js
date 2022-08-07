

// выпадашка в шапке
let headerButton = document.querySelector('.header__prod-button');
let headerHiddenBlock = document.querySelector('.additional-info__hidden-section');
headerButton.addEventListener('click',function(){
    this.classList.toggle('header__prod-button_active');
    headerHiddenBlock.classList.toggle('additional-info__hidden-section_visible');
});
// закрытие выпадашки вшапке при клике мимо
let div = document.querySelector('.header__additional-info')
document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(div);
	if (! withinBoundaries  ) {
		headerHiddenBlock.classList.remove('additional-info__hidden-section_visible');
        headerButton.classList.remove('header__prod-button_active');
	}
});

// мобильное меню
let headerMenuButton = document.querySelector('.header__mobile-menu');
let headerMenu = document.querySelector('.header__info')
headerMenuButton.addEventListener('click',function(){
    this.classList.toggle('header__mobile-menu_active');
    headerMenu.classList.toggle('header__info_visible');
});

new Swiper ('.swiper',{
    navigation:{
        nextEl: '.hero__arrow-next',
        prevEl: '.hero__arrow-prev',
    },
    pagination: {
        el: '.hero__pagination',
        type: 'bullets',
        clickable: true
    },
});

// Обратный звонок
let headerCallBack = document.querySelector('.header__callback_dextop');
let headerCallBackMob = document.querySelector('.header__callback_mobile');
let callBackBlock = document.querySelector('.call-back__wrapper');
let callBackClose = document.querySelector('.call-back__close');
let callBackTabableElemtnts = document.querySelector('.call-back__container')
let callBackCondition = true;
function openCallBack(){
    callBackBlock.classList.add('call-back__wrapper_visible');
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollWidth + "px"
    callBackCondition = false;
    tabableElements(callBackTabableElemtnts)
}
function closeCallBack(){
    callBackBlock.classList.remove('call-back__wrapper_visible');
    document.body.removeAttribute("style")
    callBackCondition = true;
}
headerCallBack.addEventListener('click',function(){
    if(callBackCondition){
        openCallBack()
    }else{
        closeCallBack()
    }

});
headerCallBackMob.addEventListener('click',function(){
    if(callBackCondition){
        openCallBack()
    }else{
        closeCallBack()
    }

});
callBackClose.addEventListener('click',function(){
    closeCallBack()
});

// Валидация формы
let callbackForm = document.querySelector('.call-back__form'),
    callBackInputs = document.querySelectorAll('.call-back__input'),
    callBackName =document.querySelector('.call-back__name'),
    callBackTel =document.querySelector('.call-back__tel'),
    callBackCheckbox =document.querySelector('.call-back__checkbox'),
    callBackConfirmLabel = document.querySelector('.confirm__label');
    
function validateTel(phone){
    let re = /^[0-9\s]*$/;
    return re.test(String(phone))
}

callbackForm.onsubmit = function(){
    // event.preventDefault();
    let telVal = callBackTel.value,
        emptyInputs = Array.from(callBackInputs).filter(input=> input.valuse === '');
        
        callBackInputs.forEach(function(input){
                if(input.value ===''){
                    input.classList.add('error');
                    console.log('поле пустое')
                }else{
                    input.classList.remove('error')
                }
        })

        if (callBackCheckbox.checked){
            callBackConfirmLabel.classList.remove('error')
        }else{
            console.log('not checked')
            callBackConfirmLabel.classList.add('error')
            return false
        }
        if(emptyInputs.length !== 0){
            console.log('some input is  empty');
            return false
        }
        if(!validateTel(telVal)){
            callBackTel.classList.add('error');
            return false;
        }else{
            callBackTel.classList.remove('error');
            
        }


        if (callbackErors.length !== 0){
            console.log(callbackErors)
            return false
        }



}

