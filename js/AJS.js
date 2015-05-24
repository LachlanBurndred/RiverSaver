var app = angular.module("myApp", ['ngStorage']);

console.log("The app is working");

app.controller("AJS", function($scope, $localStorage) {

    $scope.$storage = $localStorage;

    if (typeof($localStorage.trackers) == "undefined") {
        $localStorage.trackers = [];
    }

    $scope.tProgress = function(tracker) {
    	var funds = tracker.funds;
    	var price = tracker.price;
    	var prog = funds / price;
        if (prog > 1) 
        {
            prog = 1;
        }
    	console.log(prog);
    	return prog;
    }

    $scope.createTracker = function() {
    	var price = 0;
        if (isNaN($scope.tPrice)) {
            console.log("There was an error setting the value of price");
            alert("The price of the item must be a number.");
            $scope.tPrice = "";
            return;
        } else {
        	price = parseFloat($scope.tPrice);
        }

        var funds = 0;

        if ($scope.tFunds != "") {
            //dosomething
            if (isNaN($scope.tFunds)) {
            alert("The fund box cannot contain letters or symbols.");
            return;
	        }
	        else {
	        	funds = parseFloat($scope.tFunds);
	        }
        }
        if (funds >= price) {
        	alert("You already have enough money.");
        	return;
        }
        else {
        	console.log("Working");
        }

        if ($scope.tName.length > 20) {
            alert("Your tracker name cannot exceed 20 characters.");
            $scope.tName = "";
            return;
        }
        else {
            console.log("Working!");
        }
        if ($scope.tDescription.length > 140) {
            alert("Your tracker description cannot exceed 140 characters.");
            return;
        }
        else {
            console.log("Working!");
        }
        if ($scope.tPrice.length > 9) {
            alert("Your tracker price cannot exceed 9 characters.");
            $scope.tPrice = "";
            return;
        }
        else {
            console.log("Working!");
        }

        var tracker = {
            name: $scope.tName,
            description: $scope.tDescription,
            price: price,
            funds: funds,
            date: $scope.tDate
        }

        $localStorage.trackers.push(tracker);
        console.log("tracker pushed!");
        alert("Tracker Created!");
        //clears the form fileds
        $scope.tName = "";
        $scope.tDescription = "";
        $scope.tPrice = "";
        $scope.tFunds = "";
        $scope.tDate = "";
    }; // end createTracker fn


    $("set").collapsible("refresh");

    // Used in PAGE :  			 
    $scope.editTracker = function(tracker) {
        console.log(tracker);
        $scope.editTrackerX = tracker;
        $scope.name = tracker.name;
        $scope.description = tracker.description;
        $scope.price = tracker.price;
        $scope.funds = tracker.funds;
        $scope.date = tracker.date;
    }; // end editProduct				


    // Used in PAGE :  			 
    $scope.saveEdit = function() {
        for(var i = 0; i < $localStorage.trackers.length; i++) {
            if($localStorage.trackers[i] === $scope.editTrackerX) {
                var index = i;
                $localStorage.trackers[index].name = $scope.name
                $localStorage.trackers[index].description = $scope.description
                $localStorage.trackers[index].price = $scope.price
                $localStorage.trackers[index].funds = $scope.funds
                $localStorage.trackers[index].date = $scope.date
                break;
            }
        }
       
    }; // end editProduct				



    $scope.removeTracker = function() {
        //remove tracker code
        for(var i = 0; i < $localStorage.trackers.length; i++) {
            if($localStorage.trackers[i] === $scope.editTrackerX) {
                $localStorage.trackers.splice(i, 1);
                break;
            }
        }
    };

    $scope.clearAll = function() {
        $localStorage.$reset();
    } // end clearALL	

    $scope.activeTrackers = function () {
        return $scope.$storage.trackers.filter(isNotCompleted);

    }

    function isCompleted(tracker) {
        if (tracker.funds >= tracker.price) {
            return true;
        } else {
            return false;
        }
    }

    $scope.inactiveTrackers = function () {
        return $scope.$storage.trackers.filter(isCompleted);
    }

    function isNotCompleted(tracker) {
        if (tracker.funds < tracker.price) {
            return true;
        } else {
            return false;
        }
    }

});