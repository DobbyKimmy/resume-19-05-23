!function () {
    var view = document.querySelector('nav');
    var controller = {
        view:null,
        init:function (view) {
            this.view = view;
            this.liTagsMouseEvents();
            this.scrollToElement();
        },
        liTagsMouseEvents:function(){
            let liTags = this.view.querySelectorAll('ul>li');
            for(let i=0;i<liTags.length;i++){
                liTags[i].onmouseenter = function (mouseEnter) {
                    let li = mouseEnter.currentTarget
                    li.classList.add('active');
                }
                liTags[i].onmouseleave = function (mouseLeave) {
                    let li = mouseLeave.currentTarget;
                    li.classList.remove('active');
                }
            }
        },
        scrollToElement:function(){
            let aTags = this.view.querySelectorAll('ul>li>a');
            for(let i=0;i<aTags.length;i++){
                aTags[i].onclick = function (click) {
                    click.preventDefault();
                    let a = click.currentTarget
                    let href = a.getAttribute('href');
                    if(href!=='#'){
                        let element = document.querySelector(href);

                        let currentPostion = window.scrollY;
                        let targetPosition = element.offsetTop-80;
                        // 假设移动1px,需要3ms
                        let t = Math.abs(targetPosition-currentPostion)*3;
                        if(t>700){t=700}
                        // tween js
                        function animate(time) {
                            requestAnimationFrame(animate);
                            TWEEN.update(time);
                        }
                        requestAnimationFrame(animate);

                        var coords = { y: currentPostion };
                        var tween = new TWEEN.Tween(coords)
                            .to({ y: targetPosition }, t)
                            .easing(TWEEN.Easing.Back.InOut)
                            .onUpdate(function() {
                                window.scrollTo(0,coords.y)
                            })
                            .start();
                    }
                }
            }
        }
    }
    controller.init(view);
}.call()