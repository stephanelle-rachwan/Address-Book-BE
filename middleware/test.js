const jwt = require("jsonwebtoken");
function testMiddleware() {
  return (req, res, next) => {
    console.log(`${req.query.id}`);
    const token = req.body.token;

    if (!token)
      res.status(403).json({
        message: "Error: User isn't logged in.",
      });
    try {
      if (token) {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      }
    } catch (error) {
      res.status(401).json({
        message: "Error: Token is invalid.",
      });
    }
    next();
  };
}
module.exports = testMiddleware;
