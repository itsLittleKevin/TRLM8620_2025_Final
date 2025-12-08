# i18n Improvements: Before vs After

## Overview
This document compares the sample project (TRLM8620_2025) with the complete implementation (TRLM8620_2025_Final) to show how five critical i18n issues were identified and resolved.

---

## Issue 1: Hard-coded String #1 - "Delivered" Status

### Problem
Order status fell back to a hard-coded English string instead of using localized resource bundles.

### Before (TRLM8620_2025)
**File:** `src/views/classes/Order.js`
```javascript
getOrderStatus() {
    let oneDay = 24*60*60*1000;
    let now = new Date();
    var diffDays = Math.floor(Math.abs((this.orderDate.getTime() - now.getTime())/(oneDay)));

    if(diffDays < 2) {
        return i18n.getString("Order", "statusProcessing");
    }
    if(diffDays < 4) {
        return i18n.getString("Order", "statusShipped");
    }
    else{
        return "Delivered";  // ❌ HARD-CODED ENGLISH STRING
    }
}
```

### After (TRLM8620_2025_Final)
**File:** `src/views/classes/Order.js`
```javascript
getOrderStatus() {
    let oneDay = 24*60*60*1000;
    let now = new Date();
    var diffDays = Math.floor(Math.abs((this.orderDate.getTime() - now.getTime())/(oneDay)));

    if(diffDays < 2) {
        return i18n.getString("Order", "statusProcessing");
    }
    if(diffDays < 4) {
        return i18n.getString("Order", "statusShipped");
    }
    else{
        return i18n.getString("Order", "statusDelivered");  // ✅ LOCALIZED
    }
}
```

**Strings added to bundles:**
```json
// en-US/strings.json
"Order": {
    "statusDelivered": "Delivered"
}

// nl-NL/strings.json
"Order": {
    "statusDelivered": "Bezorgd"
}

// zh-CN/strings.json
"Order": {
    "statusDelivered": "已送达"
}
```

---

## Issue 2: Hard-coded String #2 - Checkout Warning Banner

### Problem
Warning message on checkout page was hard-coded in English in the HTML template.

### Before (TRLM8620_2025)
**File:** `src/views/pages/Checkout.js`
```javascript
let view = `
<section class="checkout">
    <div class="checkoutDetails">
        <h2 class="center">Students: Please ignore any i18n errors on this page! (Incl. name order, date input, etc.)</h2>
        <!-- ❌ HARD-CODED ENGLISH TEXT -->
        <h1>${checkoutTitle}</h1>
```

### After (TRLM8620_2025_Final)
**File:** `src/views/pages/Checkout.js`
```javascript
// Fetch localized string
let warningBanner = i18n.getString("Checkout", "warningBanner");

let view = `
<section class="checkout">
    <div class="checkoutDetails">
        <h2 class="center">${warningBanner}</h2>
        <!-- ✅ LOCALIZED FROM BUNDLE -->
        <h1>${checkoutTitle}</h1>
```

**Strings added to bundles:**
```json
// en-US/strings.json
"Checkout": {
    "warningBanner": "Students: Please ignore any i18n errors on this page! (Incl. name order, date input, etc.)"
}

// nl-NL/strings.json
"Checkout": {
    "warningBanner": "Studenten: negeer eventuele i18n-fouten op deze pagina (zoals naamvolgorde, datuminvoer, enz.)"
}

// zh-CN/strings.json
"Checkout": {
    "warningBanner": "请忽略本页的本地化问题（如姓名顺序、日期输入等）"
}
```

---

## Issue 3: Content Fragmentation - Browse Page Titles

### Problem
Page titles were built by concatenating string fragments, which breaks in languages with different word order.

### Before (TRLM8620_2025)
**File:** `src/views/pages/Browse.js`
```javascript
let title = i18n.getString("Browse", "browseTitleAll");  // "All"

if(type == "droids") {
    productMap = productList.get('droids');
    title += i18n.getString("Browse", "browseTitleDroids");  // " droids"
    // Result: "All" + " droids" = "All droids" ❌ CONCATENATION
}
else if(type == "vehicles") {
    productMap = productList.get('vehicles');
    title += i18n.getString("Browse", "browseTitleVehicles");  // " vehicles"
    // Result: "All" + " vehicles" = "All vehicles" ❌ CONCATENATION
}
```

