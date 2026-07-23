import { useQuery } from "@tanstack/react-query";
import { getKeywordComments } from "@/features/teamficiallog/api/getKeywordComments";
import type { KeywordCommentResponse } from "@/entities/team/model/teamficiallog";

export function useKeywordComments(keywordId: number | null) {
  return useQuery<KeywordCommentResponse>({
    queryKey: ["keywordComments", keywordId],
    queryFn: () => getKeywordComments({ keywordId: keywordId! }),
    enabled: !!keywordId,
  });
}
