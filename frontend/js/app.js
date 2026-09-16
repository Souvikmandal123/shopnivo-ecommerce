/**
 * Flipkart E-Commerce AngularJS Main Application Module
 */
(function () {
  'use strict';

  var app = angular.module('shopNivoApp', []);

  // Custom INR Currency Filter
  app.filter('inrCurrency', function () {
    return function (input) {
      if (isNaN(input) || input === null) return '₹0';
      return '₹' + Number(input).toLocaleString('en-IN');
    };
  });

  // Custom Discount Calculator Filter
  app.filter('discountTag', function () {
    return function (product) {
      if (!product || !product.original_price || !product.price) return '';
      if (product.original_price <= product.price) return '';
      var pct = Math.round(((product.original_price - product.price) / product.original_price) * 100);
      return pct + '% OFF';
    };
  });

  // Range helper filter for stars/loops
  app.filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  });

})();
