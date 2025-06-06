import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../core/dto/auth.dto";
import { AuthService } from "../../infrastructure/services/AuthService";
import { handleErrorResponse } from "../../utils/errors/errorResponse";
import { ExpressHandler } from "../../utils/types/apis";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login: ExpressHandler<LoginRequest, LoginResponse> = async (req, res) => {
    try {
      const { user, accessToken, refreshToken } = await this.authService.login(req.body as LoginRequest);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({ user, accessToken });
    } catch (error: any) {
      handleErrorResponse(res, error);
    }

    return;
  };

  register: ExpressHandler<RegisterRequest, RegisterResponse> = async (req, res) => {
    try {
      const { user, accessToken, refreshToken } = await this.authService.register(req.body as RegisterRequest);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(201).json({ user, accessToken });
    } catch (error: any) {
      handleErrorResponse(res, error);
    }

    return;
  };

  refreshToken: ExpressHandler<{}, { accessToken: string; refreshToken: string }> = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ details: "Refresh token missing" });
        return;
      }

      const { accessToken, refreshToken: newRefreshToken } = await this.authService.refreshToken(refreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error: any) {
      handleErrorResponse(res, error);
    }

    return;
  };

  logout: ExpressHandler<{}, { message: string }> = async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      handleErrorResponse(res, error);
    }

    return;
  };
}
