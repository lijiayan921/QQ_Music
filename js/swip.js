   // 歌单推荐轮播
      //  let w=750+'px'
      function swipe(ul,w,num){
      let index=0
      let startX=0
      let moveX=0
    ul.addEventListener('transitionend',()=>{
        if(index>=num){
            index=0;
            ul.style.transition='none';
            var translatex=-index*w;
            ul.style.transform=`translateX(${translatex}px)`;
        }
        else if(index<0){
           index=num-1;
           ul.style.transition='none';
            var translatex=-index*w;
            ul.style.transform=`translateX(${translatex}px)`;
        }
       });
      ul.addEventListener('touchstart',(e)=>{
        startX=e.targetTouches[0].pageX;
    });
    ul.addEventListener('touchmove',(e)=>{
        moveX=e.targetTouches[0].pageX-startX;
        let translatex=-index*w+moveX;
        ul.style.transition='none';
        ul.style.transform=`translateX(${translatex}px)`;
       
        e.preventDefault();
    });
    ul.addEventListener('touchend',()=>{
            if(Math.abs(moveX)>50){
            if(moveX>0){
                index--;
            }else{
                index++;
            }
            let translatex=-index*w;
            ul.style.transition='all .3s';
            ul.style.transform=`translateX(${translatex}px)`;
        }else{
            let translatex=-index*w;
            ul.style.transition='all .3s';
            ul.style.transform=`translateX(${translatex}px)`;
        }
    })
      }
      