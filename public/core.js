(function() {
    'use strict';

    var myApp = angular.module('myApp', ['ngStorage']);

    myApp.controller('mainController', mainController);
    myApp.factory('apiService', apiService);

    mainController.$inject = ['apiService', '$sessionStorage'];

    // Main controller
    function mainController(apiService, $sessionStorage) {
        var vm = this;

        vm.orderByField = 'id';
        vm.reverseSort = false;
        vm.filterQuery = '';
        vm.assetTypes = ['AAPL', 'GOOGL', 'FB', 'TSLA', 'MSFT'];
        vm.types = ['Stock', 'Currency'];
        vm.storage = $sessionStorage;
        vm.addToFavorites = addToFavorites;
        vm.clearFavorites = clearFavorites;
        vm.isFavorite = isFavorite;

        init();

        function init() {
            if (!$sessionStorage.favorites) {
                $sessionStorage.favorites = [];
            }
            apiService.getData()
                .then((res) => {
                    vm.assets = res.data.assets;
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function addToFavorites(asset) {
            $sessionStorage.favorites.push(asset);
        }

        function clearFavorites() {
            $sessionStorage.$reset();
            $sessionStorage.favorites = [];
        }

        function isFavorite(asset) {
            return $sessionStorage.favorites.includes(asset);
        }
    }

    apiService.$inject = ['$http', '$q'];

    function apiService($http, $q) {
        let service = {
            getData: getData
        };

        return service;

        /**
         * Create
         *
         * @returns - mock data
         */
        function getData() {
            return $http.get('/api/get-data')
                .then((res) => {
                    return res
                })
                .catch((err) => {
                    return $q.reject(err)
                })
        }

    }
}());
