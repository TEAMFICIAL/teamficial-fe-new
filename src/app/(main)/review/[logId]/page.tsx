import { ReviewPage } from "@/views/review/ReviewPage";

type Props = {
  params: Promise<{ logId: string }>;
};

export default async function Page({ params }: Props) {
  const { logId } = await params;
  return <ReviewPage logId={logId} />;
}
