import AWS from "aws-sdk";
import Syncano from "syncano-server";
import helper from "./util/helper";

export default ctx => {
  const { response, logger } = Syncano(ctx);

  const log = logger("Socket scope");

  const rekognitionHelper = new helper(ctx.config);

  const listedFaces = rekognitionHelper.listFaces(
    ctx.args.collectionId,
    ctx.args.maxResults,
    ctx.args.nextToken
  );

  listedFaces
    .then(function(data) {
      log.info(data);
      response.json({
        message: "List of Faces.",
        data
      });
    })
    .catch(function(err) {
      log.info(err);
      response.json({
        statusCode: err.statusCode || 400,
        code: err.code,
        message: err.message
      });
    });
};
