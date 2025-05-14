// Seçilen frameworkle yazacağımız doğrulamalar
// Angular.js örneği (isteğe bağlı)

angular.module('formApp', [])
.controller('FormController', function($scope) {
    $scope.form = {};
    $scope.errors = {};
    $scope.validationResults = {};
    $scope.showValidationResults = false;
    
    $scope.validateForm = function() {
        $scope.errors = {};
        $scope.validationResults = {};
        $scope.showValidationResults = true;
        
        // Ad doğrulama
        if (!$scope.form.firstName) {
            $scope.errors.firstName = true;
            $scope.validationResults['Ad'] = 'Geçersiz - Boş bırakılamaz';
        } else {
            $scope.validationResults['Ad'] = 'Geçerli';
        }
        
        // Diğer doğrulamalar...
    };
    
    $scope.resetForm = function() {
        $scope.form = {};
        $scope.errors = {};
        $scope.validationResults = {};
        $scope.showValidationResults = false;
    };
});

