const navbar = document.getElementById('navbar');
const cover = document.querySelector('.cover');
const content = document.querySelector('.invitation-content');
const container = document.getElementById('main-container');
const audio = document.getElementById('myAudio');
const musicController = document.querySelector('.musicTriger');

function buka() {
    cover.classList.remove('active');
    content.classList.add('active');
    navbar.classList.add('active');
    cover.classList.add('remove-active');
    container.style.overflow = 'hidden';

    musicController.classList.add('active');
    audio.play()
}

function musicTriger() {
  if (audio.paused) {
      audio.play();
      musicController.classList.remove('paused');
  } else {
      audio.pause();
      musicController.classList.add('paused');
  }
}

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
          currentSection = section.getAttribute('id');
      }
  });

  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
      }
  });
});


// Set target date for the countdown
// Set target date for the countdown
const targetDate = new Date("August 31, 2024 00:00:00").getTime();

// Update countdown every second
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
        document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
    } else {
        clearInterval(countdownInterval);
        document.querySelector(".countdown .play").style.display = "none";
        document.querySelector(".countdown .done").style.display = "block";
    }
}, 1000);

// Handle adding event to calendar
document.getElementById("addToCalendar").addEventListener("click", () => {
    const event = {
        title: "Acara Spesial",
        location: "Lokasi Acara",
        description: "Detail acara penting.",
        startTime: new Date("August 31, 2024 08:00:00").toISOString(),
        endTime: new Date("August 31, 2024 10:00:00").toISOString(),
    };
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime.replace(/-|:|\.\d\d\d/g, "")}/${event.endTime.replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;
    window.open(calendarUrl, "_blank");
});

// Handle activating notifications
document.getElementById("activateNotification").addEventListener("click", () => {
    if (Notification.permission === "granted") {
        scheduleNotification();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                scheduleNotification();
            }
        });
    }
});

function scheduleNotification() {
    const timeUntilEvent = targetDate - new Date().getTime();
    if (timeUntilEvent > 0) {
        setTimeout(() => {
            new Notification("Pengingat Acara", {
                body: "Acara spesial akan segera dimulai!",
                icon: "path/to/icon.png"
            });
        }, timeUntilEvent);
    }
}

function copyAccount(accountId, accountName) {
  var accountNumberElement = document.getElementById(accountId);
  var accountNumber = accountNumberElement.textContent;

  // Membuat elemen input sementara untuk menyalin teks
  var tempInput = document.createElement("input");
  tempInput.value = accountNumber;
  document.body.appendChild(tempInput);

  // Memilih teks dan menyalinnya
  tempInput.select();
  document.execCommand("copy");

  // Menghapus elemen input sementara
  document.body.removeChild(tempInput);

  // Menampilkan pesan konfirmasi dengan nama pengguna
  alert("Nomor rekening " + accountName + " berhasil disalin: " + accountNumber);
}

var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
 
var circles = new Array();
         
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function Circle(radius, speed, width, xPos, yPos) {
  this.radius = radius;
  this.speed = speed;
  this.width = width;
  this.xPos = xPos;
  this.yPos = yPos;
  this.opacity = .5 + Math.random() * 1;
 
  this.counter = 0;
 
  var signHelper = Math.floor(Math.random() * 3);
 
  if (signHelper == 1) {
    this.sign = -1;
  } else {
    this.sign = 1;
  }
}
 
Circle.prototype.update = function () {
 
  this.counter += this.sign * this.speed;
 
  mainContext.beginPath();
             
  mainContext.arc(
    this.xPos + Math.cos(this.counter / 50) * this.radius, 
    this.yPos + Math.sin(this.counter / 50) * this.radius, 
    this.width, 
    0, 
    Math.PI * 10,
    false
  );
                             
  mainContext.closePath();
 
  mainContext.fillStyle = 'rgba(235, 245, 251,' + this.opacity + ')';
  mainContext.fill();
};
 
function drawCircles() {
  for (var i = 0; i < 150; i++) {
    var randomX = Math.round(-100 + Math.random() * 500);
    var randomY = Math.round(-100 + Math.random() * 500);
    var speed = .2 + Math.random() * 1;
    var size = 1 + Math.random() * .5;
 
    var circle = new Circle(10, speed, size, randomX, randomY);
    circles.push(circle);
  }

  draw();
}

drawCircles();
 
function draw() {
  mainContext.clearRect(0, 0, 1500, 1500);
 
  for (var i = 0; i < circles.length; i++) {
    var myCircle = circles[i];
    myCircle.update();
  }
  
  requestAnimationFrame(draw);
}


document.addEventListener("DOMContentLoaded", function() {
  const photos = document.querySelectorAll('.gallery-photo');
  const previews = document.querySelectorAll('.preview-photo');
  let current = 0;

  function showPhoto(index) {
      // Hapus kelas active, previous, dan next dari gambar dan preview sebelumnya
      photos.forEach(photo => photo.classList.remove('active'));
      previews.forEach(preview => preview.classList.remove('active', 'previous', 'next', 'hidden'));

      // Set gambar dan preview baru sebagai active
      current = index;
      photos[current].classList.add('active');
      previews[current].classList.add('active');

      // Set gambar sebelumnya dan setelahnya
      const previousIndex = (current - 1 + previews.length) % previews.length;
      const nextIndex = (current + 1) % previews.length;

      previews[previousIndex].classList.add('previous');
      previews[nextIndex].classList.add('next');

      // Sembunyikan gambar lainnya
      previews.forEach((preview, index) => {
          if (index !== current && index !== previousIndex && index !== nextIndex) {
              preview.classList.add('hidden');
          }
      });
  }

  // Ganti gambar secara otomatis setiap 3 detik
  setInterval(() => {
      let next = (current + 1) % photos.length;
      showPhoto(next);
  }, 3000);

  // Event listener untuk klik preview
  previews.forEach((preview, index) => {
      preview.addEventListener('click', () => {
          showPhoto(index);
      });
  });

  // Inisialisasi tampilan pertama kali
  showPhoto(current);
});
