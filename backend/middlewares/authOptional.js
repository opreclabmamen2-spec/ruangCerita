import jwt from "jsonwebtoken";

const optionalAuth = async (req, res, next) => {
  try {
    console.log("HEADERS:", req.headers);

    let token = req.headers.token;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN:", token);

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      req.userId = decoded.userId;
    }

    next();
  } catch (error) {
    console.log("OPTIONAL AUTH ERROR:", error);
    next();
  }
};

export default optionalAuth;