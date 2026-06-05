import { VERIFIED_LABELS, VERIFIED_COLORS } from '@/lib/constants';
import type { VerifiedStatus } from '@/lib/types';

interface TrustBadgeProps {
  status: VerifiedStatus;
}

export default function TrustBadge({ status }: TrustBadgeProps) {
  const label = VERIFIED_LABELS[status];
  const color = VERIFIED_COLORS[status];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${color}`}>
      {label}
    </span>
  );
}
