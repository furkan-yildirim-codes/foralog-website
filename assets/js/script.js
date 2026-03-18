// =============================
// NAVBAR & HAMBURGER
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    function closeMenu() {
        if (!hamburger || !navMenu) return;
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        document.addEventListener("click", event => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedHamburger = hamburger.contains(event.target);

            if (!clickedInsideMenu && !clickedHamburger && navMenu.classList.contains("active")) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll("#nav-menu a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });

});


// =============================
// COUNTER & REVEAL ANIMATION
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 2500;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        let count = 0;

        const update = () => {
            count += increment;

            if (count < target) {
                if (counter.classList.contains("percent")) {
                    counter.innerText = "%" + Math.floor(count);
                } else {
                    counter.innerText = Math.floor(count);
                }
                setTimeout(update, stepTime);
            } else {
                if (counter.classList.contains("percent")) {
                    counter.innerText = "%" + target;
                } else if (target === 25 || target === 7) {
                    counter.innerHTML = `${target}<span class="count-suffix">+</span>`;
                } else {
                    counter.innerText = target;
                }
            }
        };

        update();
    };

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("reveal-left") ||
                    entry.target.classList.contains("reveal-right")) {
                    entry.target.classList.add("reveal-active");
                } else {
                    entry.target.classList.add("active");
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => {
        revealObserver.observe(el);
    });

});


// =============================
// HERO SLIDER
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".hero-slider");
    const prevButton = document.querySelector(".hero-nav-prev");
    const nextButton = document.querySelector(".hero-nav-next");
    if (!slider) return;

    const slides = [
        { src: "assets/images/truck1.png", mobilePosition: "65% center" },
        { src: "assets/images/truck2.png", mobilePosition: "28% center" },
        { src: "assets/images/truck3.png", mobilePosition: "55% center" },
        { src: "assets/images/truck4.png", mobilePosition: "70% center" },
        { src: "assets/images/truck5.png", mobilePosition: "48% center" },
        { src: "assets/images/truck6.png", mobilePosition: "64% center" },
        { src: "assets/images/truck7.png", mobilePosition: "52% center" },
        { src: "assets/images/truck8.png", mobilePosition: "58% center" },
        { src: "assets/images/truck9.png", mobilePosition: "70% center" }
    ];

    let current = 0;
    let slideInterval;

    function applySlide(index) {
        const slide = slides[index];
        slider.style.backgroundImage = `url(${slide.src})`;
        slider.style.setProperty("--hero-bg-position", slide.desktopPosition || "center center");
        slider.style.setProperty("--hero-bg-position-mobile", slide.mobilePosition || "center center");
    }

    function showSlide(index) {
        slider.style.opacity = 0;
        setTimeout(() => {
            current = (index + slides.length) % slides.length;
            applySlide(current);
            slider.style.opacity = 1;
        }, 500);
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showSlide(current + 1);
        }, 4000);
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showSlide(current - 1);
            startAutoSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlide(current + 1);
            startAutoSlide();
        });
    }

    applySlide(current);
    startAutoSlide();

});


