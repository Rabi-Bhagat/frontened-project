{
    _id: ObjectId,
    name: String,
    email: String,
    password: String (hashed with bcrypt),
    preferences: [String], // e.g., ["Sports", "Technology"]
    savedArticles: [ObjectId], // References to news articles
    createdAt: Date,
    updatedAt: Date
  }