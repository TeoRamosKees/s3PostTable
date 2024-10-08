"use server";
import { Post } from "./types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addPost(post: Post) {
  await prisma.posts.create({
    data: {
      image_url: post.image_url,
      image_caption: post.image_caption,
      image_name: post.image_name,
      created: post.created,
    },
  });
}
