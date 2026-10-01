import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';

export class AdditionalModules {
  static modules = [AppModule, AuthModule];
}
