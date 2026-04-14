import { Module } from '@nestjs/common';
import { UniversitiesModule } from './universities/universities.module';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AgentModule } from './agent/agent.module';
import { StudentModule } from './student/student.module';
import { VisaModule } from './visa/visa.module';
import { ApplicationModule } from './application/application.module';
import { NotaryModule } from './notary/notary.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UniversitiesModule,
    CourseModule,
    AuthModule,
    UsersModule,
    AgentModule,
    StudentModule,
    VisaModule,
    ApplicationModule,
    NotaryModule,
  ],
  providers: [EmailService],
})
export class AppModule {}
