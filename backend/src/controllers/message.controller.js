import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: anotherId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: anotherId },
        { senderId: anotherId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(
      `Error in message.controller.js in getMessages : ${error.message}`
    );
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    let imageURL;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });

    await newMessage.save();

    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(
      `Error in message.controller.js in sendMessages! : ${error.message}`
    );
    res.status(500).json({ message: "Internal Server Error!" });
  }
};