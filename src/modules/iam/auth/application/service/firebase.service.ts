import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { AuthDto } from '../dto/auth.dto';

export interface IAuthExternalProvider {
  signUp(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; externalId: string }>;

  signIn(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string; externalId: string }>;
}

export class FireBaseAuthService implements IAuthExternalProvider {
  auth: Auth;
  constructor() {
    initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    });
    this.auth = getAuth();
  }

  async signUp(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; externalId: string } | any> {
    const userCreated = await createUserWithEmailAndPassword(
      this.auth,
      authDto.email,
      authDto.password,
    );
    sendEmailVerification(userCreated.user);
    const accessToken = (await userCreated.user.getIdTokenResult()).token;
    const externalId = userCreated.user.uid;

    return {
      accessToken,
      externalId,
    };
  }

  async signIn(authDto: AuthDto): Promise<{
    accessToken: string;
    refreshToken: string;
    externalId: string;
  }> {
    const userResponse = await signInWithEmailAndPassword(
      this.auth,
      authDto.email,
      authDto.password,
    );
    const accessToken = (await userResponse.user.getIdTokenResult()).token;
    const refreshToken = userResponse.user.refreshToken;
    const externalId = userResponse.user.uid;

    return {
      accessToken,
      refreshToken,
      externalId,
    };
  }
}

export const EXTERNAL_AUTH_SERVICE = 'AUTH_SERVICE';
