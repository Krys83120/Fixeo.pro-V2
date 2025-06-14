import type React from 'react'
import {useState, useCallback} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import {X, CheckCircle, Clock, Shield, Star, Loader2, Navigation, User, LogIn} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import {ImageUpload} from '@/components/ui/image-upload'
import {useUser} from '@/contexts/UserContext'

const categories = ['Téléphones', 'Ordinateurs', 'Automobiles', 'Électroménager', 'Textiles', 'Horlogerie', 'Audio/Vidéo', 'Imprimantes', 'Appareils photo']

const urgencyLevels = [
 {value: 'low', label: 'Pas urgent (dans la semaine)', color: 'bg-green-100 text-green-800'},
 {value: 'medium', label: 'Modéré (dans 2-3 jours)', color: 'bg-yellow-100 text-yellow-800'},
 {value: 'high', label: "Urgent (aujourd'hui)", color: 'bg-red-100 text-red-800'}
]

// Mock pour stocker les demandes (en production, utiliser un state manager global)
const mockRequestsGlobal = [
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
 }
]

// Modal de récapitulatif
interface RecapModalProps {
 isOpen: boolean
 onClose: () => void
 requestData: any
 onConfirm: () => void
}

function RecapModal({isOpen, onClose, requestData, onConfirm}: RecapModalProps) {
 if (!isOpen) return null

 const urgencyInfo = urgencyLevels.find(u => u.value === requestData.urgency)

 return (
  <AnimatePresence>
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.9}} transition={{duration: 0.3}} className="w-full max-w-2xl">
     <Card className="bg-white shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
       <div className="flex items-center justify-between">
        <CardTitle className="flex items-center text-xl">
         <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
         Récapitulatif de votre demande
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
         <X className="h-4 w-4" />
        </Button>
       </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
       {/* Titre et catégorie */}
       <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{requestData.title}</h3>
        <Badge variant="outline" className="mb-4">
         {requestData.category}
        </Badge>
       </div>

       {/* Description */}
       <div>
        <Label className="text-sm font-semibold text-gray-700">Description :</Label>
        <p className="text-gray-600 mt-1 bg-gray-50 p-3 rounded-lg">{requestData.description}</p>
       </div>

       {/* Informations pratiques */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
         <Label className="text-sm font-semibold text-gray-700">Localisation :</Label>
         <p className="text-gray-900 mt-1">{requestData.location}</p>
        </div>

        <div>
         <Label className="text-sm font-semibold text-gray-700">Budget :</Label>
         <p className="text-gray-900 mt-1">{requestData.budget}</p>
        </div>

        <div>
         <Label className="text-sm font-semibold text-gray-700">Urgence :</Label>
         {urgencyInfo && <Badge className={`${urgencyInfo.color} mt-1`}>{urgencyInfo.label}</Badge>}
        </div>

        <div>
         <Label className="text-sm font-semibold text-gray-700">Contact :</Label>
         <p className="text-gray-900 mt-1">{requestData.firstName} {requestData.lastName}</p>
         <p className="text-gray-600 text-sm">{requestData.phone}</p>
        </div>
       </div>

       {/* Photos */}
       {requestData.images && requestData.images.length > 0 && (
        <div>
         <Label className="text-sm font-semibold text-gray-700">Photos ajoutées :</Label>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {requestData.images.map((image: string, index: number) => (
           <img key={index} src={image} alt={`Photo ${index + 1}`} className="w-full h-20 object-cover rounded-lg border" />
          ))}
         </div>
        </div>
       )}

       {/* Actions */}
       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Prochaines étapes :</h4>
        <ul className="text-sm text-blue-800 space-y-1">
         <li>✅ Votre demande sera visible par tous les réparateurs</li>
         <li>📧 Vous recevrez les devis par email</li>
         <li>📱 Notifications SMS pour chaque nouvelle réponse</li>
         <li>⚡ Premiers devis attendus sous 2h</li>
        </ul>
       </div>

       <div className="flex gap-4">
        <Button onClick={onConfirm} className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
         <CheckCircle className="h-4 w-4 mr-2" />
         Publier ma demande
        </Button>
        <Button onClick={onClose} variant="outline" className="flex-1">
         Modifier
        </Button>
       </div>
      </CardContent>
     </Card>
    </motion.div>
   </div>
  </AnimatePresence>
 )
}

