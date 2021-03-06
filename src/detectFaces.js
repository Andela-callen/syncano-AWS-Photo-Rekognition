import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const uploadedImage = rekognitionHelper.confirmImage(
    ctx.args.image,
    ctx.args.bucketName
  );

  const detectedFaces = rekognitionHelper.detectFaces(
    uploadedImage,
    ctx.args.attr
  );
  return detectedFaces
    .then(function(data) {
      response.json({
        message: "Faces Detected",
        data
      });
    })
    .catch(function(err) {
      response.json({
        statusCode: 400,
        code: err.code,
        message: err.message
      });
    });
};
