import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const region = process.env.S3_REGION || "us-east-1";
const bucket = process.env.S3_BUCKET || "";
const endpoint = process.env.S3_ENDPOINT || undefined;
const accessKeyId = process.env.S3_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || "";
const publicUrlBase = process.env.S3_PUBLIC_URL || "";

if (!bucket) {
  console.warn("S3_BUCKET is not set. Uploads will fail.");
}

const client = new S3Client({
  region,
  endpoint,
  credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
  forcePathStyle: Boolean(endpoint),
});

export async function uploadToS3(params: {
  key: string;
  body: Buffer;
  contentType?: string;
}) {
  const uploader = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
    },
  });

  await uploader.done();

  const url = publicUrlBase
    ? `${publicUrlBase.replace(/\/$/, "")}/${params.key}`
    : endpoint
      ? `${endpoint.replace(/\/$/, "")}/${bucket}/${params.key}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${params.key}`;

  return { url };
}
