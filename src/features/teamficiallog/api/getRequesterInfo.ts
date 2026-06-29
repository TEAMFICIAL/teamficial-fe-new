import api from "@/shared/api/axios";
import type { RequesterInfo } from "@/entities/team/model";
import { CommonResponse } from "@/shared/types/common";

export async function getRequesterInfo(uuid: string): Promise<RequesterInfo> {
  const { data } = await api.get<CommonResponse<RequesterInfo>>(
    "/teamficial-log/requester",
    {
      params: { requesterUuid: uuid },
    },
  );

  if (!data.isSuccess) throw new Error(data.message);

  return data.result;
}