// =============================
// TRANSLATIONS
// =============================
// =============================
// TRANSLATIONS
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const translations = {

        // ================= TR =================
        tr: {
            navHome: "Ana Sayfa",
            navAbout: "Hakkımızda",
            navServices: "Hizmetler",
            navContact: "İletişim",

            // INDEX HERO
            heroTitle: "2000'den Beri Avrupa'ya Güvenli Taşımacılık",
            heroDesc: "Uluslararası kara nakliyesinde 25+ yıllık deneyim ile zamanında ve güvenilir lojistik çözümler sunuyoruz.",
            offerBtn: "Teklif Alın",

            // INDEX SERVICES
            servicesTitle: "Hizmetlerimiz",
            service1Title: "Uluslararası Kara Nakliyesi",
            service1Desc: "Avrupa ülkelerine düzenli ve güvenli taşımacılık hizmeti.",
            service2Title: "Yurtiçi Taşımacılık",
            service2Desc: "Türkiye genelinde hızlı ve planlı lojistik operasyonlar.",
            service3Title: "Avrupa Hat Uzmanlığı",
            service3Desc: "Avrupa rotalarında güçlü operasyon ağı ve zamanında teslimat.",

            // WHY US
            whyTitle: "Neden Fora Taşımacılık?",
            why1Title: "25+ Yıl Deneyim",
            why1Desc: "2000 yılından bu yana uluslararası taşımacılık tecrübesi.",
            why2Title: "Avrupa Uzmanlığı",
            why2Desc: "Avrupa hatlarında güçlü operasyon ve zamanında teslimat.",
            why3Title: "Güvenilir Hizmet",
            why3Desc: "Müşteri memnuniyetini esas alan şeffaf ve planlı lojistik süreç.",

            // ABOUT
            aboutHeroTitle: "Hakkımızda",
            aboutHeroDesc: "2000 yılından bu yana uluslararası karayolu taşımacılığında güvenilir çözüm ortağınız.",
            aboutTitle: "Kuruluş Hikayemiz",
            aboutText1: "Şirketimiz, 2000 senesinin sonunda uzun yılların tecrübe ve birikimine sahip bir ekip ile araç yatırımını tamamlayarak uluslararası karayolu taşımacılığı faaliyetine başlamıştır.",
            aboutText2: "Kurulduğu ilk günden bu yana butik çalışma anlayışını benimseyen firmamız, çift katlı özel araç filosu ile hizmet vermektedir.",
            aboutText3: "Taşımacılıkta kaliteyi sabit tutabilmek adına yalnızca FORA araçları kullanılmaktadır.",
            aboutText4: "Uluslararası nakliye süreci uçtan uca yönetilmektedir.",

            stat1: "Yıl Deneyim",
            stat2: "Avrupa Ülkesi",
            stat3: "Güvenilir Hizmet",

            countriesTitle: "Hizmet Verdiğimiz Başlıca Ülkeler",
            country1: "Almanya",
            country2: "Avusturya",
            country3: "İsviçre",
            country4: "Hollanda",
            country5: "Belçika",
            country6: "Doğu Fransa",
            country7: "Güney Danimarka",
            countryNote: "Özellikle Almanya hattında güçlü acentelik bağları ile hızlı ve güvenilir çözümler sunmaktayız.",

            footerCompany: "FORA ULUSLARARASI TAS.LOJ.HIZM.TIC.LTD.STI",
            footerText: "© 2026 Foralog. Tüm hakları saklıdır.",
            footerDesigner: "Tasarlayan Furkan YILDIRIM",
            footerContactBtn: "Bize Ulaşın",
            footerKvkkBtn: "KVKK Politikası",
            footerPrivacyBtn: "Gizlilik Politikası",
            footerCookieBtn: "Çerez Politikası",
            serviceIntroBtn: "Tanıyalım",

            // SERVICES HERO
            servicesHeroTitle: "Hizmetlerimiz",
            servicesHeroDesc: "Taşıma hizmetlerimizde yarattığımız önemli farklılık, sahip olduğumuz çift kat özellikli araç filomuzdur.",

            // DETAIL 1
            serviceDetail1Title: "İkinci Kat Sistemi Nedir?",
            serviceDetail1_1: "Almanya’dan ithal edilmiş sistem ile araç tonaj ve hacim kapasitesi maksimum kullanılır.",
            serviceDetail1_2: "Metal taşıyıcılar sayesinde ikinci kat oluşturularak toplam 7,5 tona kadar eşit yükleme yapılabilir.",
            serviceDetail1_3: "1 m yükseklikten itibaren ihtiyaç duyulan uzunlukta ikinci taban oluşturulabilir.",
            serviceDetail1_4: "Mega treyler araçlarda 3 m iç yükseklik avantajı sağlar.",
            serviceDetail1_5: "Özellikle tonajı ağır, hacmi küçük yükler için ciddi maliyet avantajı sunar.",

            // DETAIL 2
            serviceDetail2Title: "Yükünüz Çok Mu Ağır?",
            serviceDetail2_1: "Ağır metal kasalar, paletler ve sandıklardan oluşan yükler araç tonajını doldururken hacim olarak az yer kaplayabilir.",
            serviceDetail2_2: "İkinci kat sistemi sayesinde alt ve üst alan verimli kullanılarak araç kapasitesi maksimum değerlendirilir ve maliyet avantajı sağlanır.",

            // DETAIL 3
            serviceDetail3Title: "Yükünüz Çok Mu Hafif?",
            serviceDetail3_1: "Hafif fakat hacimsel olarak büyük yüklerde, hacim ağırlığı üzerinden ücretlendirme oluşur.",
            serviceDetail3_2: "İkinci kat sistemi ile araç tabanı ve üst kat ayrı ayrı değerlendirilerek fiyat avantajı sağlanır.",

            // DETAIL 4
            serviceDetail4Title: "Yükünüz Hassas veya Üst Üste Binir mi?",
            serviceDetail4_1: "Paletli ve hassas yüklerde ikinci kat sayesinde ezilme riski ortadan kaldırılır.",
            serviceDetail4_2: "Boş kalan alanlar diğer yüklerle değerlendirilerek müşteriye maliyet avantajı sunulur.",

            // DETAIL 5
            serviceDetail5Title: "Boşaltma Sırası Nedeniyle Gecikme?",
            serviceDetail5_1: "İkinci kat sistemi, farklı müşterilere ait yüklerin birbirini engellemeden taşınmasını sağlar.",
            serviceDetail5_2: "Bu sayede zaman kaybı ve depo maliyetleri minimize edilir.",

            // DETAIL 6
            serviceDetail6Title: "Yurt Dışına Taşınma Hizmeti",
            serviceDetail6_1: "Türkiye’den yeni mobilyalarınızı özenle yüklüyoruz.",
            serviceDetail6_2: "İhracat ve Almanya giriş gümrük işlemlerini gerçekleştiriyoruz.",
            serviceDetail6_3: "Mobilyalarınızı Avrupa’daki adresinize teslim ediyoruz.",

            contactHeroTitle: "İletişim",
            contactHeroDesc: "Bizimle iletişime geçin. Size en kısa sürede dönüş yapalım.",
            contactCompany: "Fora Uluslararası Taşımacılık",
            contactAddressTitle: "Adres",
            contactPhoneTitle: "Telefon Numarası",
            contactFaxTitle: "Fax",
            contactMailTitle: "E-Mail",
            kvkkHeroTitle: "KVKK Aydınlatma Metni",
            kvkkHeroDesc: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme metni.",
            kvkkTitle: "KVKK Aydınlatma Metni",
            kvkkText1: "Fora Uluslararası Taşımacılık (“Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında kişisel verilerinizin güvenliğine önem vermekteyiz.",
            kvkkText2: "Web sitemiz üzerinden doğrudan kişisel veri toplanmamaktadır. Ancak tarafımıza e-posta, telefon veya diğer iletişim kanalları aracılığıyla iletilen ad, soyad, iletişim bilgileri ve benzeri veriler; yalnızca talebinizin değerlendirilmesi, hizmet süreçlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.",
            kvkkProcessTitle: "İşleme İlkeleri",
            kvkkProcessIntro: "Kişisel verileriniz;",
            kvkkItem1: "Hukuka ve dürüstlük kurallarına uygun olarak,",
            kvkkItem2: "Doğru ve gerektiğinde güncel şekilde,",
            kvkkItem3: "Belirli, açık ve meşru amaçlarla,",
            kvkkItem4: "İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olarak işlenmektedir.",
            kvkkText3: "Verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır.",
            kvkkRightsTitle: "Haklarınız",
            kvkkRightsIntro: "KVKK’nın 11. maddesi kapsamında veri sahibi olarak;",
            kvkkRight1: "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
            kvkkRight2: "İşlenmişse bilgi talep etme,",
            kvkkRight3: "Düzeltilmesini veya silinmesini isteme,",
            kvkkRight4: "İşlemeye itiraz etme",
            kvkkRightsOutro: "haklarına sahipsiniz.",
            kvkkContactText: "Haklarınıza ilişkin taleplerinizi info@foralog.com adresi üzerinden iletebilirsiniz.",
            privacyHeroTitle: "Gizlilik Politikası",
            privacyHeroDesc: "Ziyaretçilerimizin gizliliğine ilişkin bilgilendirme metni.",
            privacyTitle: "Gizlilik Politikası",
            privacyText1: "Fora Uluslararası Taşımacılık olarak ziyaretçilerimizin gizliliğine önem veriyoruz.",
            privacyText2: "Web sitemiz, kullanıcıdan doğrudan kişisel veri toplayan bir form veya üyelik sistemi içermemektedir.",
            privacyText3: "Ziyaret sırasında otomatik olarak elde edilebilecek teknik veriler (IP adresi, tarayıcı bilgisi, ziyaret süresi gibi) yalnızca site güvenliği ve performans analizi amacıyla değerlendirilebilir.",
            privacyText4: "Şirketimiz, kişisel verileri üçüncü şahıslarla ticari amaçla paylaşmaz, satmaz veya devretmez.",
            privacyText5: "Web sitemizde üçüncü taraf bağlantılar (örneğin Google Haritalar) bulunabilir. Bu hizmetlerin gizlilik uygulamalarından ilgili üçüncü taraflar sorumludur.",
            privacyText6: "Gizlilik politikamız zaman zaman güncellenebilir. Güncel versiyon her zaman web sitemizde yayınlanır.",
            cookieHeroTitle: "Çerez Politikası",
            cookieHeroDesc: "Web sitemizde kullanılan çerezlere ilişkin bilgilendirme metni.",
            cookieTitle: "Çerez Politikası",
            cookieText1: "Web sitemiz, kullanıcı deneyimini geliştirmek ve site performansını analiz etmek amacıyla çerezler kullanabilir.",
            cookieText2: "Çerezler, ziyaret ettiğiniz web sitesi tarafından tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.",
            cookieText3: "Sitemizde kullanılan çerezler;",
            cookieItem1: "Zorunlu çerezler (site işleyişi için gerekli),",
            cookieItem2: "Analitik çerezler (ziyaretçi istatistikleri için)",
            cookieText4: "amaçlarıyla sınırlıdır.",
            cookieText5: "Ayrıca Google Haritalar gibi üçüncü taraf hizmetler kendi çerez politikalarını uygulayabilir.",
            cookieText6: "Tarayıcı ayarlarınız üzerinden çerez kullanımını kısıtlayabilir veya tamamen engelleyebilirsiniz. Ancak bu durumda bazı site özellikleri düzgün çalışmayabilir.",

        },


        // ================= EN =================
        en: {
            navHome: "Home",
            navAbout: "About",
            navServices: "Services",
            navContact: "Contact",

            heroTitle: "Reliable Transportation to Europe Since 2000",
            heroDesc: "With 25+ years of experience in international road transportation, we provide timely and reliable logistics solutions.",
            offerBtn: "Get a Quote",

            servicesTitle: "Our Services",
            service1Title: "International Road Transport",
            service1Desc: "Regular and secure transportation services to European countries.",
            service2Title: "Domestic Transportation",
            service2Desc: "Fast and well-planned logistics operations across Turkey.",
            service3Title: "European Route Expertise",
            service3Desc: "Strong operational network and on-time delivery on European routes.",

            whyTitle: "Why Fora Transportation?",
            why1Title: "25+ Years of Experience",
            why1Desc: "International transportation expertise since 2000.",
            why2Title: "European Expertise",
            why2Desc: "Strong operational network and timely delivery in European routes.",
            why3Title: "Reliable Service",
            why3Desc: "Transparent and structured logistics processes focused on customer satisfaction.",

            aboutHeroTitle: "About Us",
            aboutHeroDesc: "Your reliable logistics partner in international road transportation since 2000.",
            aboutTitle: "Our Story",
            aboutText1: "Founded in 2000 by an experienced team, we started international road transport operations.",
            aboutText2: "We operate with a boutique approach and a special double-deck vehicle fleet.",
            aboutText3: "Only FORA vehicles are used to maintain service quality.",
            aboutText4: "We manage the entire international logistics process end-to-end.",

            stat1: "Years Experience",
            stat2: "European Countries",
            stat3: "Reliable Service",

            countriesTitle: "Main Countries We Serve",
            country1: "Germany",
            country2: "Austria",
            country3: "Switzerland",
            country4: "Netherlands",
            country5: "Belgium",
            country6: "Eastern France",
            country7: "Southern Denmark",
            countryNote: "Especially on the Germany route, we provide fast and reliable solutions.",

            footerCompany: "FORA ULUSLARARASI TAS.LOJ.HIZM.TIC.LTD.STI",
            footerText: "© 2026 Foralog. All rights reserved.",
            footerDesigner: "Designed by Furkan YILDIRIM",
            footerContactBtn: "Contact Us",
            footerKvkkBtn: "Privacy Notice",
            footerPrivacyBtn: "Privacy Policy",
            footerCookieBtn: "Cookie Policy",
            serviceIntroBtn: "Explore",
            shortcutCardLabel: "Double Deck System",

            servicesHeroTitle: "Our Services",
            servicesHeroDesc: "The key difference in our transportation services is our double-deck vehicle fleet.",

            serviceDetail1Title: "What is the Double-Deck System?",
            serviceDetail1_1: "With the system imported from Germany, vehicle tonnage and volume capacity are used at maximum efficiency.",
            serviceDetail1_2: "Thanks to metal carriers, a second level is created, allowing balanced loading up to 7.5 tons.",
            serviceDetail1_3: "A second floor can be created from 1 meter height with the required length.",
            serviceDetail1_4: "Provides 3 meters interior height advantage in mega trailer vehicles.",
            serviceDetail1_5: "Offers serious cost advantages especially for heavy but low-volume loads.",

            serviceDetail2Title: "Is Your Load Too Heavy?",
            serviceDetail2_1: "Heavy metal crates, pallets and boxes may fill vehicle tonnage while occupying little space.",
            serviceDetail2_2: "With the double-deck system, lower and upper areas are used efficiently, maximizing capacity and reducing costs.",

            serviceDetail3Title: "Is Your Load Too Light?",
            serviceDetail3_1: "For light but bulky loads, pricing is calculated based on volumetric weight.",
            serviceDetail3_2: "The double-deck system allows separate evaluation of lower and upper decks, providing price advantage.",

            serviceDetail4Title: "Is Your Load Fragile or Stackable?",
            serviceDetail4_1: "For palletized and fragile goods, the second deck eliminates crushing risk.",
            serviceDetail4_2: "Unused spaces are optimized with other loads, offering cost efficiency.",

            serviceDetail5Title: "Delays Due to Unloading Order?",
            serviceDetail5_1: "The double-deck system ensures that loads from different customers do not block each other.",
            serviceDetail5_2: "This minimizes time loss and warehouse costs.",

            serviceDetail6Title: "International Relocation Service",
            serviceDetail6_1: "We carefully load your new furniture from Turkey.",
            serviceDetail6_2: "We handle export and German customs procedures.",
            serviceDetail6_3: "We deliver your furniture to your address in Europe.",

            contactHeroTitle: "Contact",
            contactHeroDesc: "Get in touch with us. We will get back to you as soon as possible.",
            contactCompany: "Fora International Transportation",
            contactAddressTitle: "Address",
            contactPhoneTitle: "Phone Number",
            contactFaxTitle: "Fax",
            contactMailTitle: "E-Mail",
            kvkkHeroTitle: "Privacy Notice",
            kvkkHeroDesc: "Information text under the Turkish Personal Data Protection Law No. 6698.",
            kvkkTitle: "Privacy Notice",
            kvkkText1: "As Fora International Transportation (“Company”), we attach importance to the security of your personal data within the scope of the Personal Data Protection Law No. 6698 (“KVKK”).",
            kvkkText2: "No personal data is collected directly through our website. However, the name, surname, contact information and similar data you share with us via e-mail, phone or other communication channels are processed solely for evaluating your request, carrying out service processes and fulfilling legal obligations.",
            kvkkProcessTitle: "Processing Principles",
            kvkkProcessIntro: "Your personal data is processed;",
            kvkkItem1: "In compliance with the law and principles of good faith,",
            kvkkItem2: "Accurately and, where necessary, kept up to date,",
            kvkkItem3: "For specific, explicit and legitimate purposes,",
            kvkkItem4: "In a manner that is relevant, limited and proportionate to the purposes for which it is processed.",
            kvkkText3: "Your data is not shared with third parties except where legally required.",
            kvkkRightsTitle: "Your Rights",
            kvkkRightsIntro: "Under Article 11 of the KVKK, as a data subject you have the right to;",
            kvkkRight1: "Learn whether your personal data is being processed,",
            kvkkRight2: "Request information if it has been processed,",
            kvkkRight3: "Request correction or deletion,",
            kvkkRight4: "Object to the processing",
            kvkkRightsOutro: "and exercise your related rights.",
            kvkkContactText: "You may submit your requests regarding your rights via info@foralog.com.",
            privacyHeroTitle: "Privacy Policy",
            privacyHeroDesc: "Information notice regarding the privacy of our visitors.",
            privacyTitle: "Privacy Policy",
            privacyText1: "As Fora International Transportation, we care about the privacy of our visitors.",
            privacyText2: "Our website does not include a form or membership system that directly collects personal data from users.",
            privacyText3: "Technical data that may be obtained automatically during your visit, such as IP address, browser information, and visit duration, may only be evaluated for site security and performance analysis.",
            privacyText4: "Our company does not share, sell, or transfer personal data to third parties for commercial purposes.",
            privacyText5: "Our website may contain third-party links, such as Google Maps. The relevant third parties are responsible for the privacy practices of these services.",
            privacyText6: "Our privacy policy may be updated from time to time. The current version is always published on our website.",
            cookieHeroTitle: "Cookie Policy",
            cookieHeroDesc: "Information notice regarding the cookies used on our website.",
            cookieTitle: "Cookie Policy",
            cookieText1: "Our website may use cookies to improve user experience and analyze site performance.",
            cookieText2: "Cookies are small text files stored on your device by the website you visit through your browser.",
            cookieText3: "The cookies used on our website are limited to;",
            cookieItem1: "Essential cookies (required for site functionality),",
            cookieItem2: "Analytics cookies (for visitor statistics)",
            cookieText4: "these purposes only.",
            cookieText5: "In addition, third-party services such as Google Maps may apply their own cookie policies.",
            cookieText6: "You can restrict or completely disable the use of cookies through your browser settings. However, in this case, some site features may not function properly.",
        },


        // ================= DE =================
        de: {
            navHome: "Startseite",
            navAbout: "Über Uns",
            navServices: "Dienstleistungen",
            navContact: "Kontakt",

            heroTitle: "Zuverlässiger Transport nach Europa seit 2000",
            heroDesc: "Mit über 25 Jahren Erfahrung im internationalen Straßentransport bieten wir pünktliche und zuverlässige Logistiklösungen.",
            offerBtn: "Angebot Anfordern",

            servicesTitle: "Unsere Dienstleistungen",
            service1Title: "Internationaler Straßentransport",
            service1Desc: "Regelmäßige und sichere Transportdienste in europäische Länder.",
            service2Title: "Inlandstransport",
            service2Desc: "Schnelle und gut geplante Logistikoperationen in der Türkei.",
            service3Title: "Europa-Routen Expertise",
            service3Desc: "Starkes Betriebsnetz und pünktliche Lieferung auf europäischen Routen.",

            whyTitle: "Warum Fora Transport?",
            why1Title: "Über 25 Jahre Erfahrung",
            why1Desc: "Internationale Transporterfahrung seit 2000.",
            why2Title: "Europa-Expertise",
            why2Desc: "Starkes operatives Netzwerk und termingerechte Lieferung in Europa.",
            why3Title: "Zuverlässiger Service",
            why3Desc: "Transparente und strukturierte Logistikprozesse mit Fokus auf Kundenzufriedenheit.",

            aboutHeroTitle: "Über Uns",
            aboutHeroDesc: "Ihr zuverlässiger Partner im internationalen Straßentransport seit 2000.",
            aboutTitle: "Unsere Geschichte",
            aboutText1: "Im Jahr 2000 gegründet, starteten wir mit einem erfahrenen Team im internationalen Straßentransport.",
            aboutText2: "Wir arbeiten mit einem Boutique-Ansatz und einer speziellen Doppeldecker-Flotte.",
            aboutText3: "Zur Qualitätssicherung werden ausschließlich FORA-Fahrzeuge eingesetzt.",
            aboutText4: "Wir verwalten den gesamten internationalen Logistikprozess von Anfang bis Ende.",

            stat1: "Jahre Erfahrung",
            stat2: "Europäische Länder",
            stat3: "Zuverlässiger Service",

            countriesTitle: "Hauptländer, die wir bedienen",
            country1: "Deutschland",
            country2: "Österreich",
            country3: "Schweiz",
            country4: "Niederlande",
            country5: "Belgien",
            country6: "Ostfrankreich",
            country7: "Süddänemark",
            countryNote: "Besonders auf der Deutschland-Route bieten wir schnelle und zuverlässige Lösungen.",

            footerCompany: "FORA ULUSLARARASI TAS.LOJ.HIZM.TIC.LTD.STI",
            footerText: "© 2026 Foralog. Alle Rechte vorbehalten.",
            footerDesigner: "Design von Furkan YILDIRIM",
            footerContactBtn: "Kontakt",
            footerKvkkBtn: "Datenschutzhinweis",
            footerPrivacyBtn: "Datenschutzrichtlinie",
            footerCookieBtn: "Cookie-Richtlinie",
            serviceIntroBtn: "Entdecken",
            shortcutCardLabel: "Doppeldeck-System",

            servicesHeroTitle: "Unsere Dienstleistungen",
            servicesHeroDesc: "Der wichtigste Unterschied unserer Transportdienste ist unsere Doppeldeck-Fahrzeugflotte.",

            serviceDetail1Title: "Was ist das Doppeldeck-System?",
            serviceDetail1_1: "Mit dem aus Deutschland importierten System werden Tonnage- und Volumenkapazität optimal genutzt.",
            serviceDetail1_2: "Durch Metallträger wird eine zweite Ebene geschaffen, wodurch bis zu 7,5 Tonnen gleichmäßig geladen werden können.",
            serviceDetail1_3: "Ab 1 Meter Höhe kann eine zweite Ladefläche in gewünschter Länge erstellt werden.",
            serviceDetail1_4: "Bietet 3 Meter Innenhöhe bei Mega-Trailern.",
            serviceDetail1_5: "Besonders bei schweren, aber volumenarmen Gütern bietet es erhebliche Kostenvorteile.",

            serviceDetail2Title: "Ist Ihre Ladung sehr schwer?",
            serviceDetail2_1: "Schwere Metallkisten und Paletten füllen oft die Tonnage, nehmen jedoch wenig Platz ein.",
            serviceDetail2_2: "Das Doppeldeck-System nutzt unteren und oberen Raum effizient und senkt die Kosten.",

            serviceDetail3Title: "Ist Ihre Ladung sehr leicht?",
            serviceDetail3_1: "Bei leichten, aber voluminösen Gütern erfolgt die Berechnung nach Volumengewicht.",
            serviceDetail3_2: "Durch getrennte Nutzung von Unter- und Oberdeck entsteht ein Preisvorteil.",

            serviceDetail4Title: "Ist Ihre Ladung empfindlich oder stapelbar?",
            serviceDetail4_1: "Die zweite Ebene verhindert das Zerdrücken empfindlicher Güter.",
            serviceDetail4_2: "Freie Flächen werden optimal genutzt und bieten Kosteneffizienz.",

            serviceDetail5Title: "Verzögerung durch Entladereihenfolge?",
            serviceDetail5_1: "Das Doppeldeck-System verhindert, dass sich Kundenladungen gegenseitig blockieren.",
            serviceDetail5_2: "Dadurch werden Zeit- und Lagerkosten minimiert.",

            serviceDetail6Title: "Umzugsservice ins Ausland",
            serviceDetail6_1: "Wir laden Ihre neuen Möbel sorgfältig in der Türkei.",
            serviceDetail6_2: "Wir übernehmen Export- und deutsche Zollabwicklung.",
            serviceDetail6_3: "Wir liefern Ihre Möbel an Ihre Adresse in Europa.",

            contactHeroTitle: "Kontakt",
            contactHeroDesc: "Kontaktieren Sie uns. Wir melden uns schnellstmöglich bei Ihnen.",
            contactCompany: "Fora Internationale Spedition",
            contactAddressTitle: "Adresse",
            contactPhoneTitle: "Telefonnummer",
            contactFaxTitle: "Fax",
            contactMailTitle: "E-Mail",
            kvkkHeroTitle: "Datenschutzhinweis",
            kvkkHeroDesc: "Informationstext im Rahmen des türkischen Datenschutzgesetzes Nr. 6698.",
            kvkkTitle: "Datenschutzhinweis",
            kvkkText1: "Als Fora Internationale Spedition („Unternehmen“) messen wir der Sicherheit Ihrer personenbezogenen Daten im Rahmen des Gesetzes Nr. 6698 zum Schutz personenbezogener Daten („KVKK“) große Bedeutung bei.",
            kvkkText2: "Über unsere Website werden keine personenbezogenen Daten direkt erhoben. Daten wie Vorname, Nachname, Kontaktdaten und ähnliche Informationen, die Sie uns per E-Mail, Telefon oder über andere Kommunikationskanäle übermitteln, werden ausschließlich zur Bearbeitung Ihrer Anfrage, zur Durchführung von Dienstleistungsprozessen und zur Erfüllung gesetzlicher Verpflichtungen verarbeitet.",
            kvkkProcessTitle: "Verarbeitungsgrundsätze",
            kvkkProcessIntro: "Ihre personenbezogenen Daten werden verarbeitet;",
            kvkkItem1: "Im Einklang mit Recht und Treu und Glauben,",
            kvkkItem2: "Richtig und bei Bedarf aktuell,",
            kvkkItem3: "Für bestimmte, eindeutige und rechtmäßige Zwecke,",
            kvkkItem4: "Zweckgebunden, begrenzt und verhältnismäßig.",
            kvkkText3: "Ihre Daten werden außerhalb gesetzlicher Verpflichtungen nicht an Dritte weitergegeben.",
            kvkkRightsTitle: "Ihre Rechte",
            kvkkRightsIntro: "Gemäß Artikel 11 des KVKK haben Sie als betroffene Person das Recht,",
            kvkkRight1: "Zu erfahren, ob Ihre personenbezogenen Daten verarbeitet werden,",
            kvkkRight2: "Informationen anzufordern, falls sie verarbeitet wurden,",
            kvkkRight3: "Berichtigung oder Löschung zu verlangen,",
            kvkkRight4: "Der Verarbeitung zu widersprechen",
            kvkkRightsOutro: "und die damit verbundenen Rechte auszuüben.",
            kvkkContactText: "Sie können Ihre Anträge bezüglich Ihrer Rechte über info@foralog.com einreichen.",
            privacyHeroTitle: "Datenschutzrichtlinie",
            privacyHeroDesc: "Hinweistext zum Schutz der Privatsphäre unserer Besucher.",
            privacyTitle: "Datenschutzrichtlinie",
            privacyText1: "Als Fora Internationale Spedition legen wir großen Wert auf die Privatsphäre unserer Besucher.",
            privacyText2: "Unsere Website enthält weder ein Formular noch ein Mitgliedschaftssystem, über das direkt personenbezogene Daten von Nutzern erhoben werden.",
            privacyText3: "Technische Daten, die während Ihres Besuchs automatisch erfasst werden können, wie IP-Adresse, Browserinformationen und Besuchsdauer, werden ausschließlich zur Sicherheit der Website und zur Leistungsanalyse ausgewertet.",
            privacyText4: "Unser Unternehmen gibt personenbezogene Daten nicht zu kommerziellen Zwecken an Dritte weiter, verkauft sie nicht und überträgt sie nicht.",
            privacyText5: "Unsere Website kann Links zu Drittanbietern enthalten, zum Beispiel zu Google Maps. Für die Datenschutzpraktiken dieser Dienste sind die jeweiligen Drittanbieter verantwortlich.",
            privacyText6: "Unsere Datenschutzrichtlinie kann von Zeit zu Zeit aktualisiert werden. Die aktuelle Version wird stets auf unserer Website veröffentlicht.",
            cookieHeroTitle: "Cookie-Richtlinie",
            cookieHeroDesc: "Hinweistext zu den auf unserer Website verwendeten Cookies.",
            cookieTitle: "Cookie-Richtlinie",
            cookieText1: "Unsere Website kann Cookies verwenden, um die Benutzererfahrung zu verbessern und die Leistung der Website zu analysieren.",
            cookieText2: "Cookies sind kleine Textdateien, die von der von Ihnen besuchten Website über Ihren Browser auf Ihrem Gerät gespeichert werden.",
            cookieText3: "Die auf unserer Website verwendeten Cookies sind beschränkt auf;",
            cookieItem1: "Notwendige Cookies (für die Funktion der Website erforderlich),",
            cookieItem2: "Analyse-Cookies (für Besucherstatistiken)",
            cookieText4: "diese Zwecke.",
            cookieText5: "Darüber hinaus können Drittanbieterdienste wie Google Maps ihre eigenen Cookie-Richtlinien anwenden.",
            cookieText6: "Sie können die Verwendung von Cookies über Ihre Browsereinstellungen einschränken oder vollständig deaktivieren. In diesem Fall funktionieren einige Website-Funktionen möglicherweise nicht ordnungsgemäß.",
        }
    };

    const langSwitchMobile = document.getElementById("lang-switch");
    const langSwitchDesktop = document.getElementById("lang-switch-desktop");
    const heroTitle = document.querySelector('[data-key="heroTitle"]');

    let currentLang = localStorage.getItem("lang") || "tr";
    let heroTypingTimeout;

    function animateLanguageButtons() {
        [langSwitchMobile, langSwitchDesktop].forEach(button => {
            if (!button) return;

            button.classList.remove("switching");
            void button.offsetWidth;
            button.classList.add("switching");
        });
    }

    function animateLanguageTransition() {
        document.body.classList.remove("language-transition");
        void document.body.offsetWidth;
        document.body.classList.add("language-transition");

        setTimeout(() => {
            document.body.classList.remove("language-transition");
        }, 450);
    }

    function typeHeroTitle(text) {
        if (!heroTitle) return;

        clearTimeout(heroTypingTimeout);
        heroTitle.classList.add("hero-title-typing");
        heroTitle.innerHTML = `<span class="hero-title-text">${text}</span>`;
        heroTitle.style.setProperty("--typing-duration", `${Math.max(Math.min(text.length * 0.075, 3.8), 2.3)}s`);

        void heroTitle.offsetWidth;

        heroTypingTimeout = setTimeout(() => {
            heroTitle.classList.remove("hero-title-typing");
        }, Math.max(Math.min(text.length * 75, 3800), 2300) + 250);
    }

    function updateLanguage(lang) {
        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            if (translations[lang] && translations[lang][key]) {
                if (key !== "heroTitle") {
                    el.textContent = translations[lang][key];
                }
            }
        });

        document.body.classList.remove("lang-tr", "lang-en", "lang-de");
        document.body.classList.add("lang-" + lang);

        if (langSwitchMobile) langSwitchMobile.textContent = lang.toUpperCase();
        if (langSwitchDesktop) langSwitchDesktop.textContent = lang.toUpperCase();

        if (translations[lang] && translations[lang].heroTitle) {
            typeHeroTitle(translations[lang].heroTitle);
        }

        localStorage.setItem("lang", lang);
    }

    function toggleLanguage() {
        if (currentLang === "tr") currentLang = "en";
        else if (currentLang === "en") currentLang = "de";
        else currentLang = "tr";

        animateLanguageButtons();
        animateLanguageTransition();
        updateLanguage(currentLang);
    }

    if (langSwitchMobile) langSwitchMobile.addEventListener("click", toggleLanguage);
    if (langSwitchDesktop) langSwitchDesktop.addEventListener("click", toggleLanguage);

    updateLanguage(currentLang);

});


