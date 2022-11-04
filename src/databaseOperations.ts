type User = {
  userName: string;
  userEmail: string;
  userID: string;
};

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const searchUser = async (userID: string) => {
  try {
    return await prisma.users.findUnique({
      where: {
        userProviderID: userID,
      },
    });
  } catch (error) {
    return null
  }

};

export const createUser = async ({userName, userEmail, userID}: User) => {
  return await prisma.users.create({
    data: {
      name: userName,
      email: userEmail,
      userProviderID: userID,
    },
  });
};

export const newResult = async (
    {userName, userEmail, userID}: User, modality: string,
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
    const lastResult: any = await prisma.users.findUnique({
      where: {
        userProviderID: userID,
      },
      include: {
        [modality]: {
          take: 1,
          orderBy: {
            results: 'desc',
          }
        }
      },
    });
    if (lastResult[modality].length === 0) {
      return await prisma.users.update({
        where: {
          userProviderID: userID,
        },
        data: {
          [modality]: {
            create: {
              results: newResult,
            }
          }
        },
      });
    }
    if (modality === "casually") {
      if (Number(lastResult[modality][0].results) > Number(newResult)) {
        return await prisma.users.update({
          where: {
            userProviderID: userID,
          },
          data: {
            casually: {
              update: {
                where: {
                  id: lastResult[modality][0].id
                },
                data: {
                  results: newResult,
                }
              }
            }
          }
        });
      }
      return
    }
    if (Number(lastResult[modality][0].results) < Number(newResult)) {
      return await prisma.users.update({
        where: {
          userProviderID: userID,
        },
        data: {
          [modality]: {
            update: {
              where: {
                id: lastResult[modality][0].id
              },
              data: {
                results: newResult,
              }
            }
          }
        }
      });
      return
    }
  }
;

export const getUserResults = async (userID: string, modality: string) => {
  return await prisma.users.findUnique({
    where: {
      userProviderID: userID,
    },
    include: {
      [modality]: {
        take: 1,
        orderBy: {
          results: "desc",
        },
      },
    },
  });
};

export const getAllResults = async (modality: string) => {
    return await prisma.users.findMany({
      include: {
        [modality]: {
          orderBy: {
            results: "desc"
          }
        }
      },
      orderBy: {
        [modality]: {
          _count: 'desc'
        }
      }
    });
  }
;
