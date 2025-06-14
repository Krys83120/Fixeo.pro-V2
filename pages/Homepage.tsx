import {HeroSection} from '@/components/home/HeroSection'
import {CategoriesSection} from '@/components/home/CategoriesSection'
import {HowItWorksSection} from '@/components/home/HowItWorksSection'
import {StatsSection} from '@/components/home/StatsSection'
import {TestimonialsSection} from '@/components/home/TestimonialsSection'
import {FeaturedRepairers} from '@/components/home/FeaturedRepairers'
import {Footer} from '@/components/layout/Footer'

export function Homepage() {
 return (
  <div className="min-h-screen">
   <HeroSection />
   <CategoriesSection />
   <HowItWorksSection />
   <StatsSection />
   <TestimonialsSection />
   <FeaturedRepairers />
   <Footer />
  </div>
 )
}