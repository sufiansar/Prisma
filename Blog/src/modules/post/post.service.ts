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
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags?.length
        ? {
            tags: {
              hasSome: tags,
            },
          }
        : undefined,
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
  });
  const total = await prisma.post.count({ where });

  return {
    data: result,
    paginations: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const getSinglePostById = async (id: number) => {
  // TransAction and Views Counts
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return await tx.post.findUnique({
      where: {
        id,
      },
      include: { author: true },
    });
  });
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

const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.aggregate({
      _count: true,
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
      _sum: { views: true },
    });

    return {
      Stats: {
        totalPosts: result,
        AvarageViews: result._avg,
        MaximumViews: result._max,
        MinimumViewxs: result._min,
        TotalViews: result._sum,
      },
    };
  });
};
export const PostService = {
  createPost,
  updatePost,
  getAllPost,
  getSinglePostById,
  dltPost,
  getBlogStat,
};
