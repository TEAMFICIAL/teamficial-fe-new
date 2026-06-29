import { useQuery } from "@tanstack/react-query";
import { getRequesterInfo } from "@/features/teamficiallog/api/getRequesterInfo";
import type { RequesterInfo } from "@/entities/team/model";

export function useRequesterInfo(uuid: string) {
  return useQuery<RequesterInfo>({
    queryKey: ["requesterInfo", uuid],
    queryFn: () => getRequesterInfo(uuid),
    enabled: !!uuid,
  });
}
