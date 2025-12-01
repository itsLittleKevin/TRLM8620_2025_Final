import { locale, updateLocale } from '../app.js';

var stringsJSON = {};

const i18n = {

    //load resource json based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            console.log(`Loading strings for locale: ${newLocale}`);
            const response = await fetch(`./content/${newLocale}/strings.json`, options)
            console.log(`Response status: ${response.status} for ${newLocale}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            stringsJSON = await response.json();
            console.log(`Successfully loaded strings for ${newLocale}, keys:`, Object.keys(stringsJSON));
        } catch (err) {
            console.error(`Error loading strings for ${newLocale}:`, err);
            if (newLocale != "en-US") {
                console.log(`Falling back to en-US due to error`);
                updateLocale("en-US");
            }
        }
    },

    //load resource json based on locale
    getString: (view, key) => {
        return stringsJSON[view][key];
    },

    //determine the proper currency format based on locale and return html string
    formatCurrency: (price, color) => {
        let formatted;
        let converted = convertCurrency(price);
        formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyMap[locale] }).format(converted); //$NON-NLS-L$ 
        //return the formatted currency within template literal
        return `<h4>${formatted}</h4>`


    },
    //return the locale based link to html file within the 'static' folder
    getHTML: () => {
        return `${locale}/terms.html`; //$NON-NLS-L$ 
    },
    //format date accoring to locale
    formatDate: (date) => {
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat([locale, 'en-US'], options).format(date); //$NON-NLS-L$
    }
}

//used to determine the correct currency symbol
var currencyMap = {
    'en-US': 'USD',
    'zh-CN': 'CNY',
    'nl-NL': 'EUR'
};

//Currency conversion rates relative to USD (base currency)
//Updated as of December 2025 - these are approximate rates
var conversionRates = {
    'en-US': 1.0,      // USD (base)
    'zh-CN': 7.2,      // 1 USD = 7.2 CNY (RMB)
    'nl-NL': 0.92      // 1 USD = 0.92 EUR
};

//function to convert price from USD base to target locale currency
var convertCurrency = (price) => {
    const rate = conversionRates[locale] || 1.0;
    return price * rate;
}

export default i18n;