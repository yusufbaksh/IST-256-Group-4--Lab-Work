/* Member 2: AJAX + AngularJS functionality */
/* Developer: Martin Shestani */

var app = angular.module("returnsApp", []);

app.controller("ReturnsController", function($scope) {
    $scope.return = {};
    $scope.serverResponse = {};

    $scope.submitReturn = function() {

        // Input validation
        if (!$scope.return.orderNumber || !$scope.return.reason) {
            $scope.serverResponse = { status: "error", message: "Please fill out all fields." };
            return;
        }

        $.ajax({
            url: "http://130.203.136.203:3004/returns",
            type: "POST",
            data: JSON.stringify($scope.return),
            contentType: "application/json",
            success: function(response) {
                $scope.serverResponse = response;
                $scope.$apply();
            },
            error: function(xhr, status, error) {
                $scope.serverResponse = {
                    status: "error",
                    message: "Request failed: " + error
                };
                $scope.$apply();
            }
        });
    };
});
