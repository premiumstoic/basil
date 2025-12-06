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
            pageTitle: 'Add New Card',
            pageDesc: 'Share a cultural moment with your friends',
            labels: {
                illustration: 'Illustration',
                chooseImage: 'Choose an image',
                title: 'Title',
                description: 'Description',
                category: 'Category (optional)',
                music: 'Add Music (optional)',
            },
            placeholders: {
                title: 'e.g., Miyazaki\'s Wind Philosophy',
                description: 'Share your thoughts and insights...',
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
            errors: {
                noImage: 'Please upload an image',
            },
        },
        home: {
            loading: 'Loading cards...',
            noCards: 'No cards yet',
            noCardsDesc: 'Be the first to share a cultural card!',
            title: 'Cultural Cards Collection',
            desc: 'Discover moments of culture, one card at a time',
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
            backToHome: 'Back to All Cards',
        },
        player: {
            spotify: 'Listen on Spotify',
            youtube: 'Watch on YouTube',
            external: 'Listen on external platform',
            audio: 'Audio',
        },
    },
    tr: {
        navbar: {
            title: 'Reyhanlı Kartlar',
            addCard: 'Kart Ekle',
            login: 'Giriş Yap',
            signup: 'Kayıt Ol',
            logout: 'Çıkış Yap',
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
            pageTitle: 'Yeni Kart Ekle',
            pageDesc: 'Arkadaşlarınla kültürel bir an paylaş',
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
                description: 'Düşüncelerini ve içgörülerini paylaş...',
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
            errors: {
                noImage: 'Lütfen bir resim yükleyin',
            },
        },
        home: {
            loading: 'Kartlar yükleniyor...',
            noCards: 'Henüz kart yok',
            noCardsDesc: 'İlk kültürel kartı paylaşan sen ol!',
            title: 'Kültürel Kartlar Koleksiyonu',
            desc: 'Kültür anlarını keşfet, her seferinde bir kart',
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
            backToHome: 'Kartlara Dön',
        },
        player: {
            spotify: 'Spotify\'da Dinle',
            youtube: 'YouTube\'da İzle',
            external: 'Harici platformda dinle',
            audio: 'Ses Dosyası',
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
