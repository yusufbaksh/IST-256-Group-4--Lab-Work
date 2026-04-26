/* Member 2: AJAX + AngularJS functionality */
/* Developer: Martin Shestani */

/*
Person 2: Yusuf Baksh
Task: Frontend + AJAX UI Integration Add-On
Kept the original AngularJS return form and added backend API connection,
GET/POST/PUT/DELETE support, live display, and status output.
*/

var app = angular.module("returnsApp", []);

app.controller("ReturnsController", function($scope) {
    const RETURNS_API_URL = "http://localhost:3004/returns";

    $scope.return = {};
    $scope.serverResponse = {};
    $scope.returnsList = [];

    $scope.loadReturns = function() {
        $.ajax({
            url: RETURNS_API_URL,
            type: "GET",
            success: function(response) {
                $scope.returnsList = response;
                $scope.serverResponse = response;
                $scope.$apply();
            },
            error: function(xhr, status, error) {
                $scope.serverResponse = {
                    status: "error",
                    message: "Could not load returns: " + error
                };
                $scope.$apply();
            }
        });
    };

    $scope.submitReturn = function() {

        // Input validation
        if (!$scope.return.orderNumber || !$scope.return.reason) {
            $scope.serverResponse = { status: "error", message: "Please fill out all fields." };
            return;
        }

        // Person 2: Yusuf Baksh - Format data to match the backend Returns schema in AppPost.js
        const returnData = {
            orderId: $scope.return.orderNumber,
            reason: $scope.return.reason,
            status: $scope.return.status || "Pending"
        };

        $.ajax({
            url: RETURNS_API_URL,
            type: "POST",
            data: JSON.stringify(returnData),
            contentType: "application/json",
            success: function(response) {
                $scope.serverResponse = response;
                $scope.return = {};
                $scope.loadReturns();
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

    // Person 2: Yusuf Baksh - Update return status in backend
    $scope.updateReturn = function(returnItem, newStatus) {
        const updatedReturn = {
            orderId: returnItem.orderId,
            reason: returnItem.reason,
            status: newStatus || "Approved"
        };

        $.ajax({
            url: RETURNS_API_URL + "/" + returnItem._id,
            type: "PUT",
            data: JSON.stringify(updatedReturn),
            contentType: "application/json",
            success: function(response) {
                $scope.serverResponse = response;
                $scope.loadReturns();
                $scope.$apply();
            },
            error: function(xhr, status, error) {
                $scope.serverResponse = {
                    status: "error",
                    message: "Update failed: " + error
                };
                $scope.$apply();
            }
        });
    };

    // Person 2: Yusuf Baksh - Delete return from backend
    $scope.deleteReturn = function(returnItem) {
        if (!confirm("Delete this return from the backend?")) return;

        $.ajax({
            url: RETURNS_API_URL + "/" + returnItem._id,
            type: "DELETE",
            success: function(response) {
                $scope.serverResponse = response;
                $scope.loadReturns();
                $scope.$apply();
            },
            error: function(xhr, status, error) {
                $scope.serverResponse = {
                    status: "error",
                    message: "Delete failed: " + error
                };
                $scope.$apply();
            }
        });
    };

    $scope.loadReturns();
});
