const { Schema, model } = require("mongoose");
const { schema } = require("./User");

const FriendListSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  status: {
    type: Number,
    enum: [0, 1, 2, 3],
  },
});

module.exports = model("Friends", FriendListSchema);
