interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginateOptions {
  where?: unknown;
  orderBy?: unknown;
  include?: unknown;
  select?: unknown;
}

export async function paginate<T>(
  model: {
    findMany: (args: any) => Promise<T[]>;
    count: (args?: any) => Promise<number>;
  },
  { page, limit }: PaginationParams,
  options: PaginateOptions = {},
) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      ...options,
      skip,
      take: limit,
    }),

    model.count({
      where: options.where,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}