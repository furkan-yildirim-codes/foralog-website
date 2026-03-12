// =============================
// NAVBAR & HAMBURGER
// =============================
document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
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
            whyTitle: "Neden Fora Lojistik?",
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

            footerText: "© 2026 Foralog. Tüm hakları saklıdır.",

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

            whyTitle: "Why Fora Logistics?",
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

            footerText: "© 2026 Foralog. All rights reserved.",

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

            whyTitle: "Warum Fora Logistik?",
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

            footerText: "© 2026 Foralog. Alle Rechte vorbehalten.",

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

    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-to-top";
    scrollButton.type = "button";
    scrollButton.setAttribute("aria-label", "Sayfanin basina don");
    scrollButton.innerHTML = "&#8593;";

    document.body.appendChild(scrollButton);

    function toggleScrollButton() {
        if (window.scrollY > 250) {
            scrollButton.classList.add("visible");
        } else {
            scrollButton.classList.remove("visible");
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
