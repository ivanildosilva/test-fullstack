'use strict';
(function() {
	angular.module('test').controller('UsuarioCadastroController',
			UsuarioCadastroController);
	UsuarioCadastroController.$inject = [ '$scope', '$location', '$timeout',
			'DataServiceUsuario' ];
	function UsuarioCadastroController($scope, $location, $timeout,
			DataServiceUsuario) {
		$(document).ready(function() {

			$('#telefone').mask('(00) 0000-0000', {
				clearIfNotMatch : true
			});

		});
		var vm = this;
		vm.sexo = [ 'Masculino', 'Feminino' ];
		vm.usuarios;
		vm.ativo = ativo;
		vm.buscarUsuarioPorId = buscarUsuarioPorId;
		vm.buscarTodosUsuarios = buscarTodosUsuarios;
		vm.excluirUsuario = excluirUsuario;
		vm.editarUsuario = editarUsuario;
		vm.cadastrarUsuario = cadastrarUsuario;

		function buscarUsuarioPorId(id) {
			DataServiceUsuario.getUsuario(id).then(function(response) {
				vm.usuario = response;
				$location.path('/user/add/').search({
					param : vm.usuario.id
				});

			}, function(error) {
				console.log('Error ', error);
			});
		}
		;

		function buscarTodosUsuarios() {
			DataServiceUsuario.getUsuarios().then(
					function(response) {
						vm.usuarios = response;
						vm.usuarios.map(function(num) {

							num.telefone = num.telefone.slice(0, 0) + '('
									+ num.telefone.slice(0, 2) + ') '
									+ num.telefone.slice(2, 6) + '-'
									+ num.telefone.slice(6, 10);
							return num;
						});

					}, function(error) {
						console.log('Error ', error);
					});
		}
		;

		function excluirUsuario(id) {
			DataServiceUsuario.remove(id).then(function(response) {
				buscarTodosUsuarios();
			}, function(error) {
				console.log('Error ', error);
			});
		}
		;

		function editarUsuario(id) {

			$location.path('/user/add/').search({
				param : id
			});

			buscarUsuarioPorId(id);
			vm.usuario = buscarUsuarioPorId(id);
			// console.log('Editar usuário ', id);
		}
		;

		function cadastrarUsuario() {
			DataServiceUsuario.save(vm.usuario).then(function(response) {
				vm.usuarios = response;
				vm.frmUsuario.$setPristine();
				vm.frmUsuario.$setDirty();
				vm.frmUsuario.$setUntouched();
				vm.severity = 'alert alert-success';
				vm.summary = 'Test Full Stack!';
				vm.mensagem = 'Usuário Cadastrado com Sucesso';

				message(vm.summary, vm.mensagem, vm.severity, 3000);
				vm.usuario = {};
			}, function(error) {
				console.log('Error ', error);
			});

		}
		;

		function ativo(path) {
			var active = (path === $location.path());
			return active;
		}
		;

		function message(summary, mensagem, severity, time) {

			vm.summary = summary;
			vm.mensagem = mensagem;
			vm.severity = severity;
			vm.showMessage = true;

			$timeout(function() {
				vm.showMessage = false;
				if (severity !== 'alert alert-warning') {
					$location.url('/user');
				}
			}, time);
		}
		;
		buscarTodosUsuarios();
	}
})();