**Original string fragments:**
```json
// en-US/strings.json
"Browse": {
    "browseTitleAll": "All",
    "browseTitleDroids": " droids",      // Fragment with leading space
    "browseTitleVehicles": " vehicles"   // Fragment with leading space
}
```

### After (TRLM8620_2025_Final)
**File:** `src/views/pages/Browse.js`
```javascript
let title;

if(type == "droids") {
    productMap = productList.get('droids');
    title = i18n.getString("Browse", "browseTitleDroids");  // ✅ COMPLETE PHRASE
}
else if(type == "vehicles") {
    productMap = productList.get('vehicles');
    title = i18n.getString("Browse", "browseTitleVehicles");  // ✅ COMPLETE PHRASE
}
else {
    productMap = productList.get('droids');
    title = i18n.getString("Browse", "browseTitleAll");  // ✅ COMPLETE PHRASE
}
```

**Complete localized phrases:**
```json
// en-US/strings.json
"Browse": {
    "browseTitleAll": "All products",
    "browseTitleDroids": "All droids",
    "browseTitleVehicles": "All vehicles"
}

// nl-NL/strings.json
"Browse": {
    "browseTitleAll": "Alle producten",
    "browseTitleDroids": "Alle droïden",
    "browseTitleVehicles": "Alle voertuigen"
}

// zh-CN/strings.json
"Browse": {
    "browseTitleAll": "所有产品",
    "browseTitleDroids": "所有机器人",
    "browseTitleVehicles": "所有飞行器"
}
```

---

## Issue 4: Non-global Date Format

### Problem
Dates were manually formatted as MM/DD/YYYY (US-centric), which doesn't work for other locales.

### Before (TRLM8620_2025)
**File:** `src/views/classes/Order.js`
```javascript
getOrderDate() {
    var dd = String(this.orderDate.getDate()).padStart(2, '0');
    var mm = String(this.orderDate.getMonth() + 1).padStart(2, '0');
    var yyyy = this.orderDate.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;  // ❌ HARD-CODED US FORMAT: 12/07/2025
    return date;
}
```

**Issues:**
- Always returns MM/DD/YYYY regardless of locale
- Different countries use DD/MM/YYYY, YYYY-MM-DD, etc.
- No localized month/day names
- No weekday information

### After (TRLM8620_2025_Final)
**File:** `src/views/classes/Order.js`
```javascript
getOrderDate() {
    return i18n.formatDate(this.orderDate);  // ✅ LOCALE-AWARE FORMATTING
}
```

**File:** `src/services/i18n.js`
```javascript
formatDate: (date) => {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat([locale, 'en-US'], options).format(date);
}
```

**Results by locale:**
- **en-US:** "Sat, Dec 7, 2025"
- **nl-NL:** "za 7 dec. 2025"
- **zh-CN:** "2025年12月7日周六"

---

## Issue 5: Incorrect Currency Format

### Problem
Currency was manually formatted with hard-coded "$" symbol and comma separators, ignoring locale-specific currency symbols and number formatting.

### Before (TRLM8620_2025)
**File:** `src/views/pages/OrderHistory.js`
```javascript
// Manual comma insertion function
let formatCurrencyWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

orderHistory.forEach((order, key) => {
    view += `
        <article class="orderItem">
            <h3>${order.getOrderDate()}</h3>
            <h3>${order.orderNumber}</h3>
            <div class="gridPrice">
                $                                    <!-- ❌ HARD-CODED $ -->
                ${formatCurrencyWithCommas(order.total)}  <!-- ❌ MANUAL COMMAS -->
            </div>
            <h3>${order.getOrderStatus()}</h3>
        </article>`
});
```

**Issues:**
- Always shows "$" regardless of locale
- Uses comma as thousands separator (not universal)
- No currency conversion
- No proper currency symbol placement per locale

### After (TRLM8620_2025_Final)
**File:** `src/views/pages/OrderHistory.js`
```javascript
// Function removed entirely - using i18n service

orderHistory.forEach((order, key) => {
    view += `
        <article class="orderItem">
            <h3>${order.getOrderDate()}</h3>
            <h3>${order.orderNumber}</h3>
            <div class="gridPrice">
                ${i18n.formatCurrency(order.total, "w")}  // ✅ LOCALE-AWARE
            </div>
            <h3>${order.getOrderStatus()}</h3>
        </article>`
});
```

