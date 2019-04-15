// require helper, User, List
var helper = require('../config/helper.js');
var User = require('../users/userModel.js');
var List = require('./listModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

    // getAllItems method
  getAllItems: function(req, res){
    List.find({})
      .then(function(lists){
          console.log(lists) // returns array of items
        res.json(lists);
      });
  },


  // updateStatus method
  updateStatus: function(req, res){
    var listid = req.body.listid;
    var userid = req.body.userid;

    List.findOne({'_id': listid}, function(err, list){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne list err: ", err);
      } else {
        if (!list) { // notifies if list is not found
          helper.sendError("List not found", req, res);
        } else {
          List.update({'_id': listid}, {'deliverer_id': userid}, function(err, result){
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