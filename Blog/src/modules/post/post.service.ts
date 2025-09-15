import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../db/db";

const createPost = async (payload: Prisma.PostCreateInput) => {
  const result = await prisma.post.create({
    include: {
      author: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    data: payload,
  });
  return result;
};

// const getAllPost = async (page: number, limit: number, search: string) => {
//   const skip = (page - 1) * limit;
//   const result = await prisma.post.findMany({
//     skip,
//     take: limit,
//     where: {
//       OR: [
//         {
//           title: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//         {
//           content: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//       ],
//     },
//   });
//   return result;
// };

const getAllPost = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      // typeof isFeatured === "boolean" && { isFeatured },
    ],
  };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
  });

  return result;
};

const getSinglePostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updatePost = async (id: number, payload: Prisma.PostUpdateInput) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const dltPost = async (id: number) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};
export const PostService = {
  createPost,
  updatePost,
  getAllPost,
  getSinglePostById,
  dltPost,
};
