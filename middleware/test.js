function testMiddleware() {
  return (req, res, next) => {
    next();
  };
}

module.exports = testMiddleware;
