import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CreateAccountController } from "../controllers/create-account.controller";
import { AutheticateController } from "../controllers/authenticate.controller";
import { CreateQuestionsController } from "../controllers/create-question.controller";
import { FetchRecentQuestionsController } from "../controllers/fetch-recent-questions.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/fetch-recent-question";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/student/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/student/authenticate-student";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { GetQuestionBySlugController } from "../controllers/get-question-by-slug.controller";
import { EditQuestionController } from "../controllers/edit-question.controller";
import { DeleteQuestionController } from "../controllers/delete-question.controller";
import { AnswerQuestionController } from "../controllers/answer-question.controller";
import { EditAnswerController } from "../controllers/edit-answer.controller";
import { DeleteAnswerController } from "../controllers/delete-answer.controller";
import { FetchQuestionAnswersController } from "../controllers/fetch-question-answers.controller";
import { ChooseQuestionBestAnswerController } from "../controllers/choose-question-best-answer.controller";
import { CommentOnQuestionController } from "../controllers/comment-on-question.controller";
import { DeleteQuestionCommentController } from "../controllers/delete-question-comment.controller";
import { CommentOnAnswerController } from "../controllers/comment-on-answer.controller";
import { DeleteAnswerCommentController } from "../controllers/delete-answer-comment.controller";
import { FetchQuestionCommentsController } from "../controllers/fetch-question-comments.controller";
import { FetchAnswerCommentsController } from "../controllers/fetch-answer-comments.controller";
import { GetQuestionsBySlugUseCase } from "@/domain/forum/application/use-cases/questions/get-question-by-slug";
import { EditQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/edit-question";
import { DeleteQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/delete-question";
import { AnswerQuestionsUseCase } from "@/domain/forum/application/use-cases/answer/answer-questions";
import { EditAnswersUseCase } from "@/domain/forum/application/use-cases/answer/edit-answer";
import { DeleteAnswersUseCase } from "@/domain/forum/application/use-cases/answer/delete-answer";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/answer/fetch-questions-answer";
import { ChooseTheBestAnswerForQuestionUseCase } from "@/domain/forum/application/use-cases/answer/choose-the-best-answer-question";
import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/questions/comment-on-question";
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/use-cases/questions/delete-question-comment";
import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/answer/comment-on-answer";
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/use-cases/answer/delete-answer-comment";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/use-cases/questions/fetch-question-comments";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/answer/fetch-answer-comments";
import { UploadAttachmentsController } from "../controllers/upload-attachments.controller";
import { UploadAndCreateAttachmentUseCase } from "@/domain/forum/application/use-cases/attachments/upload-and-create-attachment";
import { StorageModule } from "../storage/storage.module";

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    CryptographyModule,
    StorageModule
  ],
  controllers: [
    CreateAccountController,
    AutheticateController,
    CreateQuestionsController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentsController
  ],
  providers: [
    CreateQuestionsUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionsBySlugUseCase,
    EditQuestionsUseCase,
    DeleteQuestionsUseCase,
    AnswerQuestionsUseCase,
    EditAnswersUseCase,
    DeleteAnswersUseCase,
    FetchQuestionAnswersUseCase,
    ChooseTheBestAnswerForQuestionUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase
  ]
})
export class HttpModule { }