(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.controller('NarrowItDownDirectiveController', NarrowItDownDirectiveController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsFunction);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var ctrl = this;

  ctrl.getMatchedMenuItems = function (searchTerm) {
    ctrl.found = [];
    ctrl.error = '';
    MenuSearchService.getMatchedMenuItems(searchTerm)
    .then(function (value) {
      if (searchTerm == '' || value.length == 0) {
          ctrl.error = 'Nothing found';
      } else {
          ctrl.found = value;
      };
    });
  };

  ctrl.onRemove = function (index) {
    if (ctrl.found.length == 1) {
      ctrl.found.splice(index, 1);
      ctrl.error = 'Nothing found';
    } else {
      ctrl.found.splice(index, 1);
    };
  };
};


MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      })
      .then(function (response) {
        var completeMenuItems = response.data.menu_items;
        var filteredMenuItems = [];
        for (var i = 0; i < completeMenuItems.length; i++) {
          if (completeMenuItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
            filteredMenuItems.push(completeMenuItems[i]);
          };
        };
        return filteredMenuItems;
      });
  };

};

function foundItemsFunction () {
  var ddo = {
    templateUrl: 'found_Items.html',
    scope: {
      found: '<',
      error: '<',
      onRemove: '&'
    },
    controller: 'NarrowItDownDirectiveController as list',
    bindToController: true,
  };
  return ddo;
};


function NarrowItDownDirectiveController () {
var list = this;

};



})();
