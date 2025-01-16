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
    document.getElementById('noBtn').style.display = 'none';
    document.getElementById('message').innerHTML = '我爱你！❤️';
    
    // 创建心形和烟花效果
    setInterval(createHeart, 300);
    setInterval(createFirework, 500);
    
    // 添加背景音乐（白小白《我爱你不问归期》）
    const audio = new Audio('https://music.163.com/song/media/outer/url?id=1325896374.mp3');
    audio.volume = 0.5; // 设置音量为一半
    audio.play();
    
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

// 页面加载时自动播放背景音乐
window.onload = function() {
    const bgMusic = new Audio('https://music.163.com/song/media/outer/url?id=1325896374.mp3');
    bgMusic.loop = true; // 循环播放
    bgMusic.volume = 0.5; // 设置音量为一半
    
    // 添加点击事件监听器来开始播放音乐（因为大多数浏览器需要用户交互才能自动播放）
    document.addEventListener('click', function startMusic() {
        bgMusic.play();
        document.removeEventListener('click', startMusic);
    }, { once: true });
}
