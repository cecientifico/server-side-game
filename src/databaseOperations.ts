type User = {
  userName: string;
  userEmail: string;
  userID: string;
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchUser = (userID: string) => {
  return prisma.users.findUnique({
    where: {
      userProviderID: userID,
    },
  });
};

export const createUser = ({ userName, userEmail, userID }: User) => {
  return prisma.users.create({
    data: {
      name: userName,
      email: userEmail,
      userProviderID: userID,
    },
  });
};

export const newResult = async (
  { userName, userEmail, userID }: User,
  newResult: string
) => {
  type Results = {
    id: string;
    results: string;
  };
  type LastResult = {
    name: string;
    email: string;
    id: string;
    userProviderID: string;
    results: Results;
  };
  const lastResult = await prisma.users.findUnique({
    where: {
      userProviderID: userID,
    },
    include: {
      results: {
        take: 1,
        orderBy: {
          results: "desc",
        },
      },
    },
  });
  if (lastResult?.results.length !== 0) {
    if (Number(lastResult?.results[0].results) < Number(newResult)) {
      return prisma.users.update({
        where: {
          userProviderID: userID,
        },
        data: {
          results: {
            create: {
              results: newResult,
            },
          },
        },
      });
    }
    return;
  }
  return prisma.users.update({
    where: {
      userProviderID: userID,
    },
    data: {
      results: {
        create: {
          results: newResult,
        },
      },
    },
  });
};

export const getUserResults = (userID: string) => {
  return prisma.users.findUnique({
    where: {
      userProviderID: userID,
    },
    include: {
      results: {
        take: 1,
        orderBy: {
          results: "desc",
        },
      },
    },
  });
};

export const getAllResults = () => {
  return prisma.users.findMany({
    include: {
      results: {
        take: 1,
        orderBy: {
          results: "desc",
        },
      },
    },
    orderBy: {
      results: {
        _count: "desc",
      },
    },
  });
};
