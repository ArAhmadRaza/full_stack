
// Define the user schema and model
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true, 
//   },
//   email: {
//     type: String,
//     required: false,
//     unique: true,
//     match: /.+\@.+\..+/,
//   },
//   age: {
//     type: Number,
//     min: 0,
//     max: 120,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', userSchema);

// // Function to create a new user
// const createUser = async () => {
//   try {
//     const newUser = new User({
//       name: 'John Doe',
//       // email: 'Ahmad.doe@example.com',
//       age: 30,
//     });

  //   const savedUser = await newUser.save();
  //   console.log('User saved:', savedUser);
  // } catch (err) {
//     if (err.code === 11000) {
//       console.error('Duplicate key error: A user with this email already exists.');
//     } else {
//       console.error('Error saving user:', err.message);
//     }
//   }
// };

// Start the app
// const startApp = async () => {
//   await connectMongoDB();
//   await createUser();
// };

// startApp();
