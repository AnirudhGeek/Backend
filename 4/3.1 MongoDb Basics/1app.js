const mongoose = require("mongoose");
const { stringify } = require("querystring");

//connnection
mongoose
  .connect(
    "mongodb+srv://annigeek:q9VDZ0cpj07Q2atY@cluster0.optjvty.mongodb.net/"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log(e));

//Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String], // array of string
  createdAt: { type: Date, default: Date.now },
});

//create user model
const User = mongoose.model("User", userSchema); // this User model is the amin entry point where you need to take reference from, suppose we want to create new user than this model will give us the method to make a new user

async function runQueryExamples() {
  try {
    //create a new document
    const newUser1 = await User.create({
      name: "Updated User",
      email: "updated@gmail.com",
      age: 25,
      isActive: true,
      tags: ["Professor"],
    });
    console.log("Created new user => ", newUser1);

    // //OR this is one more method of creating user
    // const newUser2 = new User({
    //   name: "John Doe",
    //   email: "doeJohn1@gmail.com",
    //   age: 25 ,
    //   isActive: true,
    //   tags: ["Engineer", "Trainer", "Musician"],
    // });
    // await newUser2.save()
    // console.log("Created new user => ", newUser2);

    //getting all the users
    const allUsers = await User.find({});
    console.log(allUsers);

    //getting specific things from the user
    const getUserActiveFalse = await User.find({ isActive: false });
    console.log(getUserActiveFalse);

    //findOne +> findOne finds the first document that matches the criteria
    const getJohnDoeUser = await User.findOne({ name: "John Doe" });
    console.log(getJohnDoeUser);

    // getting user by user id
    const getLastCreatedUserByUserId = await User.findById(newUser1._id);
    console.log(getLastCreatedUserByUserId);

    //getting details about some selected fields
    const selectedFields = await User.find().select("name email -_id"); //-(minus) refers that we dont need id property
    console.log(selectedFields);

    //if we want to some items and skip some specific items
    const limitedUsers = await User.find().limit(5).skip(1); //here we are returning 5 users and skipping the first user
    console.log(limitedUsers);

    //if we want to do some sorting
    const sortedUsers = await User.find().sort({ age: -1 }); // here -1 shows age will be sorted in descending order  and if we want to sort it in ascending order then we have to write age : 1
    console.log(sortedUsers);

    //counting the number of documents
    const countDoc = await User.countDocuments({ isActive: false });
    console.log(countDoc);

    //deleting a user
    const deletedUser = await User.findByIdAndDelete(newUser1._id)
    console.log(deletedUser)

    //updating a user
    const updateUser = await User.findByIdAndUpdate(
      newUser1._id,
      {
        $set: { isActive: false },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log("Updated user => ", updateUser);
  } catch (e) {
    console.log("Error => ", e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
