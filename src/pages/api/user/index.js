import withRequestResponseHandler from "../../../lib/middleware/RequestResponseHandler";
import { createUserService, getUsersService } from "../../../lib/services/user-service";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return createUserService(req.body);
    case "GET":
      return getUsersService();
  }
};

export default withRequestResponseHandler(handler);
