const jwt = require("jsonwebtoken");
const {
  getUser,
  createUser,
} = require("../services/db/socialLoginService");

exports.googleLogin = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;
  await verifyTokenId(tokenId)
    .then(async (response) => {
      const { email_verified, name, email, picture } = response.payload;
      if (email_verified) {
        const user = await getUser({ email: email });

        if (user) {
          const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET);
          return res
            .status(200)
            .json(success("", `Bearer ${token}`, res.statusCode));
        } else {
          await createUser({
            fullName: name,
            createdBy: name,
            updatedBy: name,
            email,
            profileImage: picture,
          });
          const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET);
          return res
            .status(200)
            .json(success("", `Bearer ${token}`, res.statusCode));
        }
      }
    })
    .catch((err) => {
      res.status(500).json(error(err.message, res.statusCode));
    });
});
