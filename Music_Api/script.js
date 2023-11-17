const music_containerEl = document.getElementById('music-container');
const progree_containerEl = document.getElementById('progree-container');
const progressEl = document.getElementById('progress');
const coverEl = document.getElementById('cover');
const audioEl = document.getElementById('audio');

const prevBtnEl = document.getElementById('prev');
const playBtnEl = document.getElementById('play');
const nextBtnEl = document.getElementById('next');
const titleEl = document.getElementById('title');

const song = ["Contra","HavestMoon","Mario"];
let index = 1;



function loadSongs(song){
    titleEl.innerText=`เพลง  ${song} .mp3`
    coverEl.src=`cover/${song}.jpg`;
    audioEl.src=`music/${song}.mp3`;
    
}

loadSongs(song[index]);

prevBtnEl.addEventListener('click',()=>{
    index--;
    if(index<0){
        index=song.length-1;
    }
    loadSongs(song[index]);
    playSong();
});

nextBtnEl.addEventListener('click',()=>{
    index++;
    if(index>song.length-1){
        index=0;
    }
    loadSongs(song[index]);
    playSong();
});

playBtnEl.addEventListener('click',()=>{
    const isPlay = music_containerEl.classList.contains('play'); //เช็คว่าเพลงเล่นอยู่หรือป่าว โดยการ ดูที่ clss ใน music_containerEl ว่ามี class play หรือป่าว 
    if(isPlay){
        pauseSong(); //ถ้ากดเข้ามาในปุ่ม playBtnEl ถ้าเล่นอยู่ ให้หยุด

    }else{
        playSong(); //ไม่ได้เล่นเพลง ให้เปิด
    }
});

function playSong(){
    music_containerEl.classList.add('play');
    playBtnEl.querySelector('i.fas').classList.remove('fa-play');
    playBtnEl.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    music_containerEl.classList.remove('play');
    playBtnEl.querySelector('i.fas').classList.remove('fa-pause');
    playBtnEl.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}
audioEl.addEventListener('timeupdate',updateProgress);

function updateProgress(e){
    const {duration,currentTime}= e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progressEl.style.width=`${progressPercent}%`
}

progree_containerEl.addEventListener('click',setProcess);

function setProcess(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;
    audio.currentTime=(clickX/width)*duration;
}

function nextSong(){
    index++;
    if(index>song.length-1){
        index=0;
    }
    loadSongs(song[index]);
    playSong();
}

audioEl.addEventListener('ended',nextSong);