// =============================
// SCROLL TO TOP
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-to-top";
    scrollButton.type = "button";
    scrollButton.setAttribute("aria-label", "Sayfanin basina don");
    scrollButton.innerHTML = "&#8593;";

    document.body.appendChild(scrollButton);

    let serviceShortcutButton = null;

    if (currentPage === "index.html") {
        const shortcutTranslations = {
            tr: "İkinci Kat Sistemi",
            en: "Double Deck System",
            de: "Doppeldeck-System"
        };
        serviceShortcutButton = document.createElement("button");
        serviceShortcutButton.className = "service-shortcut-button";
        serviceShortcutButton.type = "button";
        serviceShortcutButton.setAttribute("aria-label", "İkinci kat sistemi kartina git");
        serviceShortcutButton.innerHTML = '<span class="service-shortcut-pill"></span><span class="service-shortcut-code">2K</span>';
        document.body.appendChild(serviceShortcutButton);

        function updateShortcutButtonLabel() {
            const activeLang = localStorage.getItem("lang") || "tr";
            const shortcutLabel = serviceShortcutButton.querySelector(".service-shortcut-pill");

            if (shortcutLabel) {
                shortcutLabel.textContent = shortcutTranslations[activeLang] || shortcutTranslations.tr;
            }
        }

        updateShortcutButtonLabel();

        document.getElementById("lang-switch")?.addEventListener("click", updateShortcutButtonLabel);
        document.getElementById("lang-switch-desktop")?.addEventListener("click", updateShortcutButtonLabel);

        serviceShortcutButton.addEventListener("click", function () {
            document.body.classList.add("page-transition-out");
            window.setTimeout(function () {
                window.location.href = "services.html#service-detail-intro-card";
            }, 260);
        });
    }

    function toggleScrollButton() {
        if (window.scrollY > 250) {
            scrollButton.classList.add("visible");
            if (serviceShortcutButton) serviceShortcutButton.classList.add("visible");
        } else {
            scrollButton.classList.remove("visible");
            if (serviceShortcutButton) serviceShortcutButton.classList.remove("visible");
        }
    }

    scrollButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", toggleScrollButton, { passive: true });
    toggleScrollButton();

});


