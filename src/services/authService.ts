import axios from "axios";
import { Util } from "../Util";
import { AppResponse } from "../models/Response";
import { User } from "models/user";

export interface UserLoginData {
  email: string;
  password: string;
  termsAndConditions: boolean;
}

export class AuthService {
    private static readonly TOKEN_KEY = "token";

    public static async getMe(): Promise<AppResponse<User>> {
      const ep = Util.apiAuthUrl("me");
      const res = await axios.get<void, AppResponse<User>>(ep);
      if (res.error) {
       localStorage.removeItem(AuthService.TOKEN_KEY);
      }
      return res;
    }
  
    public static async userLogin(userLoginData: UserLoginData): Promise<AppResponse<string>> {
      const ep = Util.apiPublicUrl("sign-in");
      const res = await axios.post<UserLoginData, AppResponse<string>>(ep, userLoginData);
      if (res.success) localStorage.setItem(AuthService.TOKEN_KEY, res.data);
      if (userLoginData.termsAndConditions) {
        localStorage.setItem("remember", "Yes");
      } else {
        // eslint-disable-next-line no-lone-blocks
        {
            localStorage.setItem("remember", "");
        }
      }
      return res;
    }
  
    public static async userSignup(userSignupData: User): Promise<AppResponse<string>> {
      const ep = Util.apiPublicUrl("signup");
      const res = await axios.post<UserLoginData, AppResponse<string>>(ep, userSignupData);
      if (res.success) {
        localStorage.setItem(AuthService.TOKEN_KEY, res.data); //TODO read token from cookie and remove this implementation
        localStorage.setItem("data", JSON.stringify(userSignupData));
      }
      return res;
    }
  
    // public static async emailOTPVerification(emailOTPVerificationData: EmailOTPVerificationData): Promise<AppResponse<string>> {
    //   const ep = Util.apiPublicUrl("verify");
    //   const res = await axios.post<EmailOTPVerificationData, AppResponse<string>>(ep, emailOTPVerificationData);
    //   return res;
    // }
  
    // public static async resetVerification(resetVerificationData: ResetVerificationData): Promise<AppResponse<string>> {
    //   const ep = Util.apiPublicUrl("password/reset");
    //   const res = await axios.post<EmailOTPVerificationData, AppResponse<string>>(ep, resetVerificationData);
    //   return res;
    // }
  
    // public static async forgetPasswordEmail(forgetPasswordEmailData: ForgetPasswordEmailData): Promise<AppResponse<string>> {
    //   const ep = Util.apiPublicUrl("password/recover");
    //   const res = await axios.post<ForgetPasswordEmailData, AppResponse<string>>(ep, forgetPasswordEmailData);
    //   return res;
    // }
  
    // public static async forgetPasswordOTPVerification(emailOTPVerificationData: EmailOTPVerificationData): Promise<AppResponse<string>> {
    //   const ep = Util.apiPublicUrl("verify-otp");
    //   const res = await axios.post<EmailOTPVerificationData, AppResponse<string>>(ep, emailOTPVerificationData);
    //   return res;
    // }
  
    public static userLogout(): void {
      localStorage.removeItem(AuthService.TOKEN_KEY); //TODO read token from cookie and remove this implementation
    }
  
    public static getToken(): string | null {
      return localStorage.getItem(AuthService.TOKEN_KEY); //TODO read token from cookie and remove this implementation
    }
  
    public static setToken(token: string): void {
      localStorage.setItem(AuthService.TOKEN_KEY, token); //TODO read token from cookie and remove this implementation
    }
  
    // public static async resendOtp(email: Partial<EmailOTPVerificationData>): Promise<AppResponse<null>> {
    //   const ep = Util.apiPublicUrl("resend/otp");
    //   const res = await axios.post<string, AppResponse<null>>(ep, email);
    //   return res;
    // }
  
    // public static async updateOperatingHours(data: User): Promise<AppResponse<string>> {
    //   const ep = Util.apiAuthUrl("user/operating-hours");
    //   const res = await axios.post<User, AppResponse<string>>(ep, data);
    //   return res;
    // }
  
    // public static async comparePassword(data: any): Promise<AppResponse<string>> {
    //   const ep = Util.apiAuthUrl("user/compare-password");
    //   const res = await axios.post<void, AppResponse<string>>(ep, data);
    //   return res;
    // }
  
    // public static async changePassword(data: any): Promise<AppResponse<string>> {
    //   const ep = Util.apiAuthUrl("user/password");
    //   const res = await axios.post<void, AppResponse<string>>(ep, data);
    //   return res;
    // }
  
    // public static async uploadImage(data: any): Promise<AppResponse<User>> {
    //   const ep = Util.apiAuthUrl("user/upload-image");
    //   const res = await axios.post<any, AppResponse<User>>(ep, data, { headers: { "Content-Type": "multipart/form-data" } });
    //   return res;
    // }
  
    // public static async getProfileImage(imageId?: string): Promise<AppResponse<string>> {
    //   const ep = Util.apiAuthUrl(`user/image/` + imageId);
    //   const res = await axios.get<void, AppResponse<string>>(ep);
    //   return res;
    // }
}