// Composant de contrôle d'accès
function AccessControl() {
 const navigate = useNavigate()

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
   <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.6}}>
     <Card className="text-center shadow-2xl border-0">
      <CardContent className="p-12">
       <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.2, duration: 0.5, type: 'spring'}}>
        <User className="h-20 w-20 text-blue-600 mx-auto mb-6" />
       </motion.div>
       <h2 className="text-3xl font-bold text-gray-900 mb-4">Connexion requise</h2>
       <p className="text-gray-600 mb-8 text-lg">
        Pour déposer une demande de réparation, vous devez être inscrit sur Fixeo.Pro. Créez votre compte gratuitement ou connectez-vous à votre compte existant.
       </p>
       
       <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-2 text-blue-900">Avantages de l'inscription :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
         <div>✅ Demandes de réparation illimitées</div>
         <div>✅ Suivi en temps réel des réponses</div>
         <div>✅ Contact direct avec les réparateurs</div>
         <div>✅ Historique de vos demandes</div>
         <div>✅ Avis et évaluations</div>
         <div>✅ Support client prioritaire</div>
        </div>
       </div>

       <div className="flex gap-4">
        <Button 
         onClick={() => navigate('/signup')} 
         className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
         <User className="h-4 w-4 mr-2" />
         Créer mon compte
        </Button>
        <Button 
         onClick={() => {
          // Simulation de connexion
          alert('Redirection vers la page de connexion...')
         }} 
         variant="outline" 
         className="flex-1"
        >
         <LogIn className="h-4 w-4 mr-2" />
         Se connecter
        </Button>
       </div>
      </CardContent>
     </Card>
    </motion.div>
   </div>
  </div>
 )
}

