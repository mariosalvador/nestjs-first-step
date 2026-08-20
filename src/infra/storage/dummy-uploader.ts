import { Uploader, UploadParams } from "@/domain/forum/application/storage/uploader";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class DummyUploader implements Uploader {
  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    return {
      url: `https://storage.example.com/${uniqueFileName}`,
    };
  }
}
