import Conversation from "../model/Conversation";

const create = async ({ participantOneId, participantTwoId }) => {
  const newConversation = new Conversation({
    participantOne: {
      userId: participantOneId,
      userType: "user",
    },
    participantTwo: {
      userId: participantTwoId,
      userType: "user",
    },
    conversation: [],
  });

  await newConversation.save();
  const conversationId = newConversation._id;

  return conversationId;
};

const find = async ({ participantOneId, participantTwoId }) => {
  const conversation = await Conversation.findOne({
    $or: [
      {
        $and: [
          { "participantOne.userId": participantOneId },
          { "participantTwo.userId": participantTwoId },
        ],
      },
      {
        $and: [
          { "participantTwo.userId": participantOneId },
          { "participantOne.userId": participantTwoId },
        ],
      },
    ],
  });

  return conversation;
};

const get = async ({ conversationId }) => {
  const conversation = await Conversation.findById(conversationId);

  return conversation;
};

const update = async ({ conversationId, message }) => {
  const { senderId, receiverId, content, contentType, orderId, isSeen } =
    message;

  await Conversation.updateOne(
    {
      _id: conversationId,
    },
    {
      $push: {
        conversation: {
          senderId: senderId,
          receiverId: receiverId,
          content: {
            text: content.text,
          },
          contentType: contentType,
          isSeen: false,
          orderId: orderId,
        },
      },
    },
    { new: true }
  );
};

const findOne = async ({ conversationId }) => {
  const conversation = await Conversation.findOne(
    { _id: conversationId },
    { conversation: { $slice: -1 } }
  ).exec();

  return conversation.conversation;
};

const updateSeen = async ({ conversationId, messageId }) => {
  await Conversation.updateOne(
    {
      $and: [{ _id: conversationId }, { "conversation._id": messageId }],
    },
    { $set: { "conversation.$.isSeen": true } }
  ).exec();
};

const updateMessage = async ({ conversationId, messageId, message }) => {
  await Conversation.updateOne(
    {
      $and: [{ _id: conversationId }, { "conversation._id": messageId }],
    },
    { $set: { "conversation.$.content.text": message } }
  ).exec();
};

const deleteMessage = async ({ conversationId, messageId }) => {
  await Conversation.updateOne(
    { _id: conversationId },
    { $pull: { conversation: { _id: messageId } } }
  ).exec();
};

export const conversationRepository = {
  create,
  find,
  get,
  update,
  findOne,
  updateSeen,
  updateMessage,
  deleteMessage,
};
