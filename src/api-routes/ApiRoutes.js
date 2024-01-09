import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
  return req;
});

export const createUser = ({name,password}) => API.post("/api/user", {userName:name,Password:password});

export const getUserList = () => API.get(`/api/user`);

export const createConversation = ({participantOneId,participantTwoId}) => API.post("/api/conversation", {participantOneId,participantTwoId});

export const getConversationDetail = (conversationId) => API.get(`/api/conversation?conversationId=${conversationId}`);
