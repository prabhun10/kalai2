/* ==========================================================================
   Kalaifashion2 — Boutique Configuration & Product Catalog
   Replace placeholder WhatsApp number, contact email, or product entries here.
   ========================================================================== */

(function (global) {
  'use strict';

  const CONFIG = {
    BRAND_NAME: 'Kalaifashion2',
    // Configurable WhatsApp phone number (country code + digits, no + or spaces)
    WHATSAPP_NUMBER: '919876543210',
    DISPLAY_PHONE: '+91 98765 43210',
    CONTACT_EMAIL: 'orders@kalaifashion2.example',
    INSTAGRAM_URL: 'https://www.instagram.com/kalaifashion2/',
    INSTAGRAM_HANDLE: '@kalaifashion2',
    BOUTIQUE_LOCATION: 'Tamil Nadu, India',
    FREE_SHIPPING_THRESHOLD: 4999,
    SHIPPING_FEE: 150
  };

  const IMAGES = {
    hero: '/src/assets/images/hero_south_indian_silk_1795518960922.jpg',
    sareeMaroon: '/src/assets/images/saree_kanchipuram_maroon_1795518961348.jpg',
    sareeEmerald: '/src/assets/images/saree_banarasi_gold_1795518961769.jpg',
    sareeCotton: '/src/assets/images/saree_cotton_ivory_1795518961939.jpg',
    sareeBridal: '/src/assets/images/saree_bridal_crimson_1795518962386.jpg',
    sareeChampagne: '/src/assets/images/saree_designer_champagne_1795518962342.jpg',
    dhotiWhite: '/src/assets/images/dhoti_traditional_white_1795518963345.jpg',
    dhotiWedding: '/src/assets/images/dhoti_kurta_wedding_1795518963588.jpg',
    kurtaFestive: '/src/assets/images/mens_kurta_festive_1795518963377.jpg',
    craftLoom: '/src/assets/images/craft_handloom_zari_1795518969206.jpg'
  };

  const PRODUCTS = [
    // ========================
    // SAREES COLLECTION (8)
    // ========================
    {
      id: 'kf-saree-01',
      name: 'Kanchipuram Temple Border Pure Silk Saree',
      category: 'sarees',
      subCategory: 'Kanchipuram Silk Sarees',
      price: 18500,
      originalPrice: 21500,
      colors: [
        { name: 'Temple Maroon', hex: '#6E1423' },
        { name: 'Antique Gold', hex: '#B58938' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: 'Pure Mulberry Silk & Tested Zari',
      weave: 'Handwoven Kanchipuram Korvai',
      care: 'Dry Clean Only',
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: true,
      releaseOrder: 14,
      images: [IMAGES.sareeMaroon, IMAGES.craftLoom, IMAGES.hero],
      shortDetails: 'Rich maroon mulberry silk woven with heritage gold zari temple borders and grand peacock pallu.',
      description: 'Handwoven in pure mulberry silk, this signature Kalaifashion2 Kanchipuram saree features traditional temple spires along the border, delicate buttas across the body, and an ornate antique gold zari pallu crafted for weddings and auspicious ceremonies.'
    },
    {
      id: 'kf-saree-02',
      name: 'Banarasi Kadwa Floral Brocade Silk Saree',
      category: 'sarees',
      subCategory: 'Banarasi Sarees',
      price: 14200,
      originalPrice: 16800,
      colors: [
        { name: 'Emerald Green', hex: '#1E5631' },
        { name: 'Antique Gold', hex: '#B58938' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: 'Katan Banarasi Silk',
      weave: 'Kadwa Floral Jaal Brocade',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: false,
      releaseOrder: 16,
      images: [IMAGES.sareeEmerald, IMAGES.craftLoom],
      shortDetails: 'Forest emerald Katan silk embellished with fine gold zari floral jaal motifs and tasselled pallu.',
      description: 'A timeless Banarasi Katan silk drape finished with intricate Kadwa floral vines in antique gold zari. Lightweight yet regal, suited for receptions, festive evenings, and family celebrations.'
    },
    {
      id: 'kf-saree-03',
      name: 'Chettinad Handloom Ivory Temple Cotton Saree',
      category: 'sarees',
      subCategory: 'Cotton Sarees',
      price: 3450,
      originalPrice: 3950,
      colors: [
        { name: 'Warm Ivory', hex: '#EDE4D3' },
        { name: 'Maroon Border', hex: '#6E1423' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: '100% Combed Handloom Cotton',
      weave: 'Traditional Chettinad Temple Border',
      care: 'Gentle Hand Wash in Cold Water',
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      isSpecialOffer: false,
      releaseOrder: 15,
      images: [IMAGES.sareeCotton, IMAGES.craftLoom],
      shortDetails: 'Breathable ivory handloom cotton finished with a classic maroon and gold gopuram temple border.',
      description: 'Woven for warm South Indian afternoons and graceful everyday elegance, this Chettinad cotton saree pairs crisp natural ivory pleats with an authentic maroon temple-inspired border.'
    },
    {
      id: 'kf-saree-04',
      name: 'Champagne Tissue Zari Scalloped Designer Saree',
      category: 'sarees',
      subCategory: 'Designer Sarees',
      price: 11800,
      originalPrice: 13500,
      colors: [
        { name: 'Champagne Gold', hex: '#D4B475' },
        { name: 'Muted Rosewood', hex: '#9E6B6B' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: 'Pure Silk Organza Tissue',
      weave: 'Scalloped Zari Cutwork Border',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: false,
      isSpecialOffer: true,
      releaseOrder: 17,
      images: [IMAGES.sareeChampagne, IMAGES.sareeBridal],
      shortDetails: 'Luminous champagne tissue silk accented by rosewood scalloped zari edges and subtle woven motifs.',
      description: 'Designed for modern receptions and sangeet evenings, this tissue silk saree catches ambient light with an understated metallic sheen and delicately embroidered scalloped borders.'
    },
    {
      id: 'kf-saree-05',
      name: 'Vermilion Peacock Bridal Muhurtham Silk Saree',
      category: 'sarees',
      subCategory: 'Bridal Sarees',
      price: 28900,
      originalPrice: 33000,
      colors: [
        { name: 'Bridal Crimson', hex: '#9E1B24' },
        { name: 'Pure Zari Gold', hex: '#C79B3B' }
      ],
      sizes: ['5.5m Saree + 0.9m Bridal Blouse'],
      fabric: 'Heavyweight 3-Ply Mulberry Silk',
      weave: 'Bridal Kanchipuram Full Zari Brocade',
      care: 'Dry Clean Only',
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: true,
      releaseOrder: 13,
      images: [IMAGES.sareeBridal, IMAGES.hero, IMAGES.sareeMaroon],
      shortDetails: 'Heirloom vermilion bridal silk richly woven with auspicious peacock medallions and gold zari.',
      description: 'Crafted as an heirloom bridal centerpiece, this heavy 3-ply Kanchipuram Muhurtham saree showcases densely woven gold zari peacocks and floral motifs from pleats to pallu.'
    },
    {
      id: 'kf-saree-06',
      name: 'Royal Maroon Heritage Korvai Traditional Saree',
      category: 'sarees',
      subCategory: 'Traditional Sarees',
      price: 9600,
      originalPrice: 11200,
      colors: [
        { name: 'Deep Maroon', hex: '#6E1423' },
        { name: 'Espresso Brown', hex: '#3B2316' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: 'Pure Soft Silk',
      weave: 'Traditional Rudraksham Border',
      care: 'Dry Clean Only',
      isNewArrival: false,
      isBestSeller: false,
      isFeatured: false,
      isSpecialOffer: false,
      releaseOrder: 10,
      images: [IMAGES.sareeMaroon, IMAGES.sareeBridal],
      shortDetails: 'Classic deep maroon soft silk saree with timeless Rudraksham border motifs for temple visits.',
      description: 'A poised traditional silk saree tailored for temple ceremonies, housewarmings, and milestone family rituals, combining fluid drape with heritage South Indian border detailing.'
    },
    {
      id: 'kf-saree-07',
      name: 'Mercerised Ivory & Maroon Daily Wear Saree',
      category: 'sarees',
      subCategory: 'Daily Wear Sarees',
      price: 2250,
      originalPrice: 2650,
      colors: [
        { name: 'Ivory Cream', hex: '#F3ECE0' },
        { name: 'Warm Sand', hex: '#C8B49A' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: 'Mercerised Cotton Silk Blend',
      weave: 'Fine Loom Plain with Woven Border',
      care: 'Mild Hand Wash',
      isNewArrival: false,
      isBestSeller: false,
      isFeatured: false,
      isSpecialOffer: true,
      releaseOrder: 9,
      images: [IMAGES.sareeCotton, IMAGES.sareeChampagne],
      shortDetails: 'Featherlight daily wear cotton-silk saree that holds neat pleats comfortably all day.',
      description: 'Designed for effortless daytime comfort, workwear, and casual gatherings, this breathable cotton-silk blend drapes smoothly without stiffness.'
    },
    {
      id: 'kf-saree-08',
      name: 'Emerald & Antique Gold Party Wear Silk Saree',
      category: 'sarees',
      subCategory: 'Party Wear Sarees',
      price: 12400,
      originalPrice: 14900,
      colors: [
        { name: 'Emerald Green', hex: '#1E5631' },
        { name: 'Champagne Gold', hex: '#D4B475' }
      ],
      sizes: ['5.5m Saree + 0.8m Blouse'],
      fabric: 'Lustrous Silk Satin Brocade',
      weave: 'Zari Floral Evening Drape',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: false,
      isSpecialOffer: false,
      releaseOrder: 18,
      images: [IMAGES.sareeEmerald, IMAGES.sareeChampagne],
      shortDetails: 'Statement emerald silk saree with luminous gold floral brocade ideal for evening festivities.',
      description: 'Vibrant emerald silk paired with shimmering antique gold floral work creates a dramatic silhouette for evening celebrations, cocktail receptions, and festive dinners.'
    },

    // ========================
    // DHOTI & KURTA COLLECTION (8)
    // ========================
    {
      id: 'kf-mens-01',
      name: 'Traditional White Kasavu Pure Silk Dhoti',
      category: 'dhoti-kurta',
      subCategory: 'Traditional White Dhoti',
      price: 3850,
      originalPrice: 4400,
      colors: [
        { name: 'Pure Ivory White', hex: '#FAF7F0' },
        { name: 'Gold Kasavu', hex: '#C79B3B' }
      ],
      sizes: ['Standard (4.0m Double)', '2.0m Single'],
      fabric: 'Pure Mulberry Silk',
      weave: '2-Inch Handwoven Gold Kasavu Border',
      care: 'Dry Clean Recommended',
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: false,
      releaseOrder: 12,
      images: [IMAGES.dhotiWhite, IMAGES.dhotiWedding],
      shortDetails: 'Crisp traditional white South Indian pure silk veshti finished with a classic gold kasavu border.',
      description: 'A quintessential South Indian white silk veshti woven with a gleaming 2-inch antique gold kasavu border. Soft, dignified, and breathable for weddings, temple ceremonies, and Onam or Pongal celebrations.'
    },
    {
      id: 'kf-mens-02',
      name: 'Kanchipuram Zari Border Ceremonial Silk Dhoti',
      category: 'dhoti-kurta',
      subCategory: 'Silk Dhoti',
      price: 4950,
      originalPrice: 5600,
      colors: [
        { name: 'Cream Silk', hex: '#F3ECE0' },
        { name: 'Maroon & Gold', hex: '#6E1423' }
      ],
      sizes: ['Standard (4.0m Double)', '4.5m Grand'],
      fabric: 'Heavy Kanchipuram Mulberry Silk',
      weave: 'Temple Zari Border with Matching Towel',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      isSpecialOffer: false,
      releaseOrder: 15,
      images: [IMAGES.dhotiWhite, IMAGES.craftLoom],
      shortDetails: 'Lustrous cream Kanchipuram silk dhoti paired with a matching zari-bordered angavastram towel.',
      description: 'Woven with substantial silk weight for an impeccable ceremonial drape, this Kanchipuram silk dhoti includes a coordinated zari angavastram.'
    },
    {
      id: 'kf-mens-03',
      name: 'Handloom Combed Cotton Temple Border Dhoti',
      category: 'dhoti-kurta',
      subCategory: 'Cotton Dhoti',
      price: 1450,
      originalPrice: 1750,
      colors: [
        { name: 'Natural White', hex: '#FFFFFF' },
        { name: 'Maroon Kara', hex: '#6E1423' }
      ],
      sizes: ['Standard (4.0m Double)', '2.0m Single'],
      fabric: '100% Superfine Combed Cotton',
      weave: 'Classic Handloom Kara Border',
      care: 'Gentle Machine or Hand Wash',
      isNewArrival: false,
      isBestSeller: false,
      isFeatured: false,
      isSpecialOffer: true,
      releaseOrder: 8,
      images: [IMAGES.dhotiWhite, IMAGES.sareeCotton],
      shortDetails: 'Featherlight breathable handloom cotton dhoti designed for all-day comfort in warm weather.',
      description: 'Lofty superfine combed cotton gives this traditional dhoti a cool, crisp handfeel ideal for daily wear, morning prayers, and cultural gatherings.'
    },
    {
      id: 'kf-mens-04',
      name: 'Ivory Kasavu Silk Dhoti & Raw Silk Shirt Set',
      category: 'dhoti-kurta',
      subCategory: 'Dhoti with Shirt',
      price: 4650,
      originalPrice: 5300,
      colors: [
        { name: 'Ivory Gold', hex: '#EFE6D5' },
        { name: 'Champagne', hex: '#D4B475' }
      ],
      sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
      fabric: 'Artisanal Raw Silk Shirt & Silk Blend Dhoti',
      weave: 'Matched Gold Kasavu Border',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: true,
      releaseOrder: 17,
      images: [IMAGES.dhotiWhite, IMAGES.dhotiWedding],
      shortDetails: 'Coordinated ivory raw silk full-sleeve shirt paired with a matching gold-bordered kasavu dhoti.',
      description: 'Effortless South Indian formalwear in a single matched box: a tailored ivory raw silk shirt paired with a 4-metre gold kasavu border dhoti.'
    },
    {
      id: 'kf-mens-05',
      name: 'Maroon Brocade Kurta & Gold Zari Dhoti Set',
      category: 'dhoti-kurta',
      subCategory: 'Dhoti with Kurta',
      price: 7950,
      originalPrice: 9200,
      colors: [
        { name: 'Deep Maroon', hex: '#6E1423' },
        { name: 'Ivory & Gold', hex: '#FAF6F0' }
      ],
      sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
      fabric: 'Jacquard Silk Kurta & Pure Silk Dhoti',
      weave: 'Woven Heritage Motif Brocade',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: false,
      releaseOrder: 18,
      images: [IMAGES.dhotiWedding, IMAGES.kurtaFestive],
      shortDetails: 'Rich maroon woven silk kurta paired with an ivory gold-bordered dhoti for festive occasions.',
      description: 'Tailored with a structured mandarin collar and concealed placket, this maroon brocade kurta harmonizes seamlessly with the crisp ivory gold-bordered dhoti.'
    },
    {
      id: 'kf-mens-06',
      name: 'Espresso Gold Woven Jacquard Men’s Silk Kurta',
      category: 'dhoti-kurta',
      subCategory: "Men's Kurta",
      price: 4250,
      originalPrice: 4900,
      colors: [
        { name: 'Espresso Brown', hex: '#3B2316' },
        { name: 'Antique Gold', hex: '#B58938' }
      ],
      sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
      fabric: 'Banarasi Jacquard Silk with Cotton Lining',
      weave: 'All-Over Antique Gold Damask',
      care: 'Dry Clean Only',
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: false,
      isSpecialOffer: false,
      releaseOrder: 16,
      images: [IMAGES.kurtaFestive, IMAGES.dhotiWedding],
      shortDetails: 'Sophisticated dark brown and antique gold jacquard kurta with soft breathable inner cotton lining.',
      description: 'A refined standalone kurta crafted in espresso-brown and antique gold jacquard silk, finished with antique brass buttons and a soft pure cotton lining for comfort.'
    },
    {
      id: 'kf-mens-07',
      name: 'Royal Groom Wedding Dhoti, Kurta & Angavastram',
      category: 'dhoti-kurta',
      subCategory: 'Wedding Dhoti Sets',
      price: 11500,
      originalPrice: 13500,
      colors: [
        { name: 'Maroon & Ivory', hex: '#6E1423' },
        { name: 'Gold Ivory', hex: '#D4B475' }
      ],
      sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
      fabric: 'Pure Silk Brocade & Kanchipuram Kasavu',
      weave: '3-Piece Groom Muhurtham Ensemble',
      care: 'Dry Clean Only',
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      isSpecialOffer: true,
      releaseOrder: 14,
      images: [IMAGES.dhotiWedding, IMAGES.dhotiWhite, IMAGES.kurtaFestive],
      shortDetails: 'Complete 3-piece wedding ensemble featuring maroon silk kurta, ivory zari dhoti, and grand angavastram.',
      description: 'Curated for grooms and milestone ceremonies, this three-piece wedding set pairs a regal maroon brocade kurta with an ivory zari dhoti and matching bordered angavastram stole.'
    },
    {
      id: 'kf-mens-08',
      name: 'Festive Espresso & Ivory Silk Dhoti Ensemble',
      category: 'dhoti-kurta',
      subCategory: 'Traditional Festival Wear',
      price: 5400,
      originalPrice: 6200,
      colors: [
        { name: 'Espresso Brown', hex: '#3B2316' },
        { name: 'Ivory Cream', hex: '#FAF6F0' }
      ],
      sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
      fabric: 'Art Silk Jacquard & Cotton-Silk Dhoti',
      weave: 'Festive Heritage Duo',
      care: 'Dry Clean Only',
      isNewArrival: false,
      isBestSeller: false,
      isFeatured: false,
      isSpecialOffer: true,
      releaseOrder: 11,
      images: [IMAGES.kurtaFestive, IMAGES.dhotiWhite],
      shortDetails: 'Festive dark brown gold-woven kurta paired with a comfortable cream cotton-silk dhoti.',
      description: 'Built for Diwali, Pongal, and family pujas, this festive pairing delivers rich traditional texture with effortless movement.'
    }
  ];

  const INSTAGRAM_GALLERY = [
    { image: IMAGES.hero, caption: 'Bridal Kanchipuram Silk' },
    { image: IMAGES.sareeMaroon, caption: 'Temple Border Maroon' },
    { image: IMAGES.dhotiWedding, caption: 'Wedding Dhoti & Kurta' },
    { image: IMAGES.sareeEmerald, caption: 'Banarasi Floral Brocade' },
    { image: IMAGES.sareeCotton, caption: 'Chettinad Handloom Cotton' },
    { image: IMAGES.kurtaFestive, caption: 'Festive Silk Menswear' }
  ];

  function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);
  }

  function getDiscountPercent(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  }

  function getProductById(id) {
    return PRODUCTS.find(function (item) {
      return item.id === id;
    }) || null;
  }

  global.KalaifashionData = {
    CONFIG: CONFIG,
    IMAGES: IMAGES,
    PRODUCTS: PRODUCTS,
    INSTAGRAM_GALLERY: INSTAGRAM_GALLERY,
    formatINR: formatINR,
    getDiscountPercent: getDiscountPercent,
    getProductById: getProductById
  };
})(window);
