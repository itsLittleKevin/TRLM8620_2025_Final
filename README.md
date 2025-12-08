# Galaxy L10n Supplies - E-Commerce Platform
### Internationalized & Localized Shopping Website

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/itsLittleKevin/-TRLM8620_2025_Test)
[![Locales](https://img.shields.io/badge/Locales-3-green)](#supported-locales)
[![i18n](https://img.shields.io/badge/i18n-Compliant-success)](#features)

---

## 📖 About This Project

**Galaxy L10n Supplies** is a fully internationalized and localized e-commerce web application for intergalactic droids and vehicles. This project demonstrates professional internationalization (i18n) and localization (l10n) practices, transforming a single-locale application into a multi-language platform ready for global markets.

Originally developed as part of the TRLM8620 Localization course final project, this application showcases:
- ✅ **Complete i18n architecture** - No hard-coded strings, locale-aware formatting
- ✅ **Multi-locale support** - English (US), Dutch (Netherlands), Simplified Chinese (China)
- ✅ **Currency conversion** - Dynamic pricing in USD, EUR, and CNY
- ✅ **Professional translations** - Context-appropriate translations in all supported languages
- ✅ **Responsive localization** - Real-time locale switching without page reload

---

## 🌍 Supported Locales

| Locale | Language | Region | Currency | Status |
|--------|----------|--------|----------|--------|
| **en-US** | English | United States | USD ($) | ✅ Complete |
| **nl-NL** | Dutch (Nederlands) | Netherlands | EUR (€) | ✅ Complete |
| **zh-CN** | Simplified Chinese (简体中文) | China | CNY (¥) | ✅ Complete |

---

## ✨ Features

### Internationalization (i18n)
- 🚫 **Zero hard-coded strings** - All text externalized to locale-specific resource files
- 📅 **Locale-aware date formatting** - Dates display according to regional conventions
- 💰 **Currency conversion** - Prices automatically convert based on selected locale
- 🔢 **Number formatting** - Uses `Intl.NumberFormat` for proper thousands separators
- 🌐 **Dynamic locale switching** - Change language on-the-fly without reloading
- 📦 **Modular architecture** - Clean separation of content from code

### User Experience
- 🛒 **Full e-commerce functionality** - Browse, cart, checkout, order history
- 🤖 **Product catalog** - Droids and vehicles with detailed descriptions
- 🎨 **Responsive design** - Works on desktop and mobile devices
- 🔍 **Search capability** - Find products quickly
- 📊 **Order tracking** - View order history with localized dates and pricing

### Technical Excellence
- ⚡ **Fast loading** - Optimized resource loading per locale
- 🎯 **Standards-based** - Uses Web Intl API for formatting
- 🧪 **Thoroughly tested** - Validated across all supported locales
- 📝 **Well-documented** - Comprehensive project documentation
- 🔄 **Version controlled** - Full Git history with descriptive commits

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/itsLittleKevin/-TRLM8620_2025_Test.git
cd -TRLM8620_2025_Test

# Install dependencies
npm install

# Start the development server
npm run server
```

### Accessing the Application

Once the server is running, open your browser to:
- **Local:** http://127.0.0.1:8080
- **Network:** http://172.16.163.40:8080 (or your local IP)
- **Live Demo:** http://demo.itslittlekevin.com:9090

The locale selector in the top-right allows you to switch between English, Dutch, and Chinese.

---

## 📂 Project Structure

```
TRLM8620_2025/
├── src/
│   ├── content/              # Localized resources
│   │   ├── en-US/           # English (US) strings
│   │   ├── nl-NL/           # Dutch strings
│   │   └── zh-CN/           # Simplified Chinese strings
│   ├── services/            # Core services
│   │   └── i18n.js          # Internationalization module
│   ├── views/               # UI components
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   └── classes/         # Business logic classes
│   ├── img/                 # Product images and assets
│   ├── css/                 # Stylesheets
│   └── index.html           # Entry point
├── LOCALIZATION_PROJECT_PLAN.md    # Part 1: L10n strategy
├── PROJECT_REFLECTION.md           # Part 3: Team learnings
├── package.json
└── README.md                # This file
```

---

## 📚 Documentation

### 📋 [Localization Project Plan](./LOCALIZATION_PROJECT_PLAN.md)
Comprehensive localization strategy covering:
- Planning stage: timeline, resources, stakeholders
- Design stage: UI localizability considerations
- Development stage: i18n implementation workflow
- Testing stage: QA and linguistic validation
- Maintenance: keeping the application localized

### 💭 [Project Reflection](./PROJECT_REFLECTION.md)
Team learnings and insights including:
- i18n challenges encountered and solutions
- Localization implementation experience
- Technical learnings (Git, testing, debugging)
- Collaboration and project management
- Personal growth and key takeaways

---

## 🛠️ Technical Implementation

### i18n Issues Fixed

This project successfully resolved **5 critical internationalization issues**:

1. ✅ **Hard-coded Strings (2x)**
   - Welcome message in `Home.js`
   - Currency symbol in `OrderHistory.js`
   - **Solution:** Externalized to `strings.json` files

2. ✅ **Content Fragmentation**
   - Currency symbol separated from amount
   - **Solution:** Unified using `i18n.formatCurrency()`

3. ✅ **Non-global Date Format**
   - Hard-coded US date format (MM/DD/YYYY)
   - **Solution:** Implemented `Intl.DateTimeFormat` for locale-aware dates

4. ✅ **Incorrect Currency Format**
   - Manual comma insertion for thousands
   - **Solution:** Used `Intl.NumberFormat` with currency style

5. ✅ **Currency Conversion**
   - Same numeric values across all locales
   - **Solution:** Implemented conversion rates (USD base)

### Key Technologies

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **i18n Framework:** Custom module using Web Intl API
- **Build Tool:** live-server for development
- **Version Control:** Git + GitHub
- **Package Manager:** npm

---

## 💡 Internationalization Best Practices Demonstrated

### Do's ✅
- Use locale-specific resource files (`strings.json`)
- Leverage `Intl` APIs for formatting
- Design UI for text expansion (20-30%)
- Test in all target locales
- Keep content and code separate
- Use parameterized strings for dynamic content

### Don'ts ❌
- Hard-code user-facing text
- Concatenate strings for dynamic content
- Manually format dates, numbers, or currency
- Assume US formats are universal
- Fragment translatable content
- Forget to test with actual translations

---

## 🎯 Project Goals & Achievements

### Goals
- [x] Fix all i18n issues in the codebase
- [x] Add support for Dutch (nl-NL) and Chinese (zh-CN)
- [x] Implement currency conversion
- [x] Create comprehensive project documentation
- [x] Demonstrate professional localization practices

### Impact
- **Expanded market reach:** Application now accessible to Netherlands and China markets
- **Improved UX:** Users can interact in their native language with familiar formats
- **Scalable architecture:** Easy to add new locales in the future
- **Professional quality:** Production-ready localization implementation

---

## 🤝 Contributing

This is an educational project demonstrating localization best practices. While not actively seeking contributions, the codebase serves as a reference for:
- Implementing internationalization from scratch
- Setting up locale-specific resource files
- Using Web Intl APIs effectively
- Testing localized applications

---

## 📄 License

This project was created for educational purposes as part of the TRLM8620 course.

---

## 🙏 Acknowledgments

- **TRLM8620 Course** - For comprehensive localization education
- **Original Repository** - MarBreL10n/TRLM8620_2025
- **Web Intl API** - For powerful internationalization capabilities
- **Our Team** - For collaboration and dedication to quality

---

## 📞 Contact

**Team:** Galaxy L10n Supplies Localization Team  
**Repository:** [github.com/itsLittleKevin/-TRLM8620_2025_Test](https://github.com/itsLittleKevin/-TRLM8620_2025_Test)  
**Course:** TRLM8620 - Localization Management  
**Date:** December 2025

---

<div align="center">

**[🌐 View Project Plan](./LOCALIZATION_PROJECT_PLAN.md)** | **[💭 Read Reflection](./PROJECT_REFLECTION.md)** | **[🚀 Live Demo](http://demo.itslittlekevin.com:9090)**

Made with ❤️ and a commitment to global accessibility

</div>
