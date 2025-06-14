import {useState, useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Badge} from '@/components/ui/badge'
import {Search, MapPin, Clock, Euro, AlertCircle, CheckCircle, Filter, Loader2, Navigation} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {useUser} from '@/contexts/UserContext'

const categories = ['Téléphones', 'Ordinateurs', 'Automobiles', 'Électroménager', 'Textiles', 'Horlogerie', 'Audio/Vidéo', 'Imprimantes', 'Appareils photo']

// Photos par défaut pour chaque catégorie
const categoryImages = {
 'Téléphones': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
 'Ordinateurs': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
 'Automobiles': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop',
 'Électroménager': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
 'Textiles': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=200&fit=crop',
 'Horlogerie': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop',
 'Audio/Vidéo': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
 'Imprimantes': 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=200&fit=crop',
 'Appareils photo': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop'
}

// Mise à jour des demandes mock avec les nouvelles demandes
const mockRequests = [
 {
  id: 1,
  title: 'Réparation écran iPhone 13 Pro cassé',
  category: 'Téléphones',
  description: 'Écran totalement cassé suite à une chute. Le téléphone fonctionne encore mais impossible de voir quoi que ce soit.',
  location: 'Paris 11ème',
  latitude: 48.8631,
  longitude: 2.3708,
  budget: '50-100€',
  urgency: 'high',
  postedDate: '2024-01-15',
  postedTime: 'Il y a 2h',
  responseCount: 8,
  status: 'active',
  images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop'],
  authorName: 'Marie L.',
  authorPhone: '06 12 34 56 78',
  authorEmail: 'marie.l@email.com'
 },
 {
  id: 2,
  title: 'Machine à laver qui fuit',
  category: 'Électroménager',
  description: 'Ma machine à laver Bosch de 5 ans fuit par le bas. Elle fait un bruit bizarre pendant le cycle.',
  location: 'Lyon 6ème',
  latitude: 45.764,
  longitude: 4.8357,
  budget: '100-200€',
  urgency: 'medium',
  postedDate: '2024-01-15',
  postedTime: 'Il y a 4h',
  responseCount: 12,
  status: 'active',
  images: [], // Pas d'image -> utilisera celle de la catégorie
  authorName: 'Jean M.',
  authorPhone: '06 23 45 67 89',
  authorEmail: 'jean.m@email.com'
 },
 {
  id: 3,
  title: 'Diagnostic panne voiture Peugeot 208',
  category: 'Automobiles',
  description: 'Voiture qui ne démarre plus depuis ce matin. Batterie OK, voyant moteur allumé.',
  location: 'Marseille',
  latitude: 43.2965,
  longitude: 5.3698,
  budget: '200-500€',
  urgency: 'high',
  postedDate: '2024-01-15',
  postedTime: 'Il y a 1h',
  responseCount: 15,
  status: 'active',
  images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop'],
  authorName: 'Sophie R.',
  authorPhone: '06 34 56 78 90',
  authorEmail: 'sophie.r@email.com'
 },
 {
  id: 4,
  title: "Ordinateur portable ne s'allume plus",
  category: 'Ordinateurs',
  description: "MacBook Pro 2019 qui ne s'allume plus du tout. Plus de garantie. Données importantes à récupérer.",
  location: 'Nice',
  latitude: 43.7102,
  longitude: 7.262,
  budget: '100-200€',
  urgency: 'medium',
  postedDate: '2024-01-14',
  postedTime: 'Il y a 1 jour',
  responseCount: 6,
  status: 'active',
  images: [], // Pas d'image -> utilisera celle de la catégorie
  authorName: 'Thomas B.',
  authorPhone: '06 45 67 89 01',
  authorEmail: 'thomas.b@email.com'
 },
 {
  id: 5,
  title: 'Retouche robe de mariée',
  category: 'Textiles',
  description: 'Robe de mariée à retoucher (ourlet et ajustement taille). Mariage dans 3 semaines.',
  location: 'Bordeaux',
  latitude: 44.8378,
  longitude: -0.5792,
  budget: '50-100€',
  urgency: 'high',
  postedDate: '2024-01-14',
  postedTime: 'Il y a 1 jour',
  responseCount: 4,
  status: 'active',
  images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=200&fit=crop'],
  authorName: 'Julie P.',
  authorPhone: '06 56 78 90 12',
  authorEmail: 'julie.p@email.com'
 },
 {
  id: 6,
  title: 'Réparation montre automatique',
  category: 'Horlogerie',
  description: "Montre automatique Seiko qui s'arrête. Besoin d'un réviseur spécialisé.",
  location: 'Toulouse',
  latitude: 43.6047,
  longitude: 1.4442,
  budget: '100-200€',
  urgency: 'low',
  postedDate: '2024-01-13',
  postedTime: 'Il y a 2 jours',
  responseCount: 3,
  status: 'active',
  images: [], // Pas d'image -> utilisera celle de la catégorie
  authorName: 'Pierre K.',
  authorPhone: '06 67 89 01 23',
  authorEmail: 'pierre.k@email.com'
 }
]

