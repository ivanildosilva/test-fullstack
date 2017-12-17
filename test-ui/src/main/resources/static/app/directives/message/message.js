	'use strict';

(function() {
	angular.module('test').directive('message', message);

	function message(){
	
			var directive = {
					link: link,
					 template : '<div style="width:100%">'
											+'<div style="width: 50%; margin: 0 auto; text-align: center" class="alert alert-warning">'
													+'<h4>{{mensagem}}</h4>'
											+'</div>'
								+'</div>',
					restrict: 'E',
					replace: false
	    };
			return directive;
	
		function link(scope, element, attrs) {
			console.log(attrs)
			scope.mensagem = attrs.texto;
			
		};
	};
})();