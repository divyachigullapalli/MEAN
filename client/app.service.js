// services go here

angular.module("eStationaryMart.services", [])

  .factory("Auth", function ($http, $location, $window) {
    var itemsOrdered = [];

    // signin
    var signin = function (user) {
      return $http({
        method: "POST",
        url: "/api/signin",
        // clarify on data format
        data: JSON.stringify(user)
      })
        .then(function (res) {
          return res.data
        })
    }

    // signup
    var signup = function (user) {
      console.log(user)
      return $http({
        method: "POST",
        url: "/api/signup",
        // clarify on data format
        data: JSON.stringify(user)
      })
        .then(function (res) {
          return res.data
        })
    }

    var isAuthenticated = function () {
      // check local to see if token exists
      // going by name crowdcarttoken for time being
      return !!$window.localStorage.getItem("marttoken")
    }

    var signout = function () {
      $window.localStorage.removeItem("marttoken");
      $window.localStorage.removeItem("martuser");
      $window.localStorage.removeItem("martuserstreet");
      $window.localStorage.removeItem("martusercity");
      $window.localStorage.removeItem("martuserstate");
      $window.localStorage.removeItem("martuserzip");
      $location.path("/signin")
    }

    return {
      signin: signin,
      signup: signup,
      isAuthenticated: isAuthenticated,
      signout: signout
    }

  })

  .factory("Lists", function ($http) {

    //get all lists in system
    var getAllItems = function () {
      return $http({
        method: "GET",
        url: "/api/products"
      })
        .then(function (res) {
          return res.data;
        })
    }

    // added because server route looks to handle, not sure if we will need it
    var updateStatus = function (listId, status) {
      return $http({
        method: "POST",
        url: "api/status",
        // need to decide on format for this call
        data: listId, status
      })
    }

    return {

      getAllItems: getAllItems,
      updateStatus: updateStatus
    }

  })

  .factory("Orders", function ($http) {

    //get all Orders in system this is for Admin login
    var getAllOrders = function () {
      return $http({
        method: "GET",
        url: "/api/orders"
      })
        .then(function (res) {
          return res.data;
        })
    }


    // get all lists for specific user; since with routing to decide if that's the right meaning
    var getOrders = function (id) {
      // console.log("getting all lists for", id)
      return $http({
        method: "GET",
        url: "/api/orders/" + id
        // data: JSON.stringify(user)
      })
        .then(function (res) {
          return res.data;
        })
    }

    // get one list when given listid
    var getOneList = function (listid) {
      return $http({
        method: "GET",
        url: "/api/list/" + listid
      })
        .then(function (res) {
          return res.data
        })
    }



    // posting a new lists
    var addOrder = function (order) {
      return $http({
        method: "POST",
        url: "/api/orders",
        data: JSON.stringify(order)
      });
    }

      // Delete Order
    var deleteOrder = function (orderid) {
      return $http({
        method: "DELETE",
        url: "/api/orders/" + orderid
      })
    }

    // Update Order/ adnmin will update status ie approve request
    var updateOrder = function (order) {
      return $http({
        method: "PUT",
        url: "/api/orders",
        data: JSON.stringify(order)
      });
    }

    return {
      getOrders: getOrders,
      getAllOrders: getAllOrders,
      getOneList: getOneList,
      addOrder: addOrder,
      updateOrder: updateOrder,
      deleteOrder: deleteOrder
    }

  })
