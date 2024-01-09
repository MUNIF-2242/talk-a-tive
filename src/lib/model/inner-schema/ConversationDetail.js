import { conversationContentDefaultSchema } from "../../constants/default-data/ConversationContentDefaultSchema";
import mongoose from "mongoose";

export const conversationDetailSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: [true, "++ senderId is required in conversation detail schema"],
    },
    receiverId: {
      type: String,
      required: [true, "++ receiverId is required in conversation detail schema"],
    },
    content: {
      _id: false,
      type: conversationContentDefaultSchema(),
    },
    contentType: {
      type: String,
      required: [
        true,
        "++ content type is required in conversation detail schema",
      ],
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: Number,
      required: [true, "++ orderId is required in conversation detail schema"],
    },
  },
  {
    timestamps: true,
  }
);