**File:** `src/services/i18n.js`
```javascript
formatCurrency: (price, color) => {
    let converted = convertCurrency(price);
    let formatted = new Intl.NumberFormat(locale, { 
        style: 'currency', 
        currency: currencyMap[locale] 
    }).format(converted);
    return `<h4>${formatted}</h4>`
},

// Currency mapping
var currencyMap = {
    'en-US': 'USD',
    'zh-CN': 'CNY',
    'nl-NL': 'EUR'
};

// Currency conversion rates relative to USD (base currency)
var conversionRates = {
    'en-US': 1.0,      // USD (base)
    'zh-CN': 7.2,      // 1 USD = 7.2 CNY (RMB)
    'nl-NL': 0.92      // 1 USD = 0.92 EUR
};

var convertCurrency = (price) => {
    const rate = conversionRates[locale] || 1.0;
    return price * rate;
}
```

**Results for price 3000 (USD base):**
- **en-US:** "$3,000.00" (3000 × 1.0)
- **nl-NL:** "€ 2.760,00" (3000 × 0.92, with European decimal separator)
- **zh-CN:** "¥21,600.00" (3000 × 7.2, Chinese Yuan symbol)

---

## Additional Improvements

### Enhanced Error Handling & Logging
**File:** `src/services/i18n.js`

**Before:**
```javascript
try {
    const response = await fetch(`./content/${newLocale}/strings.json`, options)
    stringsJSON = await response.json();
} catch (err) {
    console.log('Error getting strings', err);  // ❌ Minimal logging
    if (newLocale != "en-US") {
        updateLocale("en-US");
    }
}
```

**After:**
```javascript
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
    console.error(`Error loading strings for ${newLocale}:`, err);  // ✅ Detailed logging
    if (newLocale != "en-US") {
        console.log(`Falling back to en-US due to error`);
        updateLocale("en-US");
    }
}
```

### Complete Locale Coverage
Added third locale (zh-CN) with full translations across all UI components:
- Navbar, Home, Browse, Checkout, Cart, ProductShow
- Order History, Error pages
- Product titles and descriptions
- All UI labels, buttons, and messages

---

## Summary of Changes

| Issue | Type | Before | After | Files Changed |
|-------|------|--------|-------|---------------|
| Hard-coded "Delivered" | String externalization | Hard-coded English | Localized via bundle | Order.js, strings.json (×3) |
| Checkout banner | String externalization | Hard-coded English | Localized via bundle | Checkout.js, strings.json (×3) |
| Browse titles | Content fragmentation | Concatenated fragments | Complete phrases | Browse.js, strings.json (×3) |
| Date formatting | Format-sensitive data | MM/DD/YYYY hard-coded | Intl.DateTimeFormat | Order.js, i18n.js |
| Currency formatting | Format-sensitive data | "$" + commas | Intl.NumberFormat + conversion | OrderHistory.js, i18n.js |

---

## How to Verify

1. **Locale Switching:** Change locale selector between en-US, nl-NL, zh-CN and verify all text updates
2. **Date Format:** Check Order History - dates should follow locale conventions
3. **Currency Format:** Check prices throughout - should show proper symbol and conversion
4. **Browse Titles:** Navigate to droids/vehicles - titles should be grammatically correct in all locales
5. **Checkout Banner:** Open checkout page - warning should be translated
6. **Order Status:** Wait for orders to age - "Delivered" status should translate

---

## Files Modified

### Core i18n Service
- `src/services/i18n.js` - Enhanced logging, added currency conversion

### Views
- `src/views/pages/Checkout.js` - Localized warning banner
- `src/views/pages/Browse.js` - Fixed content fragmentation
- `src/views/pages/OrderHistory.js` - Replaced manual currency formatting
- `src/views/classes/Order.js` - Localized status string, locale-aware date formatting

### Locale Bundles (all three locales)
- `src/content/en-US/strings.json`
- `src/content/nl-NL/strings.json`
- `src/content/zh-CN/strings.json`
  - Added `Order.statusDelivered`
  - Added `Checkout.warningBanner`
  - Updated `Browse.browseTitleAll/Droids/Vehicles` to complete phrases
