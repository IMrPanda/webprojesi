// APİ'den veri çekme

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

    /**************** YENİ EKLENEN KISIM - FLICKITY SLIDER AYARLARI ****************/
    // Slider varsa başlat
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const flkty = new Flickity(gallery, {
            wrapAround: true,
            autoPlay: 3000,
            pauseAutoPlayOnHover: true,
            // Daha smooth geçişler için
            fade: true,
            imagesLoaded: true
        });

        // Kullanıcı etkileşiminden sonra autoplay'i yeniden başlat
        flkty.on('staticClick', function() {
            flkty.playPlayer();
        });

        // Butonlara tıklandığında autoplay'i yeniden başlat
        const nextButton = document.querySelector('.flickity-button.next');
        const prevButton = document.querySelector('.flickity-button.previous');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', function() {
                flkty.playPlayer();
            });
            prevButton.addEventListener('click', function() {
                flkty.playPlayer();
            });
        }
    }
    /******************************************************************************/
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