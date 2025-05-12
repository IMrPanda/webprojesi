<!-- GİRİŞ KONTROLÜ -->
<?php
// Kullanıcı adı ve şifre kontrolü
$expected_username = "b2412100001@sakarya.edu.tr";
$expected_password = "b2412100001";

// Formdan gelen veriler
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Boş alan kontrolü
if (empty($username) || empty($password)) {
    header("Location: login.html?error=empty");
    exit();
}

// E-posta format kontrolü
if (!filter_var($username, FILTER_VALIDATE_EMAIL)) {
    header("Location: login.html?error=email");
    exit();
}

// Kullanıcı adı ve şifre kontrolü
if ($username === $expected_username && $password === $expected_password) {
    // Başarılı giriş
    $user_id = strstr($username, '@', true); // '@' işaretinden önceki kısmı al
    echo "<!DOCTYPE html>
    <html lang='tr'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Hoşgeldiniz</title>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet'>
        <link rel='stylesheet' href='style/style.css'>
    </head>
    <body>
        <div class='container mt-5'>
            <div class='row justify-content-center'>
                <div class='col-md-6'>
                    <div class='card'>
                        <div class='card-header bg-success text-white'>
                            <h3 class='mb-0'>Giriş Başarılı</h3>
                        </div>
                        <div class='card-body text-center'>
                            <h4>Hoşgeldiniz $user_id</h4>
                            <p>Başarıyla giriş yaptınız.</p>
                            <a href='index.html' class='btn btn-primary'>Ana Sayfaya Dön</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'></script>
    </body>
    </html>";
} else {
    // Başarısız giriş
    header("Location: login.html?error=invalid");
    exit();
}
?>
