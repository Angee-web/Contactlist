// import all the necessary packages
const express = require("express");
const mongoose = require("mongoose");

// destructure ObjectId from mongodb to enable filter operations with Id
const { ObjectId } = require("mongodb");

// create an instance of express
const app = express();

// middlewares 
app.use(express.json());

// connect to mongoose using the connection string that includes the database name
mongoose.connect("mongodb://localhost:27017/CONTACT");
// once connected send message to the console
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected");
});

// define a Schema
const contactSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
}, 
// { collection: 'Contactlist' } // reference the collection to be used
);

// assign schema to a model for the contactlist collection
const Contact = mongoose.model("Contact", contactSchema, "Contactlist"); // the collection can also be referenced in the model

// define routes here using http methods
app.get("/", (req, res) => {
    res.status(200).json({msg: "Connected"});
});

// to get all contacts
app.get("/api/contacts", async (req, res) => {
  try{
    const contactList = await Contact.find();
    res.status(200).send({
      status: "success",
      data: contactList
    });
  }catch(error){
    res.status(500).json({ msg: error.message });
  }
});

// to get one contact
app.get("/api/oneContact/:contactId", async (req, res) => {
  try{
    const contactList = await Contact.findById(req.params.contactId);
    if(!contactList){
      res.status(400).send({ msg: "Contact not found" });
    }
    res.status(200).send({ data: contactList });
  }catch(error){
    res.status(500).json({ msg: error.message });
  }
});

// to get contact by name
// app.get("/api/contact/:contactFirstName", async (req, res) => {
//   try {
//     const contactList = await Contact.findOne({ firstname: req.params.contactFirstName });
//     if (!contactList) {
//       return res.status(400).send({ msg: "Contact not found" });
//     }
//     res.status(200).send({ data: contactList });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

// to get contacts with age greater than 18
app.get("/api/contacts/gt18", async (req, res) => {
  try {
    const contactList = await Contact.find({ age: { $gt: 18 } });
    console.log("Filtered contacts: ", contactList);
    res.status(200).send({
      status: "success",
      data: contactList
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// to get contacts with age greater than 18 and name containg ah
app.get("/api/contacts/gt18/nameAh", async (req, res) => {
  try {
    const contactList = await Contact.find({
      age: { $gt: 18 },
      firstname: { $regex: "ah",  $options: "i" } // the options i makes a case-insensitive search
    });
    res.status(200).send({
      status: "success",
      data: contactList
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}); //an empty string is returned because there is no contact with the firstname or lastname substring ah that is greater than 18

// to get contacts with age less than 18 and firstname or lastname containg a or h
app.get("/api/contacts/gt18/nameA", async (req, res) => {
  try {
    const contactList = await Contact.find({
      age: { $lt: 18 },
      $or: [
        {lastname: { $regex: "[ah]",  $options: "i" }},
        {firstname: { $regex: "[ah]",  $options: "i" }},
      ] 
       // the options i makes a case-insensitive search
    });
    res.status(200).send({
      status: "success",
      data: contactList
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// function to update contact partially
app.patch("/api/contactUpdate/:contactId", async(req, res) => {
  const id = req.params.contactId;
  try{
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body
    );
    if(!updatedContact) 
        return res.status(404).json({
        status: "error",
        message: "Contact not found",
    });
      res.status(200).json({
      status: "success",
      data: updatedContact,
  });
  }
  catch(error){
    res.status(500).json({ msg: error.message });
  }
})

// function to update contact partially
app.put("/api/contactUpdate/:contactId", async(req, res) => {
  const id = req.params.contactId;
  try{
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body
    );
    if(!updatedContact) 
        return res.status(404).json({
        status: "error",
        message: "Contact not found",
    });
      res.status(200).json({
      status: "success",
      data: updatedContact,
  });
  }
  catch(error){
    res.status(500).json({ msg: error.message });
  }
})

// to delete the contacts that are aged under <5.
app.delete("/api/contacts/under5", async (req, res) => {
  try {
    const contactList = await Contact.deleteMany({ age: { $lt: 5 } });
    res.status(200).send({
      status: "success",
      msg: `${contactList.deletedCount} contacts deleted`
    });
  } 
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// assign port number
const port = 3012

// make app listen to the port
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});