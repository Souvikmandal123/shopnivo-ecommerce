/**
 * Flipkart Cart & Wishlist Service
 */
(function () {
  'use strict';

  angular.module('shopNivoApp').factory('cartService', ['$rootScope', function ($rootScope) {

    var CART_KEY = 'sn_cart_items_v1';
    var WISHLIST_KEY = 'sn_wishlist_items_v1';

    var cart = loadFromStorage(CART_KEY, []);
    var wishlist = loadFromStorage(WISHLIST_KEY, []);

    function saveToStorage(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Storage error:', e);
      }
    }

    function loadFromStorage(key, fallback) {
      try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    }

    function notifyChange() {
      $rootScope.$broadcast('cart:updated');
    }

    return {
      getCart: function () {
        return cart;
      },

      getWishlist: function () {
        return wishlist;
      },

      addToCart: function (product, size, color) {
        var existingIndex = -1;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].product.id === product.id && cart[i].selectedSize === size && cart[i].selectedColor === color) {
            existingIndex = i;
            break;
          }
        }

        if (existingIndex > -1) {
          cart[existingIndex].quantity += 1;
        } else {
          cart.push({
            product: product,
            quantity: 1,
            selectedSize: size || (product.sizes_list ? product.sizes_list[0] : null),
            selectedColor: color || (product.colors_list ? product.colors_list[0] : null)
          });
        }

        saveToStorage(CART_KEY, cart);
        notifyChange();
      },

      updateQuantity: function (index, delta) {
        if (cart[index]) {
          cart[index].quantity += delta;
          if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
          }
          saveToStorage(CART_KEY, cart);
          notifyChange();
        }
      },

      removeFromCart: function (index) {
        if (cart[index]) {
          cart.splice(index, 1);
          saveToStorage(CART_KEY, cart);
          notifyChange();
        }
      },

      clearCart: function () {
        cart = [];
        saveToStorage(CART_KEY, cart);
        notifyChange();
      },

      toggleWishlist: function (product) {
        var idx = -1;
        for (var i = 0; i < wishlist.length; i++) {
          if (wishlist[i].id === product.id) {
            idx = i;
            break;
          }
        }
        if (idx > -1) {
          wishlist.splice(idx, 1);
        } else {
          wishlist.push(product);
        }
        saveToStorage(WISHLIST_KEY, wishlist);
        $rootScope.$broadcast('wishlist:updated');
      },

      isWishlisted: function (productId) {
        for (var i = 0; i < wishlist.length; i++) {
          if (wishlist[i].id === productId) return true;
        }
        return false;
      },

      getTotalItemsCount: function () {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
          total += cart[i].quantity;
        }
        return total;
      },

      getSubtotal: function () {
        var subtotal = 0;
        for (var i = 0; i < cart.length; i++) {
          subtotal += (cart[i].product.original_price || cart[i].product.price) * cart[i].quantity;
        }
        return subtotal;
      },

      getFinalTotal: function (couponDiscountPct) {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
          total += cart[i].product.price * cart[i].quantity;
        }
        if (couponDiscountPct) {
          total = total - (total * (couponDiscountPct / 100));
        }
        return Math.max(0, total);
      },

      getTotalDiscount: function () {
        var originalTotal = 0;
        var currentTotal = 0;
        for (var i = 0; i < cart.length; i++) {
          originalTotal += (cart[i].product.original_price || cart[i].product.price) * cart[i].quantity;
          currentTotal += cart[i].product.price * cart[i].quantity;
        }
        return originalTotal - currentTotal;
      }
    };
  }]);

})();
