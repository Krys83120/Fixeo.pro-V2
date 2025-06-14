import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Star, MapPin, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

const featuredRepairers = [
 {
  id: 1,
  businessName: 'TechRepar Pro',
  image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=150&h=150&fit=crop&crop=face',
  city: 'Paris 11ème',
  rating: 4.9,
  reviewCount: 156,
  specialties: ['iPhone', 'Samsung', 'Réparation écran'],
  responseTime: '< 2h',
  verified: true
 },
 {
  id: 2,
  businessName: 'AutoFix Express',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  city: 'Lyon 6ème',
  rating: 4.8,
  reviewCount: 203,
  specialties: ['Diagnostic auto', 'Freins', 'Révision'],
  responseTime: '< 1h',
  verified: true
 },
 {
  id: 3,
  businessName: 'ElectroMax Service',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  city: 'Marseille',
  rating: 4.7,
  reviewCount: 89,
  specialties: ['Lave-linge', 'Lave-vaisselle', 'Réfrigérateur'],
  responseTime: '< 3h',
  verified: true
 },
 {
  id: 4,
  businessName: 'CoutureChic Atelier',
  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=150&h=150&fit=crop&crop=face',
  city: 'Nice',
  rating: 4.9,
  reviewCount: 67,
  specialties: ['Retouche', 'Couture', 'Maroquinerie'],
  responseTime: '< 4h',
  verified: true
 },
 {
  id: 5,
  businessName: 'HorloTemps Précision',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  city: 'Bordeaux',
  rating: 5.0,
  reviewCount: 34,
  specialties: ['Montres mécaniques', 'Horlogerie', 'Bijoux'],
  responseTime: '< 6h',
  verified: true
 },
 {
  id: 6,
  businessName: 'PC Doctor Solutions',
  image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
  city: 'Toulouse',
  rating: 4.8,
  reviewCount: 112,
  specialties: ['Récupération données', 'Virus', 'Hardware'],
  responseTime: '< 2h',
  verified: true
 },
 {
  id: 7,
  businessName: 'Audio Pro Service',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  city: 'Nantes',
  rating: 4.6,
  reviewCount: 78,
  specialties: ['Hi-Fi', 'Enceintes', 'Amplificateurs'],
  responseTime: '< 5h',
  verified: false
 },
 {
  id: 8,
  businessName: 'PrintFix Atelier',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  city: 'Strasbourg',
  rating: 4.7,
  reviewCount: 45,
  specialties: ['Imprimantes', 'Scanners', 'Photocopieurs'],
  responseTime: '< 4h',
  verified: true
 }
]

export function FeaturedRepairers() {
 const navigate = useNavigate()

 const handleRepairerClick = (id: number) => {
  navigate(`/professional/${id}`)
 }

 const handleViewAll = () => {
  navigate('/search')
 }

 return (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
     className="text-center mb-16"
     initial={{opacity: 0, y: 20}}
     whileInView={{opacity: 1, y: 0}}
     transition={{duration: 0.6}}
     viewport={{once: true}}
    >
     <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos réparateurs en vedette</h2>
     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      Découvrez quelques-uns de nos professionnels les mieux notés, prêts à intervenir dans votre région
     </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
     {featuredRepairers.map((repairer, index) => (
      <motion.div
       key={repairer.id}
       initial={{opacity: 0, y: 30}}
       whileInView={{opacity: 1, y: 0}}
       transition={{duration: 0.6, delay: index * 0.1}}
       viewport={{once: true}}
      >
       <Card 
        className="cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
        onClick={() => handleRepairerClick(repairer.id)}
       >
        <CardContent className="p-6 text-center">
         {/* Photo de profil */}
         <div className="relative mb-4">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
           <img 
            src={repairer.image}
            alt={repairer.businessName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
           />
          </div>
          {repairer.verified && (
           <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-white text-xs">✓</span>
           </div>
          )}
         </div>

         {/* Nom de l'entreprise */}
         <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {repairer.businessName}
         </h3>

         {/* Localisation */}
         <div className="flex items-center justify-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{repairer.city}</span>
         </div>

         {/* Note */}
         <div className="flex items-center justify-center mb-4">
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
           <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
           <span className="font-semibold text-gray-900">{repairer.rating}</span>
           <span className="text-gray-500 text-sm ml-1">({repairer.reviewCount})</span>
          </div>
         </div>

         {/* Spécialités (tags) */}
         <div className="flex flex-wrap gap-1 mb-4 justify-center">
          {repairer.specialties.slice(0, 2).map((specialty, idx) => (
           <Badge 
            key={idx}
            variant="outline" 
            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
           >
            {specialty}
           </Badge>
          ))}
          {repairer.specialties.length > 2 && (
           <Badge 
            variant="outline" 
            className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200"
           >
            +{repairer.specialties.length - 2}
           </Badge>
          )}
         </div>

         {/* Temps de réponse */}
         <div className="text-sm text-gray-500">
          <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full">
           🚀 Répond {repairer.responseTime}
          </span>
         </div>
        </CardContent>
       </Card>
      </motion.div>
     ))}
    </div>

    {/* Bouton pour voir tous les réparateurs */}
    <motion.div 
     className="text-center"
     initial={{opacity: 0, y: 20}}
     whileInView={{opacity: 1, y: 0}}
     transition={{duration: 0.6, delay: 0.4}}
     viewport={{once: true}}
    >
     <Button 
      onClick={handleViewAll}
      size="lg"
      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
     >
      Voir tous nos réparateurs
      <ArrowRight className="h-5 w-5 ml-2" />
     </Button>
     
     <p className="text-gray-500 text-sm mt-4">
      Plus de <span className="font-semibold text-blue-600">8,000 professionnels</span> vérifiés vous attendent
     </p>
    </motion.div>
   </div>
  </section>
 )
}