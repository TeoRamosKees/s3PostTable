"use server";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import dotenv from "dotenv";
import prisma from "./db";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

dotenv.config();

const bucketName = process.env.BUCKET_NAME!;
const bucketRegion = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretKey = process.env.SECRET_KEY!;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
});

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function addPost(formData: FormData) {
  // get the image file
  const file: File | null = formData.get("image") as unknown as File;
  // process the file for upload (get image buffer)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // resize image to look like instagram or tik tok post
  const resizedImageBuffer = await sharp(buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();

  const imageName = randomImageName();
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: resizedImageBuffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const post = await prisma.posts.create({
    data: {
      image_url: "",
      image_caption: formData.get("caption") + "",
      image_name: imageName,
      created: formData.get("created") + "",
    },
  });
  revalidatePath("/");
  redirect("");
  return post;
}

export async function getPosts() {
  const posts = await prisma.posts.findMany({ orderBy: [{ created: "desc" }] });
  for (const post of posts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: post.image_name + "",
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.image_url = url;
  }
  return posts;
}

export async function deletePost(id_post: number) {
  const post = await prisma.posts.findUnique({ where: { id_post } });
  if (!post) {
    return "post not found";
  }

  const params = {
    Bucket: bucketName,
    Key: post.image_name + "",
  };

  const command = new DeleteObjectCommand(params);

  await s3.send(command);

  await prisma.posts.delete({ where: { id_post } });

  revalidatePath("/");

  return post;
}
