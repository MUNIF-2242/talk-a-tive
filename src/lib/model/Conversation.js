import mongoose from "mongoose";
import { userDefaultSchema } from "../constants/default-data/UserDefaultSchema";
import { conversationDetailSchema } from "./inner-schema/ConversationDetail";

const conversationSchema = mongoose.Schema(
  {
    participantOne: {
      _id: false,
      type: userDefaultSchema("conversation"),
    },
    participantTwo: {
      _id: false,
      type: userDefaultSchema("conversation"),
    },
    conversation: [conversationDetailSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Conversation ??
  mongoose.model("Conversation", conversationSchema);
