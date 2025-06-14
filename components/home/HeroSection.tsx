import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Search, MapPin, Zap, Star} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {Logo} from '@/components/ui/logo'

export function HeroSection() {
 const [searchQuery, setSearchQuery] = useState('')
 const [location, setLocation] = useState('')
 const navigate = useNavigate()

 const handleSearch = () => {
  navigate(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`)
 }

 return (
  <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
   {/* Animated background elements */}
   <div className="absolute inset-0">
    <motion.div
     className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
     animate={{ 
      x: [0, 100, 0],
      y: [0, -50, 0],
      scale: [1, 1.2, 1]
     }}
     transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
     className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
     animate={{ 
      x: [0, -100, 0],
      y: [0, 50, 0],
      scale: [1.2, 1, 1.2]
     }}
     transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
   </div>

   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
     {/* Logo animé en hero */}
     <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
     >
      <Logo size="xl" animated={true} />
     </motion.div>

     <motion.h1 
      className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
     >
      Réparez plutôt que de
      <span className="text-blue-600"> racheter</span>
     </motion.h1>
     
     <motion.p 
      className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
     >
      Trouvez les meilleurs réparateurs professionnels près de chez vous. 
      Économique, écologique et garanti.
     </motion.p>

     {/* Search Bar avec animation */}
     <motion.div 
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 backdrop-blur-sm bg-white/95"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
     >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input 
         placeholder="Que voulez-vous réparer ?" 
         value={searchQuery} 
         onChange={e => setSearchQuery(e.target.value)} 
         className="pl-10 h-12 border-0 focus:ring-2 focus:ring-blue-500" 
        />
       </div>
       <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input 
         placeholder="Ville ou code postal" 
         value={location} 
         onChange={e => setLocation(e.target.value)} 
         className="pl-10 h-12 border-0 focus:ring-2 focus:ring-blue-500" 
        />
       </div>
       <Button 
        onClick={handleSearch} 
        className="h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
        size="lg"
       >
        <Zap className="h-5 w-5 mr-2" />
        Trouver un pro
       </Button>
      </div>
     </motion.div>

     {/* Quick Actions avec animations */}
     <motion.div 
      className="mt-8 flex flex-wrap justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
     >
      <Button 
       variant="outline" 
       onClick={() => navigate('/create-request')}
       className="font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
      >
       Poster une demande gratuitement
      </Button>
      <Button 
       variant="ghost" 
       onClick={() => navigate('/join-as-professional')}
       className="font-medium hover:bg-blue-50 transition-all duration-200"
      >
       <Star className="h-4 w-4 mr-2" />
       Devenir réparateur partenaire
      </Button>
     </motion.div>

     {/* Trust indicators */}
     <motion.div 
      className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8 }}
     >
      <div className="flex items-center">
       <Star className="h-4 w-4 text-yellow-400 mr-1" />
       <span>15,000+ réparateurs vérifiés</span>
      </div>
      <div className="flex items-center">
       <Zap className="h-4 w-4 text-green-500 mr-1" />
       <span>Réponse sous 2h</span>
      </div>
      <div className="flex items-center">
       <span>🛡️ Garantie sécurisée</span>
      </div>
     </motion.div>
    </div>
   </div>
  </section>
 )
}