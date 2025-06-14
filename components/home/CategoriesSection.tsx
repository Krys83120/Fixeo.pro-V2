import {Card, CardContent} from '@/components/ui/card'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

const categories = [
 {
  name: 'Téléphones',
  emoji: '📱',
  image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
  description: 'Réparation écran, batterie, caméra pour iPhone, Samsung, Huawei',
  subcategories: ['Écran cassé', 'Batterie défaillante', 'Problème audio', 'Caméra défectueuse', 'Chargement impossible'],
  demandes: 247,
  reparateurs: 856
 },
 {
  name: 'Ordinateurs',
  emoji: '💻',
  image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
  description: 'Réparation PC, Mac, récupération données, virus, composants',
  subcategories: ['Écran défaillant', 'Récupération données', 'Virus & malwares', 'Upgrade composants', 'Surchauffe'],
  demandes: 189,
  reparateurs: 654
 },
 {
  name: 'Automobiles',
  emoji: '🚗',
  image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
  description: 'Réparation auto, moto, diagnostic, mécanique, carrosserie',
  subcategories: ['Diagnostic panne', 'Freins & sécurité', 'Embrayage', 'Carrosserie', 'Révision complète'],
  demandes: 312,
  reparateurs: 1203
 },
 {
  name: 'Électroménager',
  emoji: '🏠',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  description: 'Machine à laver, lave-vaisselle, frigo, four, dépannage',
  subcategories: ['Lave-linge', 'Lave-vaisselle', 'Réfrigérateur', 'Four & plaque', 'Climatisation'],
  demandes: 198,
  reparateurs: 789
 },
 {
  name: 'Textiles',
  emoji: '👕',
  image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=300&fit=crop',
  description: 'Couture, retouche, réparation vêtements, maroquinerie',
  subcategories: ['Retouche vêtements', 'Réparation fermeture', 'Ourlet & ajustement', 'Maroquinerie', 'Broderie'],
  demandes: 156,
  reparateurs: 423
 },
 {
  name: 'Horlogerie',
  emoji: '⌚',
  image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
  description: 'Réparation montres, horloges, bijoux, mécanisme',
  subcategories: ['Montres mécaniques', 'Montres connectées', 'Horloges murales', 'Bijoux précieux', 'Changement pile'],
  demandes: 87,
  reparateurs: 234
 },
 {
  name: 'Audio/Vidéo',
  emoji: '🎧',
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  description: 'Réparation casques, enceintes, TV, chaîne hi-fi',
  subcategories: ['Télévisions', 'Chaînes Hi-Fi', 'Casques audio', 'Enceintes', 'Home cinéma'],
  demandes: 134,
  reparateurs: 567
 },
 {
  name: 'Imprimantes',
  emoji: '🖨️',
  image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
  description: 'Dépannage imprimantes, scanners, photocopieurs',
  subcategories: ["Jet d'encre", 'Laser couleur', 'Scanners', 'Photocopieurs', 'Traceurs'],
  demandes: 98,
  reparateurs: 345
 },
 {
  name: 'Appareils photo',
  emoji: '📷',
  image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
  description: 'Réparation reflex, compact, objectifs, flash',
  subcategories: ['Reflex numériques', 'Appareils compacts', 'Objectifs photo', 'Flash externe', 'Caméscopes'],
  demandes: 76,
  reparateurs: 289
 }
]

export function CategoriesSection() {
 const navigate = useNavigate()

 const handleCategoryClick = (categoryName: string) => {
  navigate(`/search?category=${encodeURIComponent(categoryName)}`)
 }

 return (
  <section className="py-20 bg-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div className="text-center mb-16" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6}} viewport={{once: true}}>
     <h2 className="text-4xl font-bold text-gray-900 mb-6">Tous vos objets peuvent être réparés</h2>
     <p className="text-xl text-gray-600 max-w-3xl mx-auto">Découvrez nos catégories de réparation les plus populaires et trouvez rapidement le professionnel qu'il vous faut</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {categories.map((category, index) => (
      <motion.div key={index} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: index * 0.1}} viewport={{once: true}}>
       <Card className="cursor-pointer group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white" onClick={() => handleCategoryClick(category.name)}>
        <div className="relative">
         {/* Image de fond avec compteurs */}
         <div className="relative h-48 overflow-hidden">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Emoji uniquement */}
          <div className="absolute top-4 left-4">
           <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">{category.emoji}</span>
           </div>
          </div>

          {/* Compteurs sur l'image - PLUS PETITS */}
          <div className="absolute bottom-3 left-3 right-3">
           <div className="flex justify-between items-end">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
             <div className="text-xs text-gray-600 font-medium">Demandes</div>
             <div className="text-sm font-bold text-blue-600">{category.demandes}</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
             <div className="text-xs text-gray-600 font-medium">Réparateurs</div>
             <div className="text-sm font-bold text-green-600">{category.reparateurs}</div>
            </div>
           </div>
          </div>
         </div>

         <CardContent className="p-6">
          <div className="space-y-4">
           <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{category.name}</h3>

           <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>

           {/* Sous-catégories */}
           <div className="pt-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Services proposés :</h4>
            <div className="flex flex-wrap gap-1">
             {category.subcategories.map((subcategory, subIndex) => (
              <span key={subIndex} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
               {subcategory}
              </span>
             ))}
            </div>
           </div>

           <div className="pt-4 border-t border-gray-100">
            <div className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">Voir les réparateurs →</div>
           </div>
          </div>
         </CardContent>
        </div>
       </Card>
      </motion.div>
     ))}
    </div>

    {/* Statistiques globales */}
    <motion.div className="mt-16 text-center" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.5}} viewport={{once: true}}>
     <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-full px-8 py-4">
      <div className="text-center">
       <div className="text-2xl font-bold text-blue-600">1,571</div>
       <div className="text-sm text-gray-600">Demandes actives</div>
      </div>
      <div className="w-px h-8 bg-gray-300" />
      <div className="text-center">
       <div className="text-2xl font-bold text-green-600">8,057</div>
       <div className="text-sm text-gray-600">Réparateurs qualifiés</div>
      </div>
      <div className="w-px h-8 bg-gray-300" />
      <div className="text-center">
       <div className="text-2xl font-bold text-purple-600">15,000+</div>
       <div className="text-sm text-gray-600">Réparations réussies</div>
      </div>
     </div>
    </motion.div>
   </div>
  </section>
 )
}