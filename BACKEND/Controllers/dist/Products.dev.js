"use strict";

var Product = require('../Models/Product');

exports.showAllProducts = function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          products = _context.sent;
          res.send(products);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.send(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.addNewProduct = function _callee2(req, res) {
  var _req$body, name, type, color, price, size, newItem;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, name = _req$body.name, type = _req$body.type, color = _req$body.color, price = _req$body.price, size = _req$body.size;
          newItem = new Product({
            name: name,
            type: type,
            color: color,
            price: price,
            size: size
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(newItem.save());

        case 5:
          res.send(newItem);

          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.send(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getByCategory = function _callee3(req, res) {
  var type;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            type = req.body.type;
            console.log(type); // const category = await Product.find({ type })
            // console.log(category)
            // res.send(category)
          } catch (error) {
            console.log(error);
            res.send(error);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};