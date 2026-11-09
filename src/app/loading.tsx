import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 px-6 bg-[#0a0805]">
      <LoadingSpinner
        size="lg"
        label="Initializing Architecture Matrix"
        sublabel="Aethrix Obsidian Amber Core // 60 FPS"
      />
    </div>
  );
}