const urgencyLabels = {
 high: {label: 'Urgent', color: 'bg-red-100 text-red-800', icon: AlertCircle},
 medium: {label: 'Modéré', color: 'bg-yellow-100 text-yellow-800', icon: Clock},
 low: {label: 'Pas urgent', color: 'bg-green-100 text-green-800', icon: CheckCircle}
}

export function RequestsList() {
 const navigate = useNavigate()
 const {currentUser} = useUser()
 const [searchQuery, setSearchQuery] = useState('')
 const [selectedCategory, setSelectedCategory] = useState('all')
 const [selectedUrgency, setSelectedUrgency] = useState('all')
 const [maxDistance, setMaxDistance] = useState(25)
 const [sortBy, setSortBy] = useState('recent')
 const [userPosition, setUserPosition] = useState<{lat: number; lng: number} | null>(null)
 const [isLocating, setIsLocating] = useState(false)
 const [location, setLocation] = useState('')

 // Fonction de calcul de distance
 const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
 }, [])

 // Géolocalisation
 const getUserLocation = useCallback(() => {
  if (!navigator.geolocation) {
   alert("La géolocalisation n'est pas supportée")
   return
  }

  setIsLocating(true)

  navigator.geolocation.getCurrentPosition(
   async position => {
    const {latitude, longitude} = position.coords
    setUserPosition({lat: latitude, lng: longitude})

    try {
     const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
     if (response.ok) {
      const data = await response.json()
      if (data.features?.[0]) {
       const feature = data.features[0]
       const city = feature.properties.city || feature.properties.municipality || ''
       const postcode = feature.properties.postcode || ''
       setLocation(`${city}${postcode ? ` (${postcode})` : ''}`)
      }
     }
    } catch (error) {
     setLocation('Position détectée')
    }

    setIsLocating(false)
   },
   error => {
    console.error('Erreur géolocalisation:', error)
    setIsLocating(false)
   }
  )
 }, [])

 // Ajouter la distance aux demandes si géolocalisé
 const requestsWithDistance = mockRequests.map(request => {
  if (userPosition) {
   const distance = calculateDistance(userPosition.lat, userPosition.lng, request.latitude, request.longitude)
   return {...request, distance: Math.round(distance * 10) / 10}
  }
  return request
 })

 const filteredRequests = requestsWithDistance.filter(request => {
  if (searchQuery && !request.title.toLowerCase().includes(searchQuery.toLowerCase()) && !request.description.toLowerCase().includes(searchQuery.toLowerCase())) {
   return false
  }
  if (selectedCategory !== 'all' && request.category !== selectedCategory) {
   return false
  }
  if (selectedUrgency !== 'all' && request.urgency !== selectedUrgency) {
   return false
  }
  if (userPosition && request.distance && request.distance > maxDistance) {
   return false
  }
  return true
 })

 const sortedRequests = [...filteredRequests].sort((a, b) => {
  switch (sortBy) {
   case 'recent':
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
   case 'urgent': {
    const urgencyOrder = {high: 3, medium: 2, low: 1}
    return urgencyOrder[b.urgency as keyof typeof urgencyOrder] - urgencyOrder[a.urgency as keyof typeof urgencyOrder]
   }
   case 'responses':
    return b.responseCount - a.responseCount
   case 'distance':
    return ((a as any).distance || 999) - ((b as any).distance || 999)
   default:
    return 0
  }
 })

 // Vérifier les permissions d'accès
 const canAccessRequest = () => {
  if (!currentUser) return false

  // Les clients peuvent voir les demandes mais pas les infos personnelles
  if (currentUser.userType === 'client') return true

  // Les professionnels ont besoin d'un abonnement actif ou période d'essai
  if (currentUser.userType === 'professional') {
   // Simulation : tous les pros ont accès (période d'essai par défaut)
   return true
  }

  return false
 }

 const handleRequestClick = (requestId: number) => {
  if (!canAccessRequest()) {
   if (!currentUser) {
    alert('Vous devez être connecté pour consulter les demandes')
    navigate('/signup')
    return
   }
   if (currentUser.userType === 'professional') {
    alert('Votre abonnement professionnel est requis pour accéder aux demandes. Contactez-nous pour activer votre compte.')
    return
   }
  }

  navigate(`/request/${requestId}`)
 }

 // Fonction pour obtenir l'image de la demande
 const getRequestImage = (request: any) => {
  // Si le demandeur a partagé une photo, l'utiliser
  if (request.images && request.images.length > 0) {
   return request.images[0]
  }
  
  // Sinon utiliser la photo par défaut de la catégorie
  return categoryImages[request.category as keyof typeof categoryImages] || categoryImages['Téléphones']
 }

 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <motion.div className="mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
     <h1 className="text-4xl font-bold text-gray-900 mb-2">Liste des demandes</h1>
     <p className="text-xl text-gray-600">Découvrez toutes les demandes de réparation en cours près de chez vous</p>
    </motion.div>

    {/* Filters */}
    <motion.div className="bg-white rounded-lg shadow-sm p-6 mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.1}}>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* Search */}
      <div className="relative lg:col-span-2">
       <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
       <Input placeholder="Rechercher une demande..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
      </div>

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
       <SelectTrigger>
        <SelectValue placeholder="Catégorie" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="all">Toutes catégories</SelectItem>
        {categories.map(category => (
         <SelectItem key={category} value={category}>
          {category}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>

      {/* Urgency Filter */}
      <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
       <SelectTrigger>
        <SelectValue placeholder="Urgence" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="all">Toutes urgences</SelectItem>
        <SelectItem value="high">Urgent</SelectItem>
        <SelectItem value="medium">Modéré</SelectItem>
        <SelectItem value="low">Pas urgent</SelectItem>
       </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sortBy} onValueChange={setSortBy}>
       <SelectTrigger>
        <SelectValue placeholder="Trier par" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="recent">Plus récent</SelectItem>
        <SelectItem value="urgent">Plus urgent</SelectItem>
        <SelectItem value="responses">Plus de réponses</SelectItem>
        <SelectItem value="distance">Distance</SelectItem>
       </SelectContent>
      </Select>
     </div>

     {/* Section de géolocalisation */}
     <div className="border-t pt-6">
      {!userPosition ? (
       // Message d'incitation à la géolocalisation
       <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-3">📍 Trouvez les demandes les plus proches de vous !</h3>
        <p className="text-green-700 mb-4">Actuellement, toutes les demandes sont affichées. Pour voir les demandes triées par proximité et connaître leur distance exacte, géolocalisez-vous en cliquant sur le bouton vert ci-dessous.</p>
        <Button onClick={getUserLocation} disabled={isLocating} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3">
         {isLocating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Navigation className="h-4 w-4 mr-2" />}
         {isLocating ? 'Localisation...' : 'Me localiser pour voir les plus proches'}
        </Button>
       </div>
      ) : (
       // Interface de géolocalisation active
       <div>
        <div className="flex items-center justify-between mb-4">
         <h3 className="text-lg font-semibold text-gray-900">📍 Recherche par proximité activée</h3>
        </div>

        <motion.div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4" initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} transition={{duration: 0.3}}>
         <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
           <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
           <span className="text-sm font-medium text-blue-800">Position détectée : {location}</span>
          </div>
          <span className="text-xs text-blue-600">
           {sortedRequests.length} demande{sortedRequests.length > 1 ? 's' : ''} dans la zone
          </span>
         </div>
        </motion.div>

        {/* Curseur de distance */}
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Rayon de recherche :</label>
          <span className="text-lg font-bold text-blue-600">{maxDistance} km</span>
         </div>
         <input
          type="range"
          min="1"
          max="1000"
          value={maxDistance}
          onChange={e => setMaxDistance(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          style={{
           background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(maxDistance / 1000) * 100}%, #bfdbfe ${(maxDistance / 1000) * 100}%, #bfdbfe 100%)`
          }}
         />
         <div className="flex justify-between text-xs text-blue-600">
          <span>1 km</span>
          <span>500 km</span>
          <span>1000 km</span>
         </div>
        </div>
       </div>
      )}
     </div>

     {/* Active filters display */}
     {(searchQuery || selectedCategory !== 'all' || selectedUrgency !== 'all') && (
      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
       <Filter className="h-4 w-4 text-gray-500" />
       <span className="text-sm text-gray-500">Filtres actifs:</span>
       {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
         Recherche: "{searchQuery}"
         <button onClick={() => setSearchQuery('')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
          ×
         </button>
        </Badge>
       )}
       {selectedCategory !== 'all' && (
        <Badge variant="secondary" className="flex items-center gap-1">
         {selectedCategory}
         <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
          ×
         </button>
        </Badge>
       )}
       {selectedUrgency !== 'all' && (
        <Badge variant="secondary" className="flex items-center gap-1">
         {urgencyLabels[selectedUrgency as keyof typeof urgencyLabels].label}
         <button onClick={() => setSelectedUrgency('all')} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
          ×
         </button>
        </Badge>
       )}
      </div>
     )}
    </motion.div>

    {/* Results header */}
    <div className="flex justify-between items-center mb-6">
     <h2 className="text-2xl font-bold text-gray-900">
      {sortedRequests.length} demande{sortedRequests.length > 1 ? 's' : ''} trouvée{sortedRequests.length > 1 ? 's' : ''} {userPosition ? `dans un rayon de ${maxDistance} km` : 'sur la plateforme'}
     </h2>
     <Button onClick={() => navigate('/create-request')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
      Poster une demande
     </Button>
    </div>

    {/* Requests Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     {sortedRequests.map((request, index) => {
      const urgencyInfo = urgencyLabels[request.urgency as keyof typeof urgencyLabels]
      const UrgencyIcon = urgencyInfo.icon

      return (
       <motion.div key={request.id} initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: index * 0.1}}>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 h-full" onClick={() => handleRequestClick(request.id)}>
         <CardContent className="p-6">
          <div className="flex gap-4 h-full">
           {/* Image - Utilise la photo du demandeur ou celle de la catégorie */}
           <div className="flex-shrink-0">
            <img 
             src={getRequestImage(request)} 
             alt={request.title} 
             className="w-24 h-24 object-cover rounded-lg" 
            />
           </div>

           {/* Content */}
           <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
             <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{request.title}</h3>
              <Badge variant="outline" className="text-xs">
               {request.category}
              </Badge>
             </div>
             <div className="flex flex-col items-end gap-1">
              <Badge className={`ml-2 ${urgencyInfo.color}`}>
               <UrgencyIcon className="h-3 w-3 mr-1" />
               {urgencyInfo.label}
              </Badge>
              {userPosition && (request as any).distance && (
               <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                📍 {(request as any).distance} km
               </Badge>
              )}
             </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>

            {/* Details */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
             <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {request.location}
             </div>
             <div className="flex items-center">
              <Euro className="h-4 w-4 mr-1" />
              {request.budget}
             </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
             <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {request.postedTime}
             </div>
             <div className="flex items-center">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
               {request.responseCount} réponse{request.responseCount > 1 ? 's' : ''}
              </Badge>
             </div>
            </div>
           </div>
          </div>
         </CardContent>
        </Card>
       </motion.div>
      )
     })}
    </div>

    {/* Empty state */}
    {sortedRequests.length === 0 && (
     <motion.div className="text-center py-12" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.6}}>
      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune demande trouvée</h3>
      <p className="text-gray-600 mb-6">Essayez de modifier vos filtres ou votre recherche</p>
      <Button
       onClick={() => {
        setSearchQuery('')
        setSelectedCategory('all')
        setSelectedUrgency('all')
       }}
      >
       Effacer tous les filtres
      </Button>
     </motion.div>
    )}
   </div>
  </div>
 )
}