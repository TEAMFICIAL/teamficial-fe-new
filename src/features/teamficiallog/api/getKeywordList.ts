import api from "@/shared/api/axios";
import type { KeywordListResponse } from "@/entities/team/model";
import { CommonResponse } from "@/shared/types/common";

interface Params {
  userId: number;
  page?: number;
  size?: number;
}

export async function getKeywordList({
  userId,
  page = 0,
  size = 5,
}: Params): Promise<KeywordListResponse> {
  const { data } = await api.get<CommonResponse<KeywordListResponse>>(
    `/teamficial-log/${userId}`,
    {
      params: { page, size },
    },
  );

  if (!data.isSuccess) throw new Error(data.message);

  return data.result;
}
