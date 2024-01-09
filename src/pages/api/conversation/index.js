import withRequestResponseHandler from "../../../lib/middleware/RequestResponseHandler";
import { createConversationService, getConversationDetailService } from "../../../lib/services/conversation-service";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return createConversationService(req.body);
    case "GET":
      return getConversationDetailService({conversationId:req.query.conversationId});
  }
};

export default withRequestResponseHandler(handler);