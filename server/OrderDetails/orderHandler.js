// require helper, User, List
var helper = require('../config/helper.js');
var Orders = require('./orderModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

 // addOrder method
 addOrder: function(req, res){
    var newListObj = req.body;
    Orders.create(newListObj, function(err, order){
      if (err) { // notifies if error is thrown
        console.log("mongo create Order err: ", err);
        helper.sendError(err, req, res);
      } else { // list created, sends 201 status
        //res.status(201);
        res.json(order);
      }
    });
  },

    // getAllItems method
  getAllOrders: function(req, res){
    Orders.find({})
      .then(function(orders){
          console.log(orders) // returns array of items
        res.json(orders);
      });
  },

  //deleteOrder
  deleteOrder: function(req, res){
    var listid = req.params.id;

    Orders.remove({'_id': listid}, function(err, result){
      if (err) { // notifies if error is thrown
        console.log("mongo deleteOne list err: ", err);
        helper.sendError(err, req, res);
      } else { // delete successful, sends result of operation
        res.json(result);
      }
    });
  },

  // // updateStatus method
  // updateStatus: function(req, res){
  //   var orderId = req.body.orderId;
  //   var status = req.body.status;
  //   console.log("request",req)
  //   Orders.findOne({'_id': orderId}, function(err, list){
  //     if (err) { // notifies if error is thrown
  //       console.log("mongo findOne list err: ", err);
  //     } else {
  //       if(!list){
  //         console.log("No itmes")
  //       }
  //         Orders.update({'_id': orderId}, {'Status': status}, function(err, result){
  //           if (err) { // notifies if error is thrown
  //             console.log("mongo update err: ", err);
  //           } else { // update successful, returns result
  //             res.json(result); 
  //           }
  //         });
  //     }
  //   });
  // },

  // updateOrder method
  updateOrder: function (req, res) {
    var orderId = req.body.orderId;
    var id = req.body.id;
    var status = req.body.status;

    Orders.findOne({ '_id': orderId }, function (err, order) {
      if (err) { // notifies if error is thrown
        console.log("mongo create Order err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (!status) {
          Orders.update({ '_id': orderId, 'items': { $elemMatch: { 'id': id } } },
            { $set: { 'items.$.quantity': req.body.quantity, 'items.$.total': req.body.total } }, function (err, result) {
              console.log("result:", result)
              if (err) { // notifies if error is thrown
                console.log("mongo update err: ", err);
              } else { // update successful, returns result
                console.log("mongo update res: ", result);
                res.json(result);
              }
            });
        } else {
          Orders.update({ '_id': orderId }, { 'Status': status }, function (err, result) {
            if (err) { // notifies if error is thrown
              console.log("mongo update err: ", err);
            } else { // update successful, returns result
              res.json(result);
            }
          });
        }
      }
    });
  }

};