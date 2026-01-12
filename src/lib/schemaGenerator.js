// src/lib/schemaGenerator.js

// Función base para el negocio
function buildBaseBusinessSchema(config, siteUrl) {
    return {
        "@type": "LocalBusiness",
        "name": config.companyName,
        "address": { "@type": "PostalAddress", "streetAddress": config.address },
        "telephone": config.phone,
        "email": config.email,
        "url": siteUrl || config.url || "",
        "logo": config.logoUrl,
        "openingHours": config.openingHours,
    };
}

// Generador principal
export function generateSchema(pageData, config, astroUrl) {
    const { type, data } = pageData;
    const siteUrl = astroUrl.origin; // Obtenemos la URL base del sitio

    // Actualizamos la URL en la configuración base
    const baseBusiness = buildBaseBusinessSchema({ ...config, url: siteUrl });

    switch (type) {
        case 'WebSite':
            return {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": siteUrl,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/buscar?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            };

        case 'LocalBusiness':
            return {
                "@context": "https://schema.org",
                ...baseBusiness
            };

        case 'ItemList':
            return {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": data.name,
                "description": data.description,
                "numberOfItems": data.items.length,
                "itemListElement": data.items.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `${siteUrl}${item.url}`,
                    "name": item.name
                }))
            };
        case 'BlogPosting':
            return {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": data.headline,
                "description": data.description,
                "image": `${siteUrl}${data.image}`,
                "author": {
                    "@type": "Person",
                    "name": data.author
                },
                "publisher": {
                    "@type": "Organization",
                    "name": config.companyName,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${siteUrl}${config.logoUrl}`
                    }
                },
                "datePublished": data.datePublished
            };
        case 'Product':
            return {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": data.name,
                "description": data.description,
                "image": data.image ? `${siteUrl}${data.image}` : undefined,
                "offers": {
                    "@type": "Offer",
                    "price": data.offers?.price,
                    "priceCurrency": data.offers?.priceCurrency || "EUR",
                    "url": `${siteUrl}${data.url}`
                }
            };
        case 'Service':
            return {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": data.title,
                "description": data.description,
                "provider": baseBusiness,
            };

        // Aquí podríamos añadir más casos: 'Product', 'BlogPosting', 'Restaurant', etc.

        default:
            return undefined;
    }
}