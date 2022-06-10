// import './js/search'
import { swipe } from './js/swip'
import './css/base.less'
import './css/index.less'
import './css/normalize.css'
import './css/search.less'
import './css/iconfont.css'
window.addEventListener('load',async function(){
  let paylist_list=document.querySelector('.paylist_list');
  let slide_list=this.document.querySelector('.slide_list')
   let wonder_list_ul=document.querySelector('.wonder_list')
      // 头部tab切换
      let top_nav=document.querySelector('.top_nav');
      let lis=top_nav.querySelectorAll('li');
      for(let i=0;i<lis.length;i++){
          lis[i].onclick=function(){
              for(let i=0;i<lis.length;i++){
                  lis[i].className='top_nav_item';
              }
              this.classList.add("top_current","top_nav_item");
      }
  }
       // nav部分tab切换
       let nav_ul=document.querySelector('.nav_ul');
       let nav_lis= nav_ul.querySelectorAll('li');
       for(let i=0;i<nav_lis.length;i++){
        nav_lis[i].onclick=function(){
               for(let i=0;i<nav_lis.length;i++){
                nav_lis[i].className='';
               }
               this.classList.add("nav_current");
       }
   } 
   //歌单tab切换
   let paylist_recom=document.querySelector('.tabs');
   let recom_lis=paylist_recom.querySelectorAll('li');
   let play_cont=this.document.querySelector('.play_cont')
   let paylists=play_cont.querySelectorAll('.paylist');
   console.log(paylists);
   for(let i=0;i<recom_lis.length;i++){
    recom_lis[i].setAttribute('index',i);
    recom_lis[i].onclick=function(){
           for(let i=0;i<recom_lis.length;i++){
            recom_lis[i].className='';
           }
           this.className='current';
       
   let index = this.getAttribute('index');
   for(let i=0;i<paylists.length;i++){
    paylists[i].style.display='none';
   }
   paylists[index].style.display='block';
   }
}
//热门搜索
   const hot_lists=await fetch(` http://localhost:3300/search/hot`)
    const hot_lists_data=await hot_lists.json();
    console.log(hot_lists_data.data.slice(0,5));
    let hot_arr=hot_lists_data.data.slice(0,5)
//    点击搜索框div滑入
const search_ipt=this.document.querySelector('.search_ipt_input')
const sea_hot=this.document.querySelector('.sea_hot')
const hot=this.document.querySelector('.hot')
const search_ipt_btn=this.document.querySelector('.search_ipt_btn')
const sea_history=this.document.querySelector('.sea_history')
const history_list=this.document.querySelector('.history_list') 
search_ipt.addEventListener('focus', function(){
    sea_hot.style.opacity = 1;
    sea_hot.style.transition = 1 + "s";
    const hot_data=hot_arr.map((item,index)=>{
        return `<li>
        <span>${index+1}</span>
        <span>${item.k}</span>
        <span>${(item.n / 10000).toFixed(1) + '万'}</span>
    </li>`
    })
    hot_data.innerHTML= hot_data.join('')
    hot.innerHTML= hot_data.innerHTML 
    if(localStorage.hasOwnProperty('history_search')){
         const history_search=localStorage.getItem('history_search').split(',')
    console.log(history_search);
    const history_item =history_search.map(item=>{
        return`<li class="history_item">${item}</li>`
    })
    history_item.innerHTML= history_item.join('')
    history_list.innerHTML= history_item.innerHTML 
    }
    // 点击删除，清除历史搜索
    const delete_history=document.querySelector('.delete')
    delete_history.addEventListener('click',function(){
       
        localStorage.removeItem('history_search')
        history_list.innerHTML=''
    })
})
search_ipt.addEventListener('blur', function () {
    sea_hot.style.opacity = 0;
})
let historyArr
// 点击搜索按钮后存储搜索内容
search_ipt_btn.addEventListener('click',function(){
    let search_data=search_ipt.value
    console.log(search_data);
    if(localStorage.hasOwnProperty('history_search')){
    const history_search=localStorage.getItem('history_search').split(',')
    historyArr=history_search
}else{
    historyArr=[]
}
    historyArr.unshift(search_data)
    console.log(historyArr);
    localStorage.setItem('history_search',historyArr)
    // window.location.href="../search.html"; 
})
        try {
            // 获取为你推荐歌单
        const paylist_recom=await fetch(`http://124.221.249.219:8000/api/recommendations`,{
           
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }) 
        const paylist_recom_data=await paylist_recom.json()
        console.log(paylist_recom_data);
        const paylist_daren=paylist_recom_data.tatsujin
        const paylist_offical=paylist_recom_data.offical
        const paylist_column=paylist_recom_data.column
        //达人专区歌单
        let daren_item=paylist_daren.map(item=>{
         
          return `  <li class="paylist_item">
          <div class="item_box">
              <div class="paylist_cover">
                  <img src=${item.cover} alt="">
              </div>
              <p class="paylist_title">${item.title}</p>
              <div class="paylist_other">播放量：32.4万</div>
          </div>
      </li>`
        })  
        daren_item.innerHTML= daren_item.join('')
        paylist_list.innerHTML= daren_item.innerHTML 
     //官方歌单
     let offical_item=paylist_offical.map(item=>{
         
        return `  <li class="paylist_item">
        <div class="item_box">
            <div class="paylist_cover">
                <img src=${item.cover} alt="">
            </div>
            <p class="paylist_title">${item.title}</p>
            <div class="paylist_other">播放量：468.2万</div>
        </div>
    </li>`
      }) 
      let offical_list=this.document.querySelector('.offical_list')
      offical_item.innerHTML= offical_item.join('')
        offical_list.innerHTML= offical_item.innerHTML 
       //专区歌单
       let column_item=paylist_column.map(item=>{   
        return `  <li class="paylist_item">
        <div class="item_box">
            <div class="paylist_cover">
                <img src=${item.background} alt="">
            </div>
            <p class="paylist_title">${item.title}</p>
            <div class="paylist_other">${item.description}</div>
        </div>
    </li>`
      }) 
    let column=this.document.querySelector('.column')
    column_item.innerHTML= column_item.join('')
    column.innerHTML= column_item.innerHTML 
        // 获取新歌推荐  
        const new_song=await fetch(` http://localhost:3300/new/songs?type=${0}`)
        const new_song_data=await new_song.json()
        console.log(new_song_data.data.list);
        let newsongArr=new_song_data.data.list
        var result = [];
for(var i=0;i<newsongArr.length;i+=9){
    result.push(newsongArr.slice(i,i+9));
}
console.log(result);  

for(let i=0;i<result.length;i++){
        //添加 div
let newsongs = document.createElement("ul");
newsongs.setAttribute("class", "newsong_list");
slide_list.appendChild(newsongs);
}
  let newuls=document.querySelectorAll('.newsong_list')
      for(let i=0;i<newuls.length;i++){
          let newsong_list=result[i].map(item=>{
              return `<li class="newsong_item">
              <div class="item_box">
                  <a href="" class="mod_cover">
                      <img src="http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${item.album.id}_0.jpg" alt="">
                  </a>
                  <div class="mod_cont">
                      <p class="mod_cont_tit">${item.name}</p>
                      <p class="mod_cont_singer">${item.singer[0].name}</p>
                  </div>
                  <div class="mod_time"></div>
              </div>
           </li> `
          })
          newsong_list.innerHTML= newsong_list.join('')
          newuls[i].innerHTML=newsong_list.innerHTML
      }  
      // 获取新歌轮播
        let mod_list=this.document.querySelector('.mod_list')
        let w1=mod_list.offsetWidth;
        let num1=newuls.length
        swipe(slide_list,w1,num1);
        // 获取精彩推荐
        const wonder_recom=await fetch(` http://localhost:3300/recommend/banner`)
        const wonder_recom_data=await wonder_recom.json()
        console.log(wonder_recom_data);
        const wonder_list=wonder_recom_data.data.map(item=>{
            return `
            <li class="wonder_item">
            <img src="${item.picUrl}" alt="">
        </li>
            `
        })
        wonder_list.innerHTML= wonder_list.join('')
        wonder_list_ul.innerHTML= wonder_list.innerHTML  
        // 获取排行榜信息
        const ranking=await fetch(` http://localhost:3300/top/category?showDetail=1`)
        const ranking_data=await ranking.json()
        const ranking_arr=ranking_data.data[0].list.slice(0,4)
        let ranking_item=document.querySelectorAll('.ranking_item')
        console.log(ranking_item.length);
        console.log(ranking_arr);
        let ranking_songs=document.querySelectorAll('.ranking_songs')
        for(let i=0;i<ranking_item.length;i++){
             const rankings=ranking_arr[i].song.map(item=>{
            return`
            <li class="rank_item">
                    <div class="rank_number">${item.rank}</div>
                    <div class="song_name">${item.title}</div>
                    <div class="song_singer">${item.singerName}</div>
            </li>
            ` 
        })
        rankings.innerHTML=rankings.join('')
        ranking_songs[i].innerHTML= rankings.innerHTML 
        }
        } catch (error) {
            console.log(error);
        }
        // // 歌单推荐轮播
         let paylist=this.document.querySelector('.paylist') 
         let paylist_items=paylist_list.querySelectorAll('li')
         let w_li=paylist_items[0].offsetWidth
        let w=paylist.offsetWidth;
        let num=Math.ceil((w_li*paylist_items.length)/w)
        swipe(paylist_list,w,num);
        // 精彩推荐轮播图
        let event_list=document.querySelector('.event_list')
        let wonder_item=wonder_list_ul.querySelectorAll('li')
        let w2_li=wonder_item[0].offsetWidth
        let w2=event_list.offsetWidth;
        let num2=Math.ceil((w2_li* wonder_item.length)/w2)
        console.log(num2);
        swipe(wonder_list_ul,w2,num2);
})