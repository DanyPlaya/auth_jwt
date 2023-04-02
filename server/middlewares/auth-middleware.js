import { ApiError } from "../exeptions/api-error.js";
import { tokenService } from "../service/token-service.js";
export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizatedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizatedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizatedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizatedError());
  }
};
