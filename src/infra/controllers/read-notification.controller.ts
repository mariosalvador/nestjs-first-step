import { ReadNotificationUseCase } from "@/domain/notifications/aplications/use-cases/read-notification";
import { BadRequestException, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { CurrentUser } from "../http/auth/current-user-decorator";
import { type UserPayload } from "../http/auth/jwt-strategy";


@Controller("/notifications/:notificationId/read")
export class ReadNotificationController {
  constructor(
    private readNotificationUseCase: ReadNotificationUseCase
  ) { }

  @Patch()
  @HttpCode(204)
  async handle(@Param('notificationId') notificationId: string, @CurrentUser() user: UserPayload) {
    const result = await this.readNotificationUseCase.execute({
      notificationId,
      recipientId: user.sub
    })

    if (result.isLeft()) {
      throw new BadRequestException("Error to read notification");
    }
  }
}