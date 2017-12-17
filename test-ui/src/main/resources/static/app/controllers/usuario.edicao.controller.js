'use strict';
(function() {
	angular.module('test').controller('UsuarioEdicaoController',
			UsuarioEdicaoController);
	UsuarioEdicaoController.$inject = [ '$scope', '$location', '$timeout',
			'DataServiceUsuario' ];
	function UsuarioEdicaoController($scope, $location, $timeout,
			DataServiceUsuario) {
		$(document).ready(function() {

			$('#telefone').mask('(00) 0000-0000', {
				clearIfNotMatch : true
			});

		});
		var vm = this;
		vm.sexo = [ 'Masculino', 'Feminino' ];
		vm.sexoSelecionado;
		vm.ativo = ativo;
		vm.buscarUsuarioPorId = buscarUsuarioPorId;
		vm.editarUsuario = editarUsuario;

		function buscarUsuarioPorId(id) {
			DataServiceUsuario.getUsuario(id).then(function(response) {
				vm.usuario = response;
				vm.sexoSelecionado = vm.usuario.sexo;

			}, function(error) {
				console.log('Error ', error);
			});
		}
		;

		function editarUsuario() {
			vm.usuario.sexo = vm.sexoSelecionado
			DataServiceUsuario.save(vm.usuario).then(function(response) {
				if (response.status == 400) {
					vm.severity = 'alert alert-warning';
					vm.summary = 'Test Full Stack!';
					vm.mensagem = response.data[0].mensagemUsuario;
					message(vm.summary, vm.mensagem, vm.severity, 5000);
				} else {

					vm.usuario = response;
					vm.frmUsuario.$setPristine();
					vm.frmUsuario.$setDirty();
					vm.frmUsuario.$setUntouched();
					vm.severity = 'alert alert-success';
					vm.summary = 'Test Full Stack!';
					vm.mensagem = 'Usuário Alterado com Sucesso';
					vm.sexoSelecionado = {};
					message(vm.summary, vm.mensagem, vm.severity, 3000);

					vm.usuario = {};
				}
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
					console.log(severity);
					$location.url('/user');
				}
			}, time);
		}
		;
		buscarUsuarioPorId($location.search().param);
	}
})();