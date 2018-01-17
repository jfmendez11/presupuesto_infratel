angular.module('app', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService',
  'hyeCtrl',
  'hyeService',
  'itemCtrl',
  'itemService',
  'manoObraCtrl',
  'manoObraService',
  'materialCtrl',
  'materialService',
  'proyectoCtrl',
  'proyectoService',
  'transporteCtrl',
  'transporteService'
])

.config(function($httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

});
