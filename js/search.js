window.addEventListener("load",async function () {
  // 获取input框
  let ipt = this.document.querySelector(".sea_ipt");
  let default_box = this.document.querySelector(".default");
  let song_ul = this.document.querySelector(".song_ul");
  let singer_ul = this.document.querySelector(".singer_ul");
  let album_ul = this.document.querySelector(".album_ul");
  let mv_ul = this.document.querySelector(".mv_ul");
  let mod_sea=this.document.querySelector('.mod_sea')
  let search_ipt_btn=mod_sea.querySelector('.search_ipt_btn ')
  console.log(search_ipt_btn);
  let search_arr=this.localStorage.getItem('history_search').split(',')
  ipt.value=search_arr[0]
  let list_cont=document.querySelector('.list_cont')
  // let search=localStorage.getItem('search')
  const search_con = await fetch(
  `http://124.221.249.219:8000/api/search?keyword=${ipt.value}`
);
const search_data = await search_con.json();
console.log(search_data);
const data= search_data.map(item=>{
    return `
    <li>
        <div>${item.title}</div>
         <div>${item.artist}</div>    
    </li>
    `
})
data.innerHTML=  data.join('')
list_cont.innerHTML=  data.innerHTML  
  ipt.addEventListener("focus", function () {
    default_box.style.opacity = 1;
    default_box.style.transition = 1 + "s";
    ipt.addEventListener("keyup", async function (e) {
      if (e.keyCode == 13) {
        const search = await fetch(
          `http://localhost:3300/search/quick?key=${ipt.value}`
        );
        const search_data = await search.json();
        console.log(search_data.data);
        let album_arr = search_data.data.album.itemlist;
        let singer_arr = search_data.data.singer.itemlist;
        let mv_arr = search_data.data.mv.itemlist;
        let song_arr = search_data.data.song.itemlist;
        const albums = album_arr.map((item) => {
          return `    <li>
                    <span>${item.name}</span>
                    <span>--${item.singer}</span>
                </li>`;
        });
        albums.innerHTML= albums.join('')
        album_ul.innerHTML= albums.innerHTML  
        const singers = singer_arr.map((item) => {
          return `    <li>
                <span>${item.name}</span>
            </li>`;
        });
        singers.innerHTML= singers.join('')
        singer_ul.innerHTML= singers.innerHTML  
        const mvs = mv_arr.map((item) => {
          return `    <li>
            <span>${item.name}</span>
            <span>--${item.singer}</span>
        </li>`;
        });
        mvs.innerHTML= mvs.join('')
        mv_ul.innerHTML= mvs.innerHTML  
        const songs = song_arr.map((item) => {
          return `    <li>
        <span>${item.name}</span>
        <span>--${item.singer}</span>
    </li>`;
        });
        songs.innerHTML= songs.join('')
        song_ul.innerHTML= songs.innerHTML  
      }
    });
  });
  ipt.addEventListener('blur', function () {
      default_box.style.opacity = 0;
  })
  search_ipt_btn.addEventListener('click',async function(){
    //  localStorage.setItem('search',ipt.value)
     const search_con = await fetch(
      `http://124.221.249.219:8000/api/search?keyword=${ipt.value}`
    );
    const search_data = await search_con.json();
    console.log(search_data);
    const data= search_data.map(item=>{
        return `
        <li>
            <div>${item.title}</div>
             <div>${item.artist}</div>    
        </li>
        `
    })
    data.innerHTML=  data.join('')
    list_cont.innerHTML=  data.innerHTML  
  })
});
