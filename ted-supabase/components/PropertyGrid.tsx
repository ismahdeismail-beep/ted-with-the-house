import type { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

export default function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
