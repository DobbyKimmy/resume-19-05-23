!function () {

    // 让about在刚打开页面的时候就出现upSlide效果
    window.setTimeout(f,1500);

    // upSlide
    let specials = document.querySelectorAll('[special]');
    for(let i=0;i<specials.length;i++){
        specials[i].classList.add('upSlide');
    }

    window.addEventListener('scroll',f);


    function f() {
        let minIndex = 0
        for(let i=1;i<specials.length;i++){
            if(Math.abs(specials[minIndex].offsetTop-window.scrollY)>Math.abs(specials[i].offsetTop-window.scrollY)){
                minIndex = i;
            }
        }
        // specials[minIndex]为当前屏幕"最近的元素"
        specials[minIndex].classList.remove('upSlide');
        let aTag = document.querySelector('a[href="#'+specials[minIndex].id+'"]');
        let liTags = aTag.parentNode.parentNode.children;
        for(let i=0;i<liTags.length;i++){
            liTags[i].classList.remove('highlight');
        }
        aTag.parentNode.classList.add('highlight');
    }
}.call()