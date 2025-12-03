import CollaborationSection from "@/components/home/CollaborationSection";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import TaskDemoSection from "@/components/home/TaskDemoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TaskDemoSection />
      <CollaborationSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
