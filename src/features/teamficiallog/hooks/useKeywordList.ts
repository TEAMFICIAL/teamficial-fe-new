import { useQuery } from "@tanstack/react-query";
import { getKeywordList } from "@/features/teamficiallog/api/getKeywordList";
import type { KeywordListResponse } from "@/entities/team/model";

interface Params {
  userId: number;
  page: number;
  size?: number;
}

export function useKeywordList({ userId, page, size = 5 }: Params) {
  return useQuery<KeywordListResponse>({
    queryKey: ["keywordList", userId, page, size],
    queryFn: () => getKeywordList({ userId, page, size }),
    enabled: !!userId,
  });
}
