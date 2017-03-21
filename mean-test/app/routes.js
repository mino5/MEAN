var mongoose = require('mongoose');
// grab the nerd model we just created
var BOOKS_COLLECTION = "books";

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/books', function(req, res) {
      req.db.collection(BOOKS_COLLECTION).find({}).toArray(function(err, docs) {
         if (err) {
           handleError(res, err.message, "Failed to get books.");
         } else {
           res.status(200).json(docs);
         }
       });
    });

    app.post("/api/books", function(req, res) {
        var newBook = req.body;
        newBook.createDate = new Date();

        if (!req.body.author) {
          handleError(res, "Invalid user input", "Must provide an author.", 400);
        }

        req.db.collection(BOOKS_COLLECTION).insertOne(newBook, function(err, doc) {
          if (err) {
            handleError(res, err.message, "Failed to create new book.");
          } else {
            res.status(201).json(doc.ops[0]);
          }
        });
    });

    app.put("/api/books/:id", function(req, res) {
      console.log("route put");
      console.log(req);

        var updateDoc = req.body;
        delete updateDoc._id;
        req.db.collection(BOOKS_COLLECTION).updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, updateDoc, function(err, doc) {
          if (err) {
            handleError(res, err.message, "Failed to update book");
          } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
          }
        });
    });

    app.delete("/api/books/:id", function(req, res) {
      req.db.collection(BOOKS_COLLECTION).deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete book");
        } else {
          res.status(200).json(req.params.id);
        }
      });
    });
    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

};
