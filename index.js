const btn = document.getElementsByClassName('noti-btn0')[0];
const btn1 = document.getElementsByClassName('noti-btn1')[0];
let audio = null;
let ikun = null;
const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;
let ikunw = null, ikunh = null;
const level = parseInt(Math.max(w, h)) / 10;
let curlev = 0, newlev = 0;
var bg = null;
var playPromise = null;
btn.addEventListener('click', (e) => {
  bg = document.createElement('div');
  bg.classList.add('bg');
  document.body.append(bg);
  document.getElementById('noti').style = "display:none";
  document.getElementById('sednoti').style = "display:none";
  generateObj();
  try {
    audio = document.createElement('audio');
  } catch {
    return null;
  }
  // 初始化播放
  newlev = Math.ceil(Math.sqrt(Math.pow(e.clientX - ikunw, 2) + Math.pow(e.clientY - ikunh, 2)) / level);
  audio.src = "./mp3/" + (10-newlev>0?10-newlev:1) + ".mp3";
  audio.playbackRate = 1.2;
  audio.play();
  // 修改鼠标样式
  document.addEventListener('mousemove', getCursor);
  audio.addEventListener('ended', handlePlay, false)
})
btn1.addEventListener('click', (e) => {
  console.log('enter')
  bg = document.createElement('div');
  bg.classList.add('bg');
  document.body.append(bg);
  document.getElementById('noti').style = "display:none";
  document.getElementById('sednoti').style = "display:none";
  generateObj();
  // try {
  //   audio = document.createElement('audio');
  // } catch {
  //   return null;
  // }
  // 初始化播放
  newlev = Math.ceil(Math.sqrt(Math.pow(e.clientX - ikunw, 2) + Math.pow(e.clientY - ikunh, 2)) / level);
  audio.src = "./mp3/" + (10-newlev>0?10-newlev:1) + ".mp3";
  audio.playbackRate = 1.2;
  audio.play();
  // 修改鼠标样式
  document.addEventListener('mousemove', getCursor);
  audio.addEventListener('ended', handlePlay, false)
})

function generateObj() {
  ikunw = parseInt(Math.random()*(w-80))+40;
  ikunh = parseInt(Math.random()*(h-80))+40;
  // 监听点击事件
  document.addEventListener('click', handleClick)
}

function getCursor(e) {
  if (Math.abs(e.clientX-ikunw) <= 40 && Math.abs(e.clientY-ikunh) <= 40) {
    bg.style = "cursor:pointer";
  } else {
    bg.style = "cursor:normal";
  }
  let res = Math.ceil(Math.sqrt(Math.pow(e.clientX - ikunw, 2) + Math.pow(e.clientY - ikunh, 2)) / level);
  if (newlev !== res) {
    newlev = res;
  }
}

function handlePlay() {
  if (curlev !== newlev) {
    audio.src = './mp3/' + (10-newlev>0?10-newlev:1) + '.mp3';
    curlev = newlev;
  }
  audio.playbackRate = 1.2;
  audio.play();
}

function handleClick(e) {
  if (Math.abs(e.clientX-ikunw) <= 40 && Math.abs(e.clientY-ikunh) <= 40) {
    document.removeEventListener('click', handleClick);
    audio.removeEventListener('ended', handlePlay)
    document.removeEventListener('mousemove', getCursor)
    if (playPromise !== null) {
      playPromise.then(_ => {
        audio.pause();
      }).catch(err => {
        console.log('err')
      })
    }
    let nikun = document.createElement('div');
    nikun.id = "ikun";
    nikun.style = "top:"+ikunh+"px;left:"+ikunw+"px";
    document.body.append(nikun)
    nikun.classList.add('addanim')
    setTimeout(() => {
      audio.src = './mp3/ikun.mp3';
      audio.load();
      audio.play();
      setTimeout(() => {
        document.getElementById('ikun').remove();
        document.getElementsByClassName('bg')[0].remove();
        // document.getElementById('noti').style = 'display:normal'
        // document.getElementsByClassName('noti-title')[0].innerHTML = "谢谢你，虚鲲蔡蔡子";
        document.getElementById('sednoti').style = "display:block";
      }, 4000)
    }, 500)
  }
}

document.getElementById('myblog').addEventListener('click', () => {
  window.open("https://whom.fun");
})