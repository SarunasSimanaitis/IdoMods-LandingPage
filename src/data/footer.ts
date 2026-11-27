import facebook from '../assets/icons/social-facebook.svg'
import instagram from '../assets/icons/social-instagram.svg'
import tiktok from '../assets/icons/social-tiktok.svg'
import youtube from '../assets/icons/social-youtube.svg'
import payVisa from '../assets/footer/pay-visa.png'
import payMastercard from '../assets/footer/pay-mastercard.png'
import payPayu from '../assets/footer/pay-payu.png'
import payPaypal from '../assets/footer/pay-paypal.png'
import payInpost from '../assets/footer/pay-inpost.png'
import payDpd from '../assets/footer/pay-dpd.png'
import payPaczkaWRuchu from '../assets/footer/pay-paczka-w-ruchu.png'
import payDhl from '../assets/footer/pay-dhl.png'
import payGls from '../assets/footer/pay-gls.png'
import payPocztaPolska from '../assets/footer/pay-poczta-polska.png'
import awardDobryGust from '../assets/footer/award-dobry-gust.png'
import awardOrly from '../assets/footer/award-orly-oswietlenia.png'
import awardGazele from '../assets/footer/award-gazele-biznesu-2021.png'
import awardSolidnaFirma from '../assets/footer/award-solidna-firma-2021.png'
import awardGwarancjaJakosci from '../assets/footer/award-polska-gwarancja-jakosci.png'
import awardGodnaZaufania from '../assets/footer/award-firma-godna-zaufania.png'
import flagPl from '../assets/flags/flag-pl.svg'
import flagDe from '../assets/flags/flag-de.svg'
import flagEs from '../assets/flags/flag-es.svg'
import flagRo from '../assets/flags/flag-ro.svg'
import flagFr from '../assets/flags/flag-fr.svg'
import flagGb from '../assets/flags/flag-gb.svg'
import flagNl from '../assets/flags/flag-nl.svg'
import flagSe from '../assets/flags/flag-se.svg'

export const socialLinks: { label: string; icon: string; href: string; width?: number; height?: number }[] = [
  { label: 'Facebook', icon: facebook, href: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: instagram, href: 'https://www.instagram.com/' },
  // The TikTok glyph is 14×16 inside its 24px box in Figma.
  { label: 'TikTok', icon: tiktok, href: 'https://www.tiktok.com/', width: 14, height: 16 },
  { label: 'YouTube', icon: youtube, href: 'https://www.youtube.com/' },
]

const link = (label: string) => ({ label, href: '#' })

export const linkColumns = [
  {
    title: 'Moje zamówienia',
    links: ['Status zamówienia', 'Śledzenie przesyłki', 'Chcę zareklamować produkt', 'Informacje o wymianie', 'Kontakt'].map(link),
  },
  {
    title: 'Moje konto',
    links: ['Zarejestruj się', 'Koszyk', 'Listy zakupowe', 'Lista zakupionych produktów', 'Historia transakcji', 'Moje rabaty'].map(link),
  },
  {
    title: 'Regulaminy',
    links: ['Sposoby wysyłki', 'Sposoby płatności', 'Regulamin sklepu', 'Polityka prywatności', 'Polityka bezpieczeństwa', 'Zmień ustawienia ciasteczek'].map(link),
  },
  {
    title: 'Informacje',
    links: ['O nas', 'FAQ', 'Kurs światła', 'Inspiracje', 'Marka premium', 'Gwarancja', 'Konfigurator 3D'].map(link),
  },
  {
    // Figma has the typo "Wpsółpraca"; corrected here.
    title: 'Współpraca',
    links: ['Dla Architekta', 'Modele 3D', 'Dystrybucja'].map(link),
  },
]

export const paymentLogos = [
  { name: 'Visa', src: payVisa },
  { name: 'Mastercard', src: payMastercard },
  { name: 'PayU', src: payPayu },
  { name: 'PayPal', src: payPaypal },
  { name: 'InPost', src: payInpost },
  { name: 'DPD', src: payDpd },
  { name: 'Paczka w RUCHu', src: payPaczkaWRuchu },
  { name: 'DHL', src: payDhl },
  { name: 'GLS', src: payGls },
  { name: 'Poczta Polska', src: payPocztaPolska },
]

/** Sizes are the exact Figma boxes, so the award logos line up as designed. */
export const awards = [
  { name: 'Dobry Gust – kliknij i sprawdź', src: awardDobryGust, width: 96, height: 44 },
  { name: 'Orły Oświetlenia', src: awardOrly, width: 96, height: 43 },
  { name: 'Gazele Biznesu 2021', src: awardGazele, width: 94, height: 43 },
  { name: 'Solidna Firma 2021', src: awardSolidnaFirma, width: 96, height: 43 },
  { name: 'Polska Gwarancja Jakości', src: awardGwarancjaJakosci, width: 96, height: 43 },
  { name: 'Firma Godna Zaufania', src: awardGodnaZaufania, width: 51, height: 42 },
]

export const stores = [
  { country: 'Polska', flag: flagPl },
  { country: 'Niemcy', flag: flagDe },
  { country: 'Hiszpania', flag: flagEs },
  { country: 'Rumunia', flag: flagRo },
  { country: 'Francja', flag: flagFr },
  { country: 'Wielka Brytania', flag: flagGb },
  { country: 'Holandia', flag: flagNl },
  { country: 'Szwecja', flag: flagSe },
]
