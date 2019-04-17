(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuy = this;

  ToBuy.items = ShoppingListCheckOffService.addToBuyItems();

  ToBuy.RemoveToBoughtList = function (index) {
      ShoppingListCheckOffService.RemoveToBoughtList(index);
  };

};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var AlreadyBought = this;

  AlreadyBought.items = ShoppingListCheckOffService.showBoughtList();

};

function ShoppingListCheckOffService() {
  var service = this;

  var ToBuy_items = [
    {
      Quantity : 2,
      Name : 'cookies'
    },
    {
      Quantity : 4,
      Name : 'Chips'
    },
    {
      Quantity : 8,
      Name : 'Pepto Bismol'
    },
    {
      Quantity : 10,
      Name : 'Pizza'
    },
    {
      Quantity : 7,
      Name : 'Sugar drinks'
    }
  ];

  var Bought_items = [];

  service.addToBuyItems = function () {
      return ToBuy_items;
  };

  service.RemoveToBoughtList = function (index) {
      Bought_items.push(ToBuy_items[index]);
      ToBuy_items.splice(index, 1);
  };

  service.showBoughtList = function () {
    return Bought_items;
  };

};

})();
