/*
var currentTime = new Date().getHours();
console.log('Current time in hours: '+currentTime)
if (true) {
    console.log('time script activated')
    if (7 <= currentTime && currentTime < 13) {
        console.log('Day')
        var image = document.getElementById('img')
        image.src = "/static/assets/sun.png";
        
    }
    else {
        console.log('evening/night')
        var bg = docu.getElementsById('bg');
        bg.src = "/static/assets/night_bg.jpg";
        var image = document.getElementById('img')
        image.src = "/static/assets/moon.png";
        
    }
}
*/

// Language: <|javascript>
var currentTime = new Date().getHours();
console.log('Current time in hours: '+currentTime)
if (true) {
    console.log('time script activated')
    if (7 <= currentTime && currentTime < 13) {
        console.log('Day')
        const image = document.getElementById('timimg');
        image.src = "https://5895b253-7316-4557-b4fb-f3a24165a4ae.id.repl.co/static/assets/sun.png";
    }
    else {
        console.log('evening/night')
        const image = document.getElementById('timimg');
        image.src = "https://5895b253-7316-4557-b4fb-f3a24165a4ae.id.repl.co/static/assets/moon.png";
    }
}
