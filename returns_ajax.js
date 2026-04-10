/* Member 2: AJAX + AngularJS functionality */
/* Developer: Yusuf */

var app = angular.module("returnsApp", []);

app.controller("ReturnsController", function($scope) {

    $scope.return = {};
    $scope.serverResponse = {};

    $scope.submitReturn = function() {

        $.ajax({
            url: "http://130.203.136.203:3004/returns",  
            type: "POST",
            data: JSON.stringify($scope.return),
            contentType: "application/json",

            success: function(response) {
                $scope.serverResponse = response;
                $scope.$apply();
            },

            error: function() {
                // Simulated JSON response for now
                $scope.serverResponse = {
                    status: "success",
                    message: "Return submitted (simulated)",
                    dataSent: $scope.return
                };
                $scope.$apply();
            }
        });
    };
});
