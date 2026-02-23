// src/lib/schemaGenerator.js

// Función base para el negocio (Mejorada para InternetService)
function buildBaseBusinessSchema(config, siteUrl) {
    return {
        "@type": config.businessType || "InternetService",
        "name": config.companyName,
        "legalName": config.legalName,
        "image": `${siteUrl}${config.logoUrl}`,
        "@id": `${siteUrl}/#organization`,
        "url": siteUrl,
        "telephone": config.phone,
        "email": config.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": config.address.streetAddress,
            "addressLocality": config.address.addressLocality,
            "postalCode": config.address.postalCode,
            "addressRegion": config.address.addressRegion,
            "addressCountry": config.address.addressCountry
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "37.9405", // Deberías poner la latitud real de El Palmar
            "longitude": "-1.1444" // Deberías poner la longitud real de El Palmar
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "05:00",
            "closes": "23:00"
        },
        "sameAs": Object.values(config.social).filter(Boolean)
    };
}

// Generador principal
export function generateSchema(pageData, config, astroUrl) {
    const { type, data } = pageData;
    const siteUrl = astroUrl.origin;

    const baseBusiness = buildBaseBusinessSchema(config, siteUrl);

    switch (type) {
        case 'WebSite':
            return {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": config.companyName,
                "description": config.defaultDescription,
                "publisher": {
                    "@id": `${siteUrl}/#organization`
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/buscar?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            };

        case 'LocalBusiness': // Usado para la página de Contacto
            return {
                "@context": "https://schema.org",
                ...baseBusiness
            };

        case 'Service': // Usado para páginas de cobertura locales (ej: /cobertura/murcia)
            return {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": data.title, // Ej: "Instalación de Fibra Óptica"
                "description": data.description,
                "provider": {
                    "@id": `${siteUrl}/#organization`
                },
                "areaServed": {
                    "@type": "City",
                    "name": data.areaServed // Ej: "Cartagena"
                }
            };

        case 'Product': // Usado para páginas individuales de tarifas (/tarifas/fibra-300)
            return {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": data.name,
                "description": data.description,
                "brand": {
                    "@type": "Brand",
                    "name": config.companyName
                },
                "offers": {
                    "@type": "Offer",
                    "url": `${siteUrl}${data.url}`,
                    "priceCurrency": data.offers?.priceCurrency || "EUR",
                    "price": data.offers?.price,
                    "availability": "https://schema.org/InStock",
                    "seller": {
                        "@id": `${siteUrl}/#organization`
                    }
                }
            };

        case 'ItemList': // Usado para el index de Tarifas o Listado de Cobertura
            return {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": data.name,
                "description": data.description,
                "itemListElement": data.items.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `${siteUrl}${item.url}`,
                    "name": item.name
                }))
            };

        case 'FAQPage': // ¡NUEVO! Crucial para SEO en 2024/2025
            return {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": data.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            };

        default:
            return undefined;
    }
}