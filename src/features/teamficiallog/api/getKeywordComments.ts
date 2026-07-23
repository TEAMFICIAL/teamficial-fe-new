import api from "@/shared/api/axios";
import type { CommonResponse } from "@/shared/types/common";
import type {
  KeywordCommentRequest,
  KeywordCommentResponse,
} from "@/entities/team/model/teamficiallog";

export async function getKeywordComments({
  keywordId,
  page = 0,
  size = 4,
}: KeywordCommentRequest): Promise<KeywordCommentResponse> {
  const { data } = await api.get<CommonResponse<KeywordCommentResponse>>(
    `teamficial-log/users/${keywordId}`,
    { params: { page, size } },
  );

  if (!data.isSuccess) throw new Error(data.message);

  return data.result;
}
