'use strict';
(function() {
	angular.module('test').factory('DataServiceUsuario', DataServiceUsuario);

	DataServiceUsuario.$inject = [ '$http' ];

	function DataServiceUsuario($http) {

		var service = {
			
			save : save,
			getUsuario : getUsuario,
			getUsuarios :getUsuarios,
			remove : remove
		};
		return service;

		function save(usuario) {
			
			usuario.telefone = usuario.telefone != undefined ? usuario.telefone
					.replace('(', '').replace(')', '').replace(' ', '')
					.replace('-', '').trim()
					: usuario.telefone;
			
			if(usuario.id === undefined){
				
				return $http.post('http://localhost:5000/api/user', usuario)
	            .then(saveUsuarioSucess)
	            .catch(saveUsuarioFailed);
			}else{
				
				return $http.put('http://localhost:5000/api/user/'+usuario.id,usuario)
	            .then(saveUsuarioSucess)
	            .catch(saveUsuarioFailed);
			}

	        function saveUsuarioSucess(response) {
	            return response.data;
	        }

	        function saveUsuarioFailed(error) {
	            return error;
	        }
	    };
		
		function getUsuario(id) {
		
			return $http.get('http://localhost:5000/api/user/' + id)
	            .then(getUsuarioSucess)
	            .catch(getUsuarioFailed);

	        function getUsuarioSucess(response) {
	            return response.data;
	        }

	        function getUsuarioFailed(error) {
	            return error.data;
	        }
	    };
	    
	    function getUsuarios() {
	    
	       return $http.get('http://localhost:5000/api/user')
	            .then(getUsuariosSucess)
	            .catch(getUsuariosFailed);

	        function getUsuariosSucess(response) {
	            return response.data;
	        }

	        function getUsuariosFailed(response) {
	        	return response.data;
	        }
	    };
	    
	    function remove(id) {
			
			return $http.delete('http://localhost:5000/api/user/' + id)
	            .then(deleteUsuarioSucess)
	            .catch(deleteUsuarioFailed);

	        function deleteUsuarioSucess(response) {
	            return response.data;
	        }

	        function deleteUsuarioFailed(error) {
	            return error.data;
	        }
	    };
		
	}
})();