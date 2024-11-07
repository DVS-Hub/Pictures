const modals = (state) => {
    let btnPressed = false;
    function bindModals(triggerSelector, modalSelector, closeSelector, destroy = false){
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = scrollWidth();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }

                btnPressed = true;

                if(destroy){
                    item.remove();
                }
                hideAllModals();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                const gift = document.querySelector('.fixed-gift');
                if (gift){
                    gift.style.marginRight = `${scroll}px`;
                }
            });
        })
        
        close.addEventListener('click', () => {
            hideAllModals();
            modal.style.display = 'none';
            document.body.style.marginRight = `0px`;
            document.body.style.overflow = '';
            const gift = document.querySelector('.fixed-gift');
            if (gift){
                gift.style.marginRight = '0px';
            }
        });
        
        document.addEventListener('click', (e) => {
            if(e.target === modal){
                hideAllModals();
                document.body.style.marginRight = `0px`;    
                const gift = document.querySelector('.fixed-gift');
                if (gift){
                    gift.style.marginRight = '0px';
                }
                document.body.style.overflow = '';
            }
        });
        function hideAllModals(){
            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn');
            });
        }
    }

    function showModalByTime(selector, time){
        setTimeout(() => {
            let display;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none'){
                    display = 'block';
                }
            });
            if(!display && !btnPressed){
                let scroll = scrollWidth();
                document.querySelector(selector).style.display = 'block';
                // document.body.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                const gift = document.querySelector('.fixed-gift');
                if (gift){
                    gift.style.marginRight = `${scroll}px`;
                }
            }
        },time);
    }

    function scrollWidth() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    function openByScroll(selector){
        window.addEventListener('scroll', () => {
            if(!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)){
                document.querySelector(selector).click();
            }
        })
    }


    bindModals('.button-design','.popup-design', '.popup-design .popup-close');
    bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');

    showModalByTime('.popup-consultation', 6000);

}

export default modals;