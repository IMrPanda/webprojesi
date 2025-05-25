
// Sayfa yüklendiğinde çalışır
  window.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.getElementById('loginLogoutLink');
    const footerLink = document.getElementById('footerLoginLogoutLink');

    // Giriş yapılmış mı kontrol et
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      loginLink.textContent = 'Çıkış Yap';
      loginLink.href = '#';
      footerLink && (footerLink.textContent = 'Çıkış Yap');

      loginLink.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
      });

      footerLink && footerLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
      });

    } else {
      loginLink.textContent = 'Giriş Yap';
      loginLink.href = 'login.html';
      footerLink && (footerLink.textContent = 'Giriş Yap');
    }
  });

  // Login form başarıyla gönderildiyse localStorage'a kaydet
  document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    // Burada sunucuya gönderim yapılacağı için kontrolü yapmışsın zaten
    localStorage.setItem('isLoggedIn', 'true');
  });

// Navbar'ı küçük ekranlarda responsive yapma
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    
    navbarToggler.addEventListener('click', function() {
        navbarNav.classList.toggle('show');
    });
    
    // Slider resimlerine tıklandığında ilgili bölüme git
    const sliderImages = document.querySelectorAll('.gallery-cell img');
    sliderImages.forEach(img => {
        img.addEventListener('click', function() {
            const targetId = this.alt.toLowerCase().replace(/ /g, '-');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Form sonuç sayfasında URL parametrelerini işleme
    if (window.location.pathname.includes('form-sonuc.html')) {
        processFormResults();
    }
});

function processFormResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById('formResults');
    
    if (urlParams.toString() === '') {
        resultsContainer.innerHTML = `
            <div class="alert alert-danger">
                <h5>Hata!</h5>
                <p>Gönderilen form verileri bulunamadı.</p>
                <p>Lütfen iletişim formunu tekrar doldurun.</p>
            </div>
        `;
        return;
    }
    
    let resultsHTML = '<dl class="row">';
    
    urlParams.forEach((value, key) => {
        let displayKey = key;
        switch(key) {
            case 'firstName': displayKey = 'Ad'; break;
            case 'lastName': displayKey = 'Soyad'; break;
            case 'email': displayKey = 'E-posta'; break;
            case 'phone': displayKey = 'Telefon'; break;
            case 'subject': 
                displayKey = 'Konu';
                switch(value) {
                    case 'soru': value = 'Genel Soru'; break;
                    case 'öneri': value = 'Öneri'; break;
                    case 'şikayet': value = 'Şikayet'; break;
                    case 'diger': value = 'Diğer'; break;
                }
                break;
            case 'message': displayKey = 'Mesaj'; break;
            case 'newsletter': 
                displayKey = 'Bülten Aboneliği';
                value = value === 'on' ? 'Evet' : 'Hayır';
                break;
        }
        
        resultsHTML += `
            <dt class="col-sm-3">${displayKey}</dt>
            <dd class="col-sm-9">${value || 'Belirtilmemiş'}</dd>
        `;
    });
    
    resultsHTML += '</dl>';
    resultsContainer.innerHTML = resultsHTML;
}
