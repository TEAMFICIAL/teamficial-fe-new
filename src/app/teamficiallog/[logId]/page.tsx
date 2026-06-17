import { TeamficialLogPage } from "@/views/teamficiallog/TeamficialLogPage";

type Props = {
  params: Promise<{ logId: string }>;
};

export default async function Page({ params }: Props) {
  const { logId } = await params;
  return <TeamficialLogPage logId={logId} />;
}
