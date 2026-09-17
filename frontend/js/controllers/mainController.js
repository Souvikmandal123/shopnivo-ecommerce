/**
 * Flipkart Main Controller
 */
(function () {
  'use strict';

  angular.module('shopNivoApp').controller('mainController', [
    '$scope', '$interval', 'productService', 'cartService',
    function ($scope, $interval, productService, cartService) {

      // Application State
      $scope.categories = [];
      $scope.products = [];
      $scope.deals = [];
      $scope.loading = true;
      $scope.theme = localStorage.getItem('sn_theme') || 'light';
      
      // Filter & Search State
      $scope.filters = {
        category: 'all',
        search: '',
        maxPrice: 160000,
        minRating: 0,
        ordering: 'relevance'
      };

      // Hero Carousel Slides
      $scope.carouselIndex = 0;
      $scope.slides = [
        {
          tag: 'BIG BILLION DAYS SALE',
          title: 'Trendsetting Fashion & Dresses',
          desc: 'Explore gorgeous designer silk dresses, suits & sarees. Minimum 50% OFF!',
          bg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
          ctaCategory: 'dresses-fashion'
        },
        {
          tag: 'FLAGSHIP LAUNCH',
          title: 'Samsung S24 Ultra & iPhone 15 Pro',
          desc: 'Unbeatable exchange bonuses & instant bank discounts on flagship 5G smartphones.',
          bg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=80',
          ctaCategory: 'smartphones'
        },
        {
          tag: 'MEGA TECH DROP',
          title: 'Sony Noise Canceling & Apple Watch',
          desc: 'Upgrade your audio and fitness lifestyle with up to 40% OFF audio gear.',
          bg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
          ctaCategory: 'electronics'
        }
      ];

      // Countdown Timer State (12 Hours)
      $scope.timer = {
        hours: '11',
        minutes: '58',
        seconds: '45'
      };
      var timerSecondsRemaining = 43125;

      // Modal & Drawer State
      $scope.isCartOpen = false;
      $scope.isQuickViewOpen = false;
      $scope.showMobileFilters = false;
      $scope.quickViewProduct = null;
      $scope.selectedSize = null;
      $scope.selectedColor = null;
      $scope.toastMessage = '';
      $scope.showToast = false;
      $scope.couponCode = '';
      $scope.couponApplied = false;
      $scope.couponDiscountPct = 0;

      $scope.toggleMobileFilters = function () {
        $scope.showMobileFilters = !$scope.showMobileFilters;
      };

      // Theme Management
      document.documentElement.setAttribute('data-theme', $scope.theme);
      $scope.toggleTheme = function () {
        $scope.theme = ($scope.theme === 'light') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', $scope.theme);
        localStorage.setItem('sn_theme', $scope.theme);
      };

      // Toast Notification Helper
      $scope.triggerToast = function (msg) {
        $scope.toastMessage = msg;
        $scope.showToast = true;
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.showToast = false;
          });
        }, 2500);
      };

      // Initialization
      $scope.init = function () {
        $scope.loading = true;
        
        // Fetch Categories
        productService.getCategories().then(function (data) {
          $scope.categories = data;
        });

        // Fetch Deals of the Day
        productService.getDealsOfTheDay().then(function (dealsData) {
          $scope.deals = dealsData;
        });

        // Fetch Products
        $scope.loadProducts();

        // Start Carousel Auto-slide (5s)
        $interval(function () {
          $scope.carouselIndex = ($scope.carouselIndex + 1) % $scope.slides.length;
        }, 5000);

        // Start Countdown Timer
        $interval(function () {
          if (timerSecondsRemaining > 0) {
            timerSecondsRemaining--;
            var h = Math.floor(timerSecondsRemaining / 3600);
            var m = Math.floor((timerSecondsRemaining % 3600) / 60);
            var s = timerSecondsRemaining % 60;
            $scope.timer.hours = (h < 10 ? '0' : '') + h;
            $scope.timer.minutes = (m < 10 ? '0' : '') + m;
            $scope.timer.seconds = (s < 10 ? '0' : '') + s;
          }
        }, 1000);
      };

      // Load products based on current filter state
      $scope.loadProducts = function () {
        $scope.loading = true;
        productService.getProducts($scope.filters).then(function (data) {
          $scope.products = data;
          $scope.loading = false;
        });
      };

      // Select Category
      $scope.selectCategory = function (categorySlug) {
        $scope.filters.category = categorySlug;
        $scope.loadProducts();
      };

      // Apply Search
      $scope.onSearch = function () {
        $scope.loadProducts();
      };

      // Filter Reset
      $scope.resetFilters = function () {
        $scope.filters = {
          category: 'all',
          search: '',
          maxPrice: 160000,
          minRating: 0,
          ordering: 'relevance'
        };
        $scope.loadProducts();
      };

      // Wishlist Handler
      $scope.toggleWishlist = function (product, $event) {
        if ($event) $event.stopPropagation();
        cartService.toggleWishlist(product);
        var added = cartService.isWishlisted(product.id);
        $scope.triggerToast(added ? 'Added to Wishlist ❤️' : 'Removed from Wishlist');
      };

      $scope.isWishlisted = function (productId) {
        return cartService.isWishlisted(productId);
      };

      // Cart Actions
      $scope.addToCart = function (product, size, color, $event) {
        if ($event) $event.stopPropagation();
        cartService.addToCart(product, size, color);
        $scope.triggerToast('Item added to Shopping Cart 🛒');
      };

      $scope.openCart = function () {
        $scope.isCartOpen = true;
      };

      $scope.closeCart = function () {
        $scope.isCartOpen = false;
      };

      $scope.getCartItems = function () {
        return cartService.getCart();
      };

      $scope.getCartCount = function () {
        return cartService.getTotalItemsCount();
      };

      $scope.getWishlistCount = function () {
        return cartService.getWishlist().length;
      };

      $scope.getCartSubtotal = function () {
        return cartService.getSubtotal();
      };

      $scope.getCartDiscount = function () {
        return cartService.getTotalDiscount();
      };

      $scope.getCartFinalTotal = function () {
        return cartService.getFinalTotal($scope.couponDiscountPct);
      };

      $scope.updateQty = function (index, delta) {
        cartService.updateQuantity(index, delta);
      };

      $scope.removeFromCart = function (index) {
        cartService.removeFromCart(index);
        $scope.triggerToast('Item removed from cart');
      };

      $scope.applyCoupon = function () {
        if ($scope.couponCode && $scope.couponCode.toUpperCase() === 'SHOPNIVO10') {
          $scope.couponApplied = true;
          $scope.couponDiscountPct = 10;
          $scope.triggerToast('Coupon SHOPNIVO10 Applied! 10% Extra OFF 🎉');
        } else {
          $scope.triggerToast('Invalid Coupon Code. Try SHOPNIVO10');
        }
      };

      // Quick View Modal
      $scope.openQuickView = function (product, $event) {
        if ($event) $event.stopPropagation();
        $scope.quickViewProduct = product;
        $scope.selectedSize = product.sizes_list && product.sizes_list.length > 0 ? product.sizes_list[0] : null;
        $scope.selectedColor = product.colors_list && product.colors_list.length > 0 ? product.colors_list[0] : null;
        $scope.isQuickViewOpen = true;
      };

      // Wishlist Drawer State & Methods
      $scope.isWishlistOpen = false;
      $scope.openWishlist = function () {
        $scope.isWishlistOpen = true;
      };

      $scope.closeWishlist = function () {
        $scope.isWishlistOpen = false;
      };

      $scope.getWishlistItems = function () {
        return cartService.getWishlist();
      };

      $scope.removeFromWishlist = function (product) {
        cartService.toggleWishlist(product);
        $scope.triggerToast('Item removed from Wishlist');
      };

      $scope.moveToCartFromWishlist = function (product) {
        cartService.addToCart(product, null, null);
        cartService.toggleWishlist(product);
        $scope.triggerToast('Moved to Cart 🛒');
      };

      // Authentication Modal State & Methods
      $scope.isAuthModalOpen = false;
      $scope.authTab = 'login';
      $scope.isUserMenuOpen = false;
      $scope.currentUser = JSON.parse(localStorage.getItem('sn_user') || 'null');
      $scope.loginForm = { email: '', password: '' };
      $scope.registerForm = { name: '', email: '', password: '' };

      $scope.openAuthModal = function (tab) {
        $scope.authTab = tab || 'login';
        $scope.isAuthModalOpen = true;
        $scope.isUserMenuOpen = false;
      };

      $scope.closeAuthModal = function () {
        $scope.isAuthModalOpen = false;
      };

      $scope.toggleUserMenu = function () {
        $scope.isUserMenuOpen = !$scope.isUserMenuOpen;
      };

      $scope.handleLogin = function () {
        if (!$scope.loginForm.email || !$scope.loginForm.password) {
          $scope.triggerToast('Please fill in all fields');
          return;
        }
        var user = {
          name: $scope.loginForm.email.split('@')[0],
          email: $scope.loginForm.email,
          token: 'token_' + Date.now()
        };
        // Format initial for avatar
        user.initial = user.name.charAt(0).toUpperCase();
        $scope.currentUser = user;
        localStorage.setItem('sn_user', JSON.stringify(user));
        $scope.closeAuthModal();
        $scope.triggerToast('Logged in successfully! Welcome, ' + user.name + ' 👋');
      };

      $scope.handleRegister = function () {
        if (!$scope.registerForm.name || !$scope.registerForm.email || !$scope.registerForm.password) {
          $scope.triggerToast('Please fill in all fields');
          return;
        }
        var user = {
          name: $scope.registerForm.name,
          email: $scope.registerForm.email,
          token: 'token_' + Date.now()
        };
        user.initial = user.name.charAt(0).toUpperCase();
        $scope.currentUser = user;
        localStorage.setItem('sn_user', JSON.stringify(user));
        $scope.closeAuthModal();
        $scope.triggerToast('Account created! Welcome to ShopNivo, ' + user.name + ' 🎉');
      };

      $scope.handleLogout = function () {
        $scope.currentUser = null;
        $scope.isUserMenuOpen = false;
        localStorage.removeItem('sn_user');
        $scope.triggerToast('Logged out successfully');
      };

      $scope.init();
    }
  ]);

})();