export function CreateRequest() {
 const navigate = useNavigate()
 const {currentUser} = useUser()
 const [formData, setFormData] = useState({
  title: '',
  category: '',
  description: '',
  location: '',
  urgency: '',
  budget: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
 })
 const [uploadedImages, setUploadedImages] = useState<string[]>([])
 const [isSubmitted, setIsSubmitted] = useState(false)
 const [showRecapModal, setShowRecapModal] = useState(false)

 // Géolocalisation
 const [userPosition, setUserPosition] = useState<{lat: number; lng: number} | null>(null)
 const [isLocating, setIsLocating] = useState(false)
 const [detectedLocation, setDetectedLocation] = useState('')

 // Vérifier si l'utilisateur est connecté
 if (!currentUser) {
  return <AccessControl />
 }

 // Fonction de géolocalisation
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
       const locationString = `${city}${postcode ? ` (${postcode})` : ''}`
       setDetectedLocation(locationString)
       setFormData(prev => ({...prev, location: locationString}))
      }
     }
    } catch (error) {
     setDetectedLocation('Position détectée')
     setFormData(prev => ({...prev, location: 'Position détectée'}))
    }

    setIsLocating(false)
   },
   error => {
    console.error('Erreur géolocalisation:', error)
    setIsLocating(false)
   }
  )
 }, [])

 const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({...prev, [field]: value}))
 }

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  // Validation basique
  if (!formData.title || !formData.category || !formData.description || !formData.location || !formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
   alert('Veuillez remplir tous les champs obligatoires')
   return
  }

  // Afficher le modal de récapitulatif
  setShowRecapModal(true)
 }

 const handleConfirmSubmit = () => {
  // Créer la nouvelle demande
  const newRequest = {
   id: mockRequestsGlobal.length + 1,
   title: formData.title,
   category: formData.category,
   description: formData.description,
   location: formData.location,
   latitude: userPosition?.lat || 48.8566 + Math.random() * 0.1 - 0.05,
   longitude: userPosition?.lng || 2.3522 + Math.random() * 0.1 - 0.05,
   budget: formData.budget,
   urgency: formData.urgency,
   postedDate: new Date().toISOString().split('T')[0],
   postedTime: 'Il y a quelques secondes',
   responseCount: 0,
   status: 'active',
   images: uploadedImages,
   authorName: `${formData.firstName} ${formData.lastName.charAt(0)}.`,
   authorPhone: formData.phone,
   authorEmail: formData.email
  }

  // Ajouter à la liste globale
  mockRequestsGlobal.push(newRequest)

  setShowRecapModal(false)
  setIsSubmitted(true)

  // Redirection après 3 secondes
  setTimeout(() => {
   navigate('/requests')
  }, 3000)
 }

 const addImage = (url: string) => {
  setUploadedImages(prev => [...prev, url])
 }

 const removeImage = (index: number) => {
  setUploadedImages(prev => prev.filter((_, i) => i !== index))
 }

 if (isSubmitted) {
  return (
   <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
     <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.6}}>
      <Card className="text-center shadow-2xl border-0">
       <CardContent className="p-12">
        <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.2, duration: 0.5, type: 'spring'}}>
         <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande publiée avec succès !</h2>
        <p className="text-gray-600 mb-8 text-lg">Votre demande a été transmise aux réparateurs professionnels de votre région. Vous devriez recevoir les premiers devis dans les prochaines heures.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-800">Réponse sous 2h</span>
         </div>
         <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
          <Shield className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-800">Pros vérifiés</span>
         </div>
         <div className="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
          <Star className="h-5 w-5 text-purple-600 mr-2" />
          <span className="text-sm font-medium text-purple-800">Devis gratuits</span>
         </div>
        </div>
        <p className="text-gray-500 mb-4">Redirection vers la liste des demandes...</p>
       </CardContent>
      </Card>
     </motion.div>
    </div>
   </div>
  )
 }

 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div className="mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
     <h1 className="text-4xl font-bold text-gray-900 mb-2">Décrivez votre besoin</h1>
     <p className="text-xl text-gray-600">Plus votre description est précise, plus vous recevrez de devis adaptés de nos professionnels</p>
    </motion.div>

    <form onSubmit={handleSubmit} className="space-y-8">
     {/* Informations de base */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.1}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Informations de base</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6 p-8">
        <div>
         <Label htmlFor="title" className="text-base font-semibold">
          Titre de votre demande *
         </Label>
         <Input id="title" placeholder="Ex: Réparation écran iPhone 12 cassé" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} required className="mt-2 h-12" />
        </div>

        <div>
         <Label htmlFor="category" className="text-base font-semibold">
          Catégorie *
         </Label>
         <Select value={formData.category} onValueChange={value => handleInputChange('category', value)}>
          <SelectTrigger className="mt-2 h-12">
           <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
           {categories.map(category => (
            <SelectItem key={category} value={category}>
             {category}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
        </div>

        <div>
         <Label htmlFor="description" className="text-base font-semibold">
          Description détaillée *
         </Label>
         <Textarea id="description" placeholder="Décrivez le problème, l'état de l'objet, les symptômes observés..." rows={4} value={formData.description} onChange={e => handleInputChange('description', e.target.value)} required className="mt-2" />
        </div>
       </CardContent>
      </Card>
     </motion.div>

     {/* Localisation & Timing Card */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.2}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Localisation et urgence</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6 p-8">
        {/* Section Géolocalisation */}
        <div>
         <Label className="text-base font-semibold">Votre localisation *</Label>

         {!userPosition ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-3">
           <h3 className="text-lg font-semibold text-green-800 mb-3">📍 Localisez-vous pour plus de précision !</h3>
           <p className="text-green-700 mb-4">Une localisation précise permet aux réparateurs de votre secteur de vous trouver plus facilement et d'évaluer leurs frais de déplacement.</p>
           <div className="flex flex-col sm:flex-row gap-3">
            <Button type="button" onClick={getUserLocation} disabled={isLocating} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3">
             {isLocating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Navigation className="h-4 w-4 mr-2" />}
             {isLocating ? 'Localisation...' : 'Me localiser pour plus de précision'}
            </Button>
            <div className="text-sm text-green-600 flex items-center">Ou saisissez manuellement ci-dessous</div>
           </div>
          </div>
         ) : (
          <motion.div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3" initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} transition={{duration: 0.3}}>
           <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-800">Position détectée : {detectedLocation}</span>
           </div>
           <p className="text-xs text-blue-600">Vous pouvez modifier manuellement ci-dessous si nécessaire</p>
          </motion.div>
         )}

         <Input placeholder="Ville ou code postal" value={formData.location} onChange={e => handleInputChange('location', e.target.value)} required className="mt-3 h-12" />
        </div>

        <div>
         <Label className="text-base font-semibold">Niveau d'urgence</Label>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {urgencyLevels.map(level => (
           <div key={level.value} className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${formData.urgency === level.value ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`} onClick={() => handleInputChange('urgency', level.value)}>
            <Badge className={level.color} variant="secondary">
             {level.label}
            </Badge>
           </div>
          ))}
         </div>
        </div>

        <div>
         <Label htmlFor="budget" className="text-base font-semibold">
          Budget approximatif
         </Label>
         <Select value={formData.budget} onValueChange={value => handleInputChange('budget', value)}>
          <SelectTrigger className="mt-2 h-12">
           <SelectValue placeholder="Sélectionnez votre budget" />
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="0-50">0 - 50€</SelectItem>
           <SelectItem value="50-100">50 - 100€</SelectItem>
           <SelectItem value="100-200">100 - 200€</SelectItem>
           <SelectItem value="200-500">200 - 500€</SelectItem>
           <SelectItem value="500+">500€+</SelectItem>
           <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
          </SelectContent>
         </Select>
        </div>
       </CardContent>
      </Card>
     </motion.div>

     {/* Photos Card */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.3}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Photos de l'objet</CardTitle>
       </CardHeader>
       <CardContent className="p-8">
        <div className="space-y-4">
         <p className="text-gray-600">Ajoutez des photos pour aider nos professionnels à mieux comprendre le problème</p>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((image, index) => (
           <div key={index} className="relative group">
            <img src={image} alt={`Photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-gray-200" />
            <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
             <X className="h-4 w-4" />
            </button>
           </div>
          ))}

          <ImageUpload value="" onChange={addImage} placeholder="Ajouter une photo" />
         </div>
        </div>
       </CardContent>
      </Card>
     </motion.div>

     {/* Contact Information Card */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.4}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Vos coordonnées</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <Label htmlFor="firstName" className="text-base font-semibold">
           Prénom *
          </Label>
          <Input 
           id="firstName" 
           value={formData.firstName} 
           onChange={e => handleInputChange('firstName', e.target.value)} 
           required 
           className="mt-2 h-12" 
           placeholder={currentUser?.firstName || "Votre prénom"}
          />
         </div>
         <div>
          <Label htmlFor="lastName" className="text-base font-semibold">
           Nom *
          </Label>
          <Input 
           id="lastName" 
           value={formData.lastName} 
           onChange={e => handleInputChange('lastName', e.target.value)} 
           required 
           className="mt-2 h-12" 
           placeholder={currentUser?.lastName || "Votre nom"}
          />
         </div>
         <div>
          <Label htmlFor="phone" className="text-base font-semibold">
           Téléphone *
          </Label>
          <Input 
           id="phone" 
           type="tel" 
           value={formData.phone} 
           onChange={e => handleInputChange('phone', e.target.value)} 
           required 
           className="mt-2 h-12" 
           placeholder={currentUser?.phone || "06 12 34 56 78"}
          />
         </div>
         <div>
          <Label htmlFor="email" className="text-base font-semibold">
           Email *
          </Label>
          <Input 
           id="email" 
           type="email" 
           value={formData.email} 
           onChange={e => handleInputChange('email', e.target.value)} 
           required 
           className="mt-2 h-12" 
           placeholder={currentUser?.email || "votre@email.com"}
          />
         </div>
        </div>
       </CardContent>
      </Card>
     </motion.div>

     {/* Submit Button */}
     <motion.div className="flex justify-center" initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.5}}>
      <Button type="submit" size="lg" className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200">
       Publier ma demande gratuitement
      </Button>
     </motion.div>
    </form>

    {/* Modal de récapitulatif */}
    <RecapModal isOpen={showRecapModal} onClose={() => setShowRecapModal(false)} requestData={formData} onConfirm={handleConfirmSubmit} />
   </div>
  </div>
 )
}