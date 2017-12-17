'use strict';

angular.module('test', ['ui.router'])

.config(['$urlRouterProvider', '$stateProvider',
	function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
    .state("lista", {
        url: "/user",
        templateUrl: '/app/partials/app-listar-usuarios.html',
        controller: 'UsuarioCadastroController',
		controllerAs : 'vm'
    }).state("novo", {
        url: "/user/add",
        templateUrl: '/app/partials/app-cadastro-usuario.html',
        controller: 'UsuarioCadastroController',
		controllerAs : 'vm'
    }).state("edicao", {
        url: "/user/add/:id",
        templateUrl: '/app/partials/app-edicao-usuario.html',
        controller: 'UsuarioEdicaoController',
		controllerAs : 'vm'
    });
	
}])

.run(['$rootScope', '$state',
	function ($rootScope, $state) {

}]);