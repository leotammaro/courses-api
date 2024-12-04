import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { AuthDto } from '../dto/auth.dto';

export interface IAuthExternalProvider {
  signUp(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; externalId: string }>;
}

export class FireBaseAuthService implements IAuthExternalProvider {
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
  }

  async signUp(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; externalId: string } | any> {
    const auth = getAuth();

    const userCreated = await createUserWithEmailAndPassword(
      auth,
      authDto.email,
      authDto.password,
    );
    sendEmailVerification(userCreated.user);
    const accessToken = (await userCreated.user.getIdTokenResult()).token;

    return {
      accessToken,
      externalId: userCreated.user.uid,
    };
  }
}

export const EXTERNAL_AUTH_SERVICE = 'AUTH_SERVICE';
