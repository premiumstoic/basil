import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        navbar: {
            title: 'Reyhanlı Kartlar',
            addCard: 'Add Card',
            login: 'Login',
            signup: 'Sign Up',
            logout: 'Logout',
            settings: 'Settings',
        },
        login: {
            welcomeTitle: 'Welcome Back',
            welcomeDesc: 'The login modal should open automatically. If it doesn\'t, please refresh the page.',
            openButton: 'Open Login',
        },
        signup: {
            title: 'Join Reyhanlı Kartlar',
            desc: 'The signup modal should open automatically. If it doesn\'t, please refresh the page.',
            openButton: 'Open Sign Up',
        },
        addCard: {
            pageTitle: 'Add New Card for Reyhan',
            pageDesc: 'Share a moment with Reyhan',
            labels: {
                illustration: 'Illustration',
                chooseImage: 'Choose an image',
                title: 'Title',
                description: 'Description',
                category: 'Category (optional)',
                music: 'Add Music (optional)',
            },
            placeholders: {
                title: "e.g., Miyazaki's Wind Philosophy",
                description: 'Tell Reyhan your thoughts...',
                category: 'e.g., Film, Literature, Art, Music',
                musicUrl: 'Spotify, YouTube, or SoundCloud URL',
            },
            buttons: {
                noMusic: 'No Music',
                url: 'URL',
                upload: 'Upload',
                chooseFile: 'Choose MP3 file',
                submit: 'Create Card',
                submitting: 'Creating Card...',
            },
            categories: ['Film', 'Literature', 'Art', 'Music', 'Philosophy', 'History', 'Nature', 'Memories'],
            errors: {
                noImage: 'Please upload an image',
                imageTooLarge: 'Image size must be less than 4.5MB',
            },
        },
        home: {
            loading: 'Loading Reyhan\'s cards...',
            noCards: 'No cards for Reyhan yet',
            noCardsDesc: 'Help Reyhan build her collection by adding the first card!',
            title: "Reyhan's Card Collection",
            desc: 'A collection of cards for Reyhan',
        },
        card: {
            hasMusic: 'Has music',
            deleteConfirm: 'Are you sure you want to delete this card?',
            deleteError: 'Error deleting card: ',
        },
        detail: {
            loading: 'Loading card...',
            notFound: 'Card Not Found',
            notFoundDesc: "The card you're looking for doesn't exist or has been removed.",
            backToHome: "Back to Reyhan's Collection",
            share: 'Share this Card',
            scanToView: 'Scan to view this card or download the QR code to print it.',
            downloadQr: 'Download QR Code',
            scrollForDetails: 'Scroll for details',
        },
        player: {
            spotify: 'Listen on Spotify',
            youtube: 'Watch on YouTube',
            external: 'Listen on external platform',
            audio: 'Audio',
        },
        settings: {
            title: 'Settings',
            theme: 'Theme',
            language: 'Language',
            system: 'System',
            light: 'Light',
            dark: 'Dark',
            about: 'About',
            aboutDesc: "A collection of cards for Reyhan",
        },
    },
    tr: {
        navbar: {
            title: 'Reyhanlı Kartlar',
            addCard: 'Kart Ekle',
            login: 'Giriş Yap',
            signup: 'Kayıt Ol',
            logout: 'Çıkış Yap',
            settings: 'Ayarlar',
        },
        login: {
            welcomeTitle: 'Tekrar Hoşgeldiniz',
            welcomeDesc: 'Giriş ekranı otomatik olarak açılmalıdır. Açılmazsa lütfen sayfayı yenileyin.',
            openButton: 'Giriş Ekranını Aç',
        },
        signup: {
            title: 'Reyhanlı Kartlar\'a Katıl',
            desc: 'Kayıt ekranı otomatik olarak açılmalıdır. Açılmazsa lütfen sayfayı yenileyin.',
            openButton: 'Kayıt Ekranını Aç',
        },
        addCard: {
            pageTitle: 'Reyhan İçin Kart Ekle',
            pageDesc: 'Reyhan ile bir kart paylaş',
            labels: {
                illustration: 'İllüstrasyon',
                chooseImage: 'Resim seç',
                title: 'Başlık',
                description: 'Açıklama',
                category: 'Kategori (opsiyonel)',
                music: 'Müzik Ekle (opsiyonel)',
            },
            placeholders: {
                title: 'ör. Sezai Karakoç - Monna Rosa',
                description: "Reyhan'a düşüncelerini anlat...",
                category: 'ör. Film, Edebiyat, Sanat, Müzik',
                musicUrl: 'Spotify, YouTube veya SoundCloud bağlantısı',
            },
            buttons: {
                noMusic: 'Müzik Yok',
                url: 'Bağlantı',
                upload: 'Yükle',
                chooseFile: 'MP3 dosyası seç',
                submit: 'Kart Oluştur',
                submitting: 'Kart Oluşturuluyor...',
            },
            categories: ['Film', 'Edebiyat', 'Sanat', 'Müzik', 'Felsefe', 'Tarih', 'Doğa', 'Hatıralar'],
            errors: {
                noImage: 'Lütfen bir görsel yükleyin',
                imageTooLarge: 'Görsel boyutu 4.5MB\'dan küçük olmalıdır',
            },
        },
        home: {
            loading: 'Kartlar yükleniyor...',
            noCards: 'Reyhan için henüz kart yok',
            noCardsDesc: "Reyhan'a ilk kartı hediye ederek koleksiyonuna başla!",
            title: "Reyhan'ın Kart Koleksiyonu",
            desc: 'Reyhan için özel seçilmiş anlar',
            loadMore: 'Daha Fazla Yükle',
        },
        card: {
            hasMusic: 'Müzik var',
            deleteConfirm: 'Bu kartı silmek istediğinizden emin misiniz?',
            deleteError: 'Kart silinirken hata oluştu: ',
        },
        detail: {
            loading: 'Kart yükleniyor...',
            notFound: 'Kart Bulunamadı',
            notFoundDesc: 'Aradığınız kart mevcut değil veya silinmiş.',
            backToHome: "Reyhan'ın Koleksiyonuna Dön",
            share: 'Bu Kartı Paylaş',
            scanToView: 'Bu kartı görüntülemek için taratın veya yazdırmak için QR kodunu indirin.',
            downloadQr: 'QR Kodunu İndir',
            scrollForDetails: 'Detaylar için kaydırın',
        },
        player: {
            spotify: 'Spotify\'da Dinle',
            youtube: 'YouTube\'da İzle',
            external: 'Harici platformda dinle',
            audio: 'Ses Dosyası',
        },
        settings: {
            title: 'Ayarlar',
            theme: 'Tema',
            language: 'Dil',
            system: 'Sistem',
            light: 'Açık',
            dark: 'Koyu',
            about: 'Hakkında',
            aboutDesc: "Reyhan için özel seçilmiş kartlar",
        },
    },
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('tr'); // Default to Turkish as requested

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'tr' : 'en'));
    };

    const t = (path) => {
        return path.split('.').reduce((obj, key) => obj?.[key], translations[language]) || path;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