// =============================
// SERVICE INTRO CARD
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const introCard = document.getElementById("service-detail-intro-card");
    const introToggle = document.getElementById("service-intro-toggle");
    const introCopy = document.getElementById("service-intro-copy");
    const introGallerySecondary = document.getElementById("service-intro-gallery-secondary");
    const galleryItems = Array.from(document.querySelectorAll(".service-gallery-item"));

    if (!introCard || !introToggle) return;

    introCard.classList.add("service-block-persistent-highlight");

    if (window.location.hash === "#service-detail-intro-card") {
        window.setTimeout(function () {
            const offsetTop = introCard.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({
                top: Math.max(offsetTop, 0),
                behavior: "smooth"
            });

            introCard.classList.add("service-block-highlight");
            window.setTimeout(function () {
                introCard.classList.remove("service-block-highlight");
            }, 2200);
        }, 180);
    }

    let lightbox = document.querySelector(".service-image-lightbox");
    let currentLightboxIndex = -1;

    function updateLightboxNavIcons() {
        if (!lightbox) return;

        const prevButton = lightbox.querySelector(".service-lightbox-prev");
        const nextButton = lightbox.querySelector(".service-lightbox-next");
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (!prevButton || !nextButton) return;

        prevButton.innerHTML = isMobile ? "&#9650;" : "&#10094;";
        nextButton.innerHTML = isMobile ? "&#9660;" : "&#10095;";
    }

    function showLightboxImage(index) {
        if (!lightbox || galleryItems.length === 0) return;

        currentLightboxIndex = (index + galleryItems.length) % galleryItems.length;

        const activeItem = galleryItems[currentLightboxIndex];
        const overlayImage = lightbox.querySelector("img");
        overlayImage.src = activeItem.getAttribute("data-image-src") || "";
        overlayImage.alt = activeItem.getAttribute("data-image-alt") || "";
    }

    function ensureLightbox() {
        if (lightbox) return lightbox;

        lightbox = document.createElement("div");
        lightbox.className = "service-image-lightbox";
        lightbox.innerHTML = [
            '<button class="service-lightbox-nav service-lightbox-prev" type="button" aria-label="Önceki görsel"></button>',
            '<img alt="">',
            '<button class="service-lightbox-nav service-lightbox-next" type="button" aria-label="Sonraki görsel"></button>'
        ].join("");
        document.body.appendChild(lightbox);
        updateLightboxNavIcons();

        lightbox.addEventListener("click", function () {
            lightbox.classList.remove("open");
        });

        lightbox.querySelector(".service-lightbox-prev").addEventListener("click", function (event) {
            event.stopPropagation();
            showLightboxImage(currentLightboxIndex - 1);
        });

        lightbox.querySelector(".service-lightbox-next").addEventListener("click", function (event) {
            event.stopPropagation();
            showLightboxImage(currentLightboxIndex + 1);
        });

        lightbox.querySelector("img").addEventListener("click", function (event) {
            event.stopPropagation();
        });

        return lightbox;
    }

    introToggle.addEventListener("click", function () {
        const isExpanded = introCard.classList.toggle("expanded");
        introCard.classList.toggle("gallery-open", isExpanded);
        introToggle.setAttribute("aria-expanded", String(isExpanded));
        introCard.classList.add("is-transitioning");
        introCard.classList.remove("service-block-persistent-highlight");

        if (introCopy) {
            introCopy.classList.toggle("is-hidden", isExpanded);
        }

        if (introGallerySecondary) {
            if (isExpanded) {
                introGallerySecondary.hidden = false;
                window.setTimeout(function () {
                    introGallerySecondary.classList.add("is-visible");
                    introCard.classList.remove("is-transitioning");
                }, 80);
            } else {
                introGallerySecondary.classList.remove("is-visible");
                window.setTimeout(function () {
                    introGallerySecondary.hidden = true;
                    introCard.classList.remove("is-transitioning");
                }, 320);
            }
        } else {
            introCard.classList.remove("is-transitioning");
        }
    });

    galleryItems.forEach(function (item, index) {
            item.addEventListener("click", function () {
                const overlay = ensureLightbox();
                showLightboxImage(index);
                overlay.classList.add("open");
            });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox) {
            lightbox.classList.remove("open");
        } else if (event.key === "ArrowLeft" && lightbox && lightbox.classList.contains("open")) {
            showLightboxImage(currentLightboxIndex - 1);
        } else if (event.key === "ArrowRight" && lightbox && lightbox.classList.contains("open")) {
            showLightboxImage(currentLightboxIndex + 1);
        }
    });

    window.addEventListener("resize", updateLightboxNavIcons);

});
