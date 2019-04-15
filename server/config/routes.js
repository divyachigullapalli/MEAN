// require userHandler, listHandler
var userHandler = require('../users/userHandler.js');
var listHandler = require('../lists/listHandler.js');
var orderHandler = require('../OrderDetails/orderHandler.js');

// export function
module.exports = function(app, express){

  // TODO:  Coordinate with frontend on
  //        the request url names ('/api/...')

  // POST - signin
  app.post('/api/signin', userHandler.signin);
  // POST - signup
  app.post('/api/signup', userHandler.signup);
  // GET- stationery products
  app.get('/api/products', listHandler.getAllItems);
// GET all orders for Admin
  app.get('/api/orders', orderHandler.getAllOrders);
  //   // GET - getLists (users orders)
  // app.get('/api/orders/:id', orderHandler.getOrders);

   // POST - addOrder
   app.post('/api/orders', orderHandler.addOrder);
   // POST - addOrder
   app.delete('/api/orders/:id', orderHandler.deleteOrder);
    // // PUT - for updating Order
    //  app.put('/api/orders', orderHandler.updateStatus);
   // PUT - for updating Order
    app.put('/api/orders', orderHandler.updateOrder);
    

  app.get('/test', function(req,res){
    res.json('hey hey hey I’m aliiiive!');
   });

  

};