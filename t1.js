// 在文件开头添加全局变量
let bgMusic = new Audio('./bgMusic.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;
let isMusicPlaying = false;

// 添加照片配置
const photos = [
    './photo/1.jpg',
    './photo/2.jpg',
    './photo/3.jpg'
];

let currentPhotoIndex = 0;

function changeBackground() {
    const imgContainer = document.getElementById('photoContainer');
    const currentPhoto = photos[currentPhotoIndex];
    
    // 添加图片加载错误处理
    const img = new Image();
    img.onload = function() {
        imgContainer.style.backgroundImage = `url(${currentPhoto})`;
    };
    img.onerror = function() {
        console.error(`图片加载失败: ${currentPhoto}`);
    };
    img.src = currentPhoto;
    
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
}

function moveButton(button) {
    // 随机移动"不愿意"按钮的位置
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.innerHTML = '❤️';
    heart.style.fontSize = (20 + Math.random() * 30) + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * window.innerWidth + 'px';
    firework.style.top = Math.random() * window.innerHeight + 'px';
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
    const animation = firework.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: `scale(${20 + Math.random() * 30}) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    document.body.appendChild(firework);
    animation.onfinish = () => firework.remove();
}

function accepted() {
    // 隐藏所有按钮
    const buttonContainer = document.querySelector('.button-container');
    if (buttonContainer) {
        buttonContainer.style.display = 'none';
    }
    
    document.getElementById('message').innerHTML = '我爱你！❤️';
    
    // 创建心形和烟花效果
    setInterval(createHeart, 300);
    setInterval(createFirework, 500);
    
    // 开始照片轮播
    setInterval(changeBackground, 3000);
    
    // 只有在音乐未播放时才开始播放
    if (!isMusicPlaying) {
        bgMusic.play();
        isMusicPlaying = true;
    }
    
    // 添加点击特效
    document.addEventListener('click', function(e) {
        createFirework();
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.innerHTML = '❤️';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    });
}

// 页面加载时的初始化
window.onload = function() {
    // 设置初始背景
    changeBackground();
    
    // 只在第一次点击时播放音乐
    document.addEventListener('click', function startMusic() {
        if (!isMusicPlaying) {
            bgMusic.play();
            isMusicPlaying = true;
        }
        document.removeEventListener('click', startMusic);
    }, { once: true });
}
