/**
 * Flipkart Product Service
 * Handles REST calls to Django backend with local fallback mock data
 */
(function () {
  'use strict';

  angular.module('shopNivoApp').factory('productService', ['$http', '$q', function ($http, $q) {

    var API_BASE = window.SHOPNIVO_API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:8000/api' : '/api');

    // Standalone Mock Dataset for instant out-of-the-box loading
    var mockCategories = [
      { id: 1, name: 'All Categories', slug: 'all', icon_class: 'fa-layer-group', product_count: 12 },
      { id: 2, name: 'Fashion & Dresses', slug: 'dresses-fashion', icon_class: 'fa-shirt', product_count: 4 },
      { id: 3, name: 'Electronics & Gadgets', slug: 'electronics', icon_class: 'fa-plug-zap', product_count: 3 },
      { id: 4, name: 'Smartphones & Mobiles', slug: 'smartphones', icon_class: 'fa-mobile-screen-button', product_count: 3 },
      { id: 5, name: 'Laptops & Computers', slug: 'laptops', icon_class: 'fa-laptop', product_count: 2 },
      { id: 6, name: 'Footwear & Shoes', slug: 'footwear', icon_class: 'fa-shoe-prints', product_count: 2 },
      { id: 7, name: 'Home & Kitchen', slug: 'home-kitchen', icon_class: 'fa-couch', product_count: 1 }
    ];

    var mockProducts = [
      {
        id: 101,
        title: 'Floral Silk Wrap Maxi Dress',
        slug: 'floral-silk-wrap-maxi-dress',
        brand: 'Zara Couture',
        category_slug: 'dresses-fashion',
        category_name: 'Fashion & Dresses',
        price: 2499,
        original_price: 4999,
        discount_percentage: 50,
        description: 'Elegant floral printed silk wrap dress featuring a v-neckline, cascading flare hem, and breathable lightweight fabric perfect for summer outings and party wear.',
        rating: 4.8,
        reviews_count: 342,
        stock: 45,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['S', 'M', 'L', 'XL'],
        colors_list: ['Emerald Floral', 'Crimson Rose', 'Midnight Navy'],
        specifications_json: { 'Material': '100% Mulberry Silk', 'Sleeve': 'Half Flared Sleeve', 'Occasion': 'Party & Evening' }
      },
      {
        id: 102,
        title: 'Embroidered Anarkali Kurti Set',
        slug: 'embroidered-anarkali-kurti-set',
        brand: 'Biba Ethnic',
        category_slug: 'dresses-fashion',
        category_name: 'Fashion & Dresses',
        price: 3299,
        original_price: 6599,
        discount_percentage: 50,
        description: 'Traditional designer royal blue Anarkali suit set with intricate zari gold embroidery, matching dupatta, and comfortable churidar leggings.',
        rating: 4.9,
        reviews_count: 512,
        stock: 30,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors_list: ['Royal Blue', 'Maroon Gold', 'Teal Green'],
        specifications_json: { 'Fabric': 'Georgette Silk', 'Work': 'Zari Embroidery', 'Includes': 'Kurta, Leggings & Dupatta' }
      },
      {
        id: 103,
        title: 'Classic Denim Trucker Jacket',
        slug: 'classic-denim-trucker-jacket',
        brand: 'Levi\'s',
        category_slug: 'dresses-fashion',
        category_name: 'Fashion & Dresses',
        price: 2899,
        original_price: 4299,
        discount_percentage: 32,
        description: 'Timeless blue denim jacket crafted from heavy-duty stretch cotton denim, chest flap pockets, button closure, and tailored sleek fit.',
        rating: 4.6,
        reviews_count: 189,
        stock: 60,
        is_featured: false,
        is_deal_of_the_day: false,
        primary_image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['S', 'M', 'L', 'XL'],
        colors_list: ['Vintage Blue', 'Washed Black'],
        specifications_json: { 'Material': '98% Cotton, 2% Elastane', 'Fit': 'Regular Fit' }
      },
      {
        id: 104,
        title: 'Satin Evening A-Line Gown',
        slug: 'satin-evening-a-line-gown',
        brand: 'Mango Formal',
        category_slug: 'dresses-fashion',
        category_name: 'Fashion & Dresses',
        price: 3999,
        original_price: 7999,
        discount_percentage: 50,
        description: 'Stunning floor-length satin A-line dress with a sweetheart neckline, thigh-high slit, and comfortable built-in waist cinch.',
        rating: 4.7,
        reviews_count: 210,
        stock: 25,
        is_featured: true,
        is_deal_of_the_day: false,
        primary_image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['S', 'M', 'L'],
        colors_list: ['Champagne Gold', 'Ruby Red', 'Jet Black'],
        specifications_json: { 'Fabric': 'Heavyweight Premium Satin', 'Length': 'Floor Length' }
      },
      {
        id: 105,
        title: 'Sony WH-1000XM5 Wireless Headphones',
        slug: 'sony-wh1000xm5-wireless-headphones',
        brand: 'Sony',
        category_slug: 'electronics',
        category_name: 'Electronics & Gadgets',
        price: 26990,
        original_price: 34990,
        discount_percentage: 22,
        description: 'Industry-leading Active Noise Cancellation with 8 microphones, 30-hour battery life, ultra-comfortable lightweight design, and crystal-clear hands-free calling.',
        rating: 4.9,
        reviews_count: 1420,
        stock: 85,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        sizes_list: [],
        colors_list: ['Silver Platinum', 'Black', 'Midnight Blue'],
        specifications_json: { 'Battery': '30 Hours', 'Bluetooth': 'v5.2', 'Noise Cancellation': 'Dual Processor V1' }
      },
      {
        id: 106,
        title: 'Apple Watch Series 9 GPS 45mm',
        slug: 'apple-watch-series-9-gps',
        brand: 'Apple',
        category_slug: 'electronics',
        category_name: 'Electronics & Gadgets',
        price: 41900,
        original_price: 44900,
        discount_percentage: 6,
        description: 'S9 SiP chip with Double Tap magic gesture, brighter 2000-nits Always-On Retina display, precise ECG, SpO2 blood oxygen tracking, and advanced fitness workouts.',
        rating: 4.8,
        reviews_count: 950,
        stock: 40,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['41mm', '45mm'],
        colors_list: ['Midnight', 'Starlight', 'Silver', '(PRODUCT)RED'],
        specifications_json: { 'Display': 'Always-On Retina OLED', 'Water Resistance': '50M' }
      },
      {
        id: 107,
        title: 'Samsung Galaxy S24 Ultra 5G (512GB)',
        slug: 'samsung-galaxy-s24-ultra-5g',
        brand: 'Samsung',
        category_slug: 'smartphones',
        category_name: 'Smartphones & Mobiles',
        price: 129999,
        original_price: 139999,
        discount_percentage: 7,
        description: 'Unleash Galaxy AI with Circle to Search, Live Translate, 200MP Quad Telephoto Camera with 100x Space Zoom, Titanium Armor frame and embedded S Pen.',
        rating: 4.9,
        reviews_count: 1850,
        stock: 35,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['256GB', '512GB', '1TB'],
        colors_list: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
        specifications_json: { 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB', 'Camera': '200MP Quad Camera' }
      },
      {
        id: 108,
        title: 'Apple iPhone 15 Pro Max (256GB)',
        slug: 'apple-iphone-15-pro-max',
        brand: 'Apple',
        category_slug: 'smartphones',
        category_name: 'Smartphones & Mobiles',
        price: 148900,
        original_price: 159900,
        discount_percentage: 6,
        description: 'Forged in Aerospace-grade Titanium, A17 Pro game-changing GPU chip, 48MP main camera with 5x Optical Telephoto zoom, and Action button.',
        rating: 4.9,
        reviews_count: 2400,
        stock: 50,
        is_featured: true,
        is_deal_of_the_day: false,
        primary_image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['256GB', '512GB'],
        colors_list: ['Natural Titanium', 'Blue Titanium', 'White Titanium'],
        specifications_json: { 'Processor': 'A17 Pro', 'Camera': '48MP 5x Optical Zoom' }
      },
      {
        id: 109,
        title: 'Apple MacBook Air M3 15-inch',
        slug: 'apple-macbook-air-m3-15-inch',
        brand: 'Apple',
        category_slug: 'laptops',
        category_name: 'Laptops & Computers',
        price: 134900,
        original_price: 144900,
        discount_percentage: 6,
        description: 'Supercharged by M3 chip, impossibly thin 11.5mm design, up to 18 hours of battery life, vibrant 15.3" Liquid Retina display, and fanless silent operation.',
        rating: 4.9,
        reviews_count: 1120,
        stock: 28,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['16GB / 512GB'],
        colors_list: ['Midnight', 'Starlight', 'Space Gray'],
        specifications_json: { 'Processor': 'Apple M3 8-Core', 'Display': '15.3-inch Liquid Retina' }
      },
      {
        id: 110,
        title: 'Nike Air Jordan 1 Retro High OG',
        slug: 'nike-air-jordan-1-retro-high-og',
        brand: 'Nike',
        category_slug: 'footwear',
        category_name: 'Footwear & Shoes',
        price: 14995,
        original_price: 18995,
        discount_percentage: 21,
        description: 'Iconic high-top sneakers crafted from genuine premium leather, encapsulated Air-Sole unit for responsive cushioning, and classic Chicago color blocking.',
        rating: 4.9,
        reviews_count: 3100,
        stock: 40,
        is_featured: true,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
        colors_list: ['Chicago Red', 'Shadow Gray', 'Royal Blue'],
        specifications_json: { 'Sole': 'Rubber Air-Sole', 'Material': '100% Full-Grain Leather' }
      },
      {
        id: 111,
        title: 'Adidas Ultraboost Light Running Shoes',
        slug: 'adidas-ultraboost-light-running-shoes',
        brand: 'Adidas',
        category_slug: 'footwear',
        category_name: 'Footwear & Shoes',
        price: 9999,
        original_price: 16999,
        discount_percentage: 41,
        description: '30% lighter Light BOOST material delivering maximum energy return per stride, PRIMEKNIT+ textile upper, Continental Rubber outsole for superior grip.',
        rating: 4.7,
        reviews_count: 890,
        stock: 75,
        is_featured: false,
        is_deal_of_the_day: true,
        primary_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        sizes_list: ['UK 6', 'UK 7', 'UK 8', 'UK 9'],
        colors_list: ['Solar Red', 'Core Black', 'Cloud White'],
        specifications_json: { 'Cushioning': 'Light BOOST', 'Outsole': 'Continental Rubber' }
      },
      {
        id: 112,
        title: 'De\'Longhi Dedica Deluxe Espresso Machine',
        slug: 'delonghi-dedica-deluxe-espresso-machine',
        brand: 'De\'Longhi',
        category_slug: 'home-kitchen',
        category_name: 'Home & Kitchen',
        price: 19999,
        original_price: 27999,
        discount_percentage: 28,
        description: '15-bar professional pressure pump, ultra-compact 6-inch slim stainless steel body, adjustable milk frother for creamy cappuccinos and lattes.',
        rating: 4.8,
        reviews_count: 530,
        stock: 22,
        is_featured: true,
        is_deal_of_the_day: false,
        primary_image: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=800&q=80',
        sizes_list: [],
        colors_list: ['Brushed Stainless', 'Matte Black'],
        specifications_json: { 'Pressure': '15 Bar Italian Pump', 'Water Tank': '1.1L' }
      }
    ];

    return {
      getCategories: function () {
        var deferred = $q.defer();
        $http.get(API_BASE + '/categories/')
          .then(function (response) {
            deferred.resolve(response.data);
          }, function () {
            // Fallback to mock data if API unavailable
            deferred.resolve(mockCategories);
          });
        return deferred.promise;
      },

      getProducts: function (filters) {
        var deferred = $q.defer();
        filters = filters || {};
        var params = [];

        if (filters.category && filters.category !== 'all') params.push('category=' + encodeURIComponent(filters.category));
        if (filters.search) params.push('search=' + encodeURIComponent(filters.search));
        if (filters.maxPrice) params.push('max_price=' + filters.maxPrice);
        if (filters.minRating) params.push('min_rating=' + filters.minRating);
        if (filters.ordering) params.push('ordering=' + filters.ordering);

        var queryString = params.length > 0 ? '?' + params.join('&') : '';

        $http.get(API_BASE + '/products/' + queryString)
          .then(function (response) {
            deferred.resolve(response.data);
          }, function () {
            // Client-side filtering logic for fallback mock data
            var filtered = mockProducts.filter(function (p) {
              if (filters.category && filters.category !== 'all' && p.category_slug !== filters.category) return false;
              if (filters.search) {
                var q = filters.search.toLowerCase();
                var match = p.title.toLowerCase().indexOf(q) !== -1 ||
                  p.brand.toLowerCase().indexOf(q) !== -1 ||
                  p.description.toLowerCase().indexOf(q) !== -1;
                if (!match) return false;
              }
              if (filters.maxPrice && p.price > filters.maxPrice) return false;
              if (filters.minRating && p.rating < filters.minRating) return false;
              return true;
            });

            // Sorting logic
            if (filters.ordering === 'price_low') {
              filtered.sort(function (a, b) { return a.price - b.price; });
            } else if (filters.ordering === 'price_high') {
              filtered.sort(function (a, b) { return b.price - a.price; });
            } else if (filters.ordering === 'rating') {
              filtered.sort(function (a, b) { return b.rating - a.rating; });
            } else if (filters.ordering === 'discount') {
              filtered.sort(function (a, b) { return b.discount_percentage - a.discount_percentage; });
            }

            deferred.resolve(filtered);
          });

        return deferred.promise;
      },

      getDealsOfTheDay: function () {
        var deferred = $q.defer();
        $http.get(API_BASE + '/deals/')
          .then(function (response) {
            deferred.resolve(response.data.products);
          }, function () {
            var deals = mockProducts.filter(function (p) { return p.is_deal_of_the_day; });
            deferred.resolve(deals);
          });
        return deferred.promise;
      }
    };
  }]);

})();
