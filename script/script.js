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

async function fetchData() {
    try {
        const url = atob(document.getElementsByTagName("body")[0].dataset.u);
        const response = await fetch(url);
        const data = await response.json();
        
        const targetDateString = data.invitable.reception_date;
        const targetDate = new Date(targetDateString).getTime();
        
    
        const eventTitle = data.title;
        const eventLocation = data.invitable.reception_address;

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

        document.getElementById("addToCalendar").addEventListener("click", () => {
            const event = {
                title: eventTitle, // Use title from API
                location: eventLocation, // Use location from API
                description: "Menghadiri Acara " + eventTitle,
                startTime: new Date(targetDate).toISOString(),
                endTime: new Date(targetDate + 2 * 60 * 60 * 1000).toISOString(), // Assuming the event lasts 2 hours
            };
            const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime.replace(/-|:|\.\d\d\d/g, "")}/${event.endTime.replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;
            window.open(calendarUrl, "_blank");
        });

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
                    new Notification("Menghadiri Acara " + eventTitle, {
                        body: "Acara akan segera dimulai!",
                        icon: "../layout/icon.png"
                    });
                }, timeUntilEvent);
            }
        }

        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(targetDate);
        
        document.querySelector('.tanggal p').innerText = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        

    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
    }
}
document.addEventListener('DOMContentLoaded', fetchData);

function copyAccount(accountId, accountName) {
  var accountNumberElement = document.getElementById(accountId);
  var accountNumber = accountNumberElement.textContent;

  var tempInput = document.createElement("input");
  tempInput.value = accountNumber;
  document.body.appendChild(tempInput);

  tempInput.select();
  document.execCommand("copy");

  document.body.removeChild(tempInput);

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

function initializeSlider() {
    let currentSlide = 0;
    let slides = document.querySelectorAll('.love-story-content');
    let totalSlides = slides.length;
    let pagination = document.querySelector('.pagination');

    if (!pagination) {
        console.error('Elemen pagination tidak ditemukan.');
        return;
    }

    // Bersihkan elemen pagination sebelum menambah bullet
    pagination.innerHTML = '';

    // Membuat pagination bullets
    for (let i = 0; i < totalSlides; i++) {
        let bullet = document.createElement('div');
        bullet.dataset.index = i;
        bullet.classList.toggle('active', i === currentSlide); // Tambahkan 'active' pada bullet pertama
        bullet.addEventListener('click', () => {
            moveToSlide(i);
        });
        pagination.appendChild(bullet);
    }

    // Fungsi untuk berpindah slide
    function moveToSlide(index) {
        slides[currentSlide].classList.remove('active');
        pagination.children[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        pagination.children[currentSlide].classList.add('active');
    }

    // Auto slide
    let autoSlide = setInterval(() => {
        let nextSlide = (currentSlide + 1) % totalSlides;
        moveToSlide(nextSlide);
    }, 3000); // Ganti slide setiap 3 detik

    // Swipe manual menggunakan gesture (untuk perangkat mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.slider').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.slider').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchEndX < touchStartX) {
            let nextSlide = (currentSlide + 1) % totalSlides;
            moveToSlide(nextSlide);
        } else if (touchEndX > touchStartX) {
            let prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            moveToSlide(prevSlide);
        }
    }

    // Set slide pertama dan pagination active
    moveToSlide(0);
}

function initializeSliderGallery() {
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
}

