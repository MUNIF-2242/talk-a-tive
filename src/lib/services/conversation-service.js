import { conversationRepository } from "../repositories/conversation-repository"

export const createConversationService = async ({participantOneId,participantTwoId}) => {
  try {
    const oldConversationId = await checkConversationAvailabilityService({participantOneId,participantTwoId});
    
    if(!oldConversationId){
      const conversationId = await conversationRepository.create({participantOneId,participantTwoId});
      return conversationId;
    }

    return oldConversationId._id;
  } catch (err) {
    throw new Error("something went wrong for create conversation");
  }
};

export const checkConversationAvailabilityService = async ({participantOneId,participantTwoId}) => {
  try {
    const result = await conversationRepository.find({participantOneId,participantTwoId});
    return result;
  } catch (err) {
    throw new Error("something went wrong for checking conversation availability");
  }
};

export const getConversationDetailService = async ({conversationId}) => {
  try {
    const result = await conversationRepository.get({conversationId});
    return result;
  } catch (err) {
    throw new Error("something went wrong for find conversation detail");
  }
};

export const updateConversationService = async ({conversationId,message}) => {
  try {
    await conversationRepository.update({conversationId,message});
    const result = await conversationRepository.findOne({conversationId});
    return result[0];
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong for update conversation");
  }
};

export const updateConversationSeenService = async ({conversationId,messageId}) => {
  try {
    await conversationRepository.updateSeen({conversationId,messageId});
    return "updated";
  } catch (err) {
    throw new Error("something went wrong for seen update conversation");
  }
};

export const updateConversationMessageEditService = async ({conversationId,messageId,message}) => {
  try {
    await conversationRepository.updateMessage({conversationId,messageId,message});
    return "updated";
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong for message update conversation");
  }
};

export const updateConversationMessageDeleteService = async ({conversationId,messageId}) => {
  try {
    await conversationRepository.deleteMessage({conversationId,messageId});
    return "updated";
  } catch (err) {
    throw new Error("something went wrong for message delete conversation");
  }
};