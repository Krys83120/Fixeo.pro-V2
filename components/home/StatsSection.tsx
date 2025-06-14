import {Card, CardContent} from '@/components/ui/card'
import {ShieldCheck, Heart, Star, Zap} from 'lucide-react'
import {motion} from 'framer-motion'

const stats = [
 {
  icon: ShieldCheck,
  number: '15,000+',
  label: 'Réparateurs certifiés',
  description: 'Professionnels qualifiés et contrôlés'
 },
 {
  icon: Heart,
  number: '500,000+',
  label: 'Objets sauvés',
  description: 'Évités de la poubelle depuis 2020'
 },
 {
  icon: Star,
  number: '4.9/5',
  label: 'Satisfaction client',
  description: 'Note moyenne sur 50,000+ avis'
 },
 {
  icon: Zap,
  number: '< 2h',
  label: 'Temps de réponse',
  description: 'Réponse moyenne des pros'
 }
]

export function StatsSection() {
 return (
  <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
   {/* Background pattern */}
   <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }} />
   </div>

   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
     className="text-center mb-12"
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
    >
     <h2 className="text-3xl font-bold text-white mb-4">
      Fixeo.Pro en chiffres
     </h2>
     <p className="text-lg text-blue-100">
      La confiance de milliers de clients et professionnels
     </p>
    </motion.div>

    <div className="grid md:grid-cols-4 gap-8">
     {stats.map((stat, index) => {
      const IconComponent = stat.icon
      return (
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
       >
        <Card className="bg-white/10 border-white/20 text-center hover:bg-white/15 transition-all duration-300 backdrop-blur-sm">
         <CardContent className="p-8">
          <motion.div
           whileHover={{ scale: 1.1, rotate: 5 }}
           transition={{ duration: 0.2 }}
          >
           <IconComponent className="h-12 w-12 text-blue-200 mx-auto mb-4" />
          </motion.div>
          <motion.div 
           className="text-4xl font-bold text-white mb-2"
           initial={{ scale: 0.5 }}
           whileInView={{ scale: 1 }}
           transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
           viewport={{ once: true }}
          >
           {stat.number}
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
          <p className="text-blue-100">{stat.description}</p>
         </CardContent>
        </Card>
       </motion.div>
      )
     })}
    </div>
   </div>
  </section>
 )
}