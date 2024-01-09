import { connectMongoDB } from "../../config/DB";

export default (handler) => { 
  return async (req, res) => {
    try {
      await connectMongoDB();

      const result = await handler(req, res);
      const statusCode = res?.statusCode || 200;

      res.status(statusCode).json({
        type: "RESULT",
        message: res.message || "OK",
        result,
        error: null,
      });
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode);
      }
      const statusCode = res?.statusCode || 500;
      res.status(statusCode).json({
        type: "ERROR",
        message: res.message,
        result: res?.result || null,
        error: error.stack,
      });
    }
  };
};
