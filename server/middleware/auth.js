import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) 
    return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
}
