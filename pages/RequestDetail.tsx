import {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Badge} from '@/components/ui/badge'
import {ArrowLeft, MapPin, Clock, Euro, AlertCircle, CheckCircle, User, Phone, Mail, Send, Star, Calendar} from 'lucide-react'
import {motion} from 'framer-motion'
import {useUser} from '@/contexts/UserContext'

// Mock data - en production, ceci viendrait d'une API
const mockRequest = {
 id: 1,
 title: 'Réparation écran iPhone 13 Pro cassé',
 category: 'Téléphones',
 description: 'Écran totalement cassé suite à une chute. Le téléphone fonctionne encore mais impossible de voir quoi que ce soit. Le tactile ne répond plus et il y a des lignes noires sur l\'écran. J\'ai besoin d\'une réparation rapide car j\'utilise mon téléphone pour le travail.',
 location: 'Paris 11ème',
 budget: '50-100€',
 urgency: 'high',
 postedDate: '2024-01-15',
 postedTime: 'Il y a 2h',
 responseCount: 8,
 status: 'active',
 images: [
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop'
 ],
 authorName: 'Marie L.',
 authorPhone: '06 12 34 56 78',
 authorEmail: 'marie.l@email.com',
 authorProfilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=100&h=100&fit=crop&crop=face',
 responses: [
  {
   id: 1,
   professionalName: 'TechRepar Pro',
   professionalPhoto: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=100&h=100&fit=crop&crop=face',
   rating: 4.8,
   responseTime: '< 2h',
   price: '75€',
   message: 'Bonjour, je peux réparer votre écran iPhone 13 Pro dans la journée. J\'ai les pièces en stock et je propose une garantie 6 mois.',
   postedTime: 'Il y a 1h'
  },
  {
   id: 2,
   professionalName: 'FixMobile Express',
   professionalPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
   rating: 4.9,
   responseTime: '< 1h',
   price: '65€',
   message: 'Réparation possible aujourd\'hui même. Écran d\'origine Apple, garantie 12 mois. Atelier certifié.',
   postedTime: 'Il y a 45min'
  }
 ]
}

const urgencyLabels = {
 high: {label: 'Urgent', color: 'bg-red-100 text-red-800', icon: AlertCircle},
 medium: {label: 'Modéré', color: 'bg-yellow-100 text-yellow-800', icon: Clock},
 low: {label: 'Pas urgent', color: 'bg-green-100 text-green-800', icon: CheckCircle}
}

export function RequestDetail() {
 const {id} = useParams()
 const navigate = useNavigate()
 const {currentUser} = useUser()
 const [response, setResponse] = useState('')
 const [price, setPrice] = useState('')

 const urgencyInfo = urgencyLabels[mockRequest.urgency]
 const UrgencyIcon = urgencyInfo.icon

 // Vérifier les permissions
 const canSeePersonalInfo = () => {
  if (!currentUser) return false
  
  // L'auteur peut voir ses propres infos
  if (currentUser.email === mockRequest.authorEmail) return true
  
  // Les professionnels avec abonnement peuvent voir les infos
  if (currentUser.userType === 'professional') {
   // Simulation : période d'essai active
   return true
  }
  
  return false
 }

 const canRespond = () => {
  if (!currentUser) return false
  
  // Seuls les professionnels peuvent répondre
  if (currentUser.userType === 'professional') {
   // Vérifier abonnement/période d'essai
   return true
  }
  
  return false
 }

 const handleResponse = () => {
  if (!response.trim()) {
   alert('Veuillez saisir une réponse')
   return
  }
  
  if (!price.trim()) {
   alert('Veuillez indiquer un tarif')
   return
  }
  
  // Simulation d'envoi de réponse
  alert(`✅ Réponse envoyée !

📨 Votre proposition a été transmise au client.
💰 Tarif proposé : ${price}€
📱 Le client recevra une notification et pourra vous contacter directement.

Vous serez notifié dès qu'il y aura une réponse.`)
  
  setResponse('')
  setPrice('')
 }

 const handleContactAuthor = () => {
  if (!canSeePersonalInfo()) {
   alert('Vous devez être un professionnel avec abonnement actif pour contacter les demandeurs.')
   return
  }
  
  alert(`📞 Contacter ${mockRequest.authorName}

Téléphone : ${mockRequest.authorPhone}
Email : ${mockRequest.authorEmail}

En tant que professionnel, vous pouvez maintenant contacter directement le client.`)
 }

 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Back Button */}
    <motion.div className="mb-6" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.6}}>
     <Button onClick={() => navigate('/requests')} variant="outline" className="flex items-center">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Retour aux demandes
     </Button>
    </motion.div>

    {/* Request Header */}
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
     <Card className="mb-8">
      <CardContent className="p-8">
       <div className="flex flex-col lg:flex-row gap-6">
        {/* Images */}
        {mockRequest.images && mockRequest.images.length > 0 && (
         <div className="lg:w-1/3">
          <div className="grid grid-cols-1 gap-4">
           {mockRequest.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
           ))}
          </div>
         </div>
        )}

        {/* Content */}
        <div className="lg:w-2/3">
         <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
           <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockRequest.title}</h1>
           <Badge variant="outline" className="mb-4">
            {mockRequest.category}
           </Badge>
          </div>
          <Badge className={urgencyInfo.color}>
           <UrgencyIcon className="h-4 w-4 mr-1" />
           {urgencyInfo.label}
          </Badge>
         </div>

         <p className="text-gray-700 text-lg leading-relaxed mb-6">{mockRequest.description}</p>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
           <MapPin className="h-5 w-5 text-gray-400 mr-2" />
           <span>{mockRequest.location}</span>
          </div>
          <div className="flex items-center">
           <Euro className="h-5 w-5 text-gray-400 mr-2" />
           <span>{mockRequest.budget}</span>
          </div>
          <div className="flex items-center">
           <Clock className="h-5 w-5 text-gray-400 mr-2" />
           <span>{mockRequest.postedTime}</span>
          </div>
         </div>

         {/* Author Info - Conditionnel */}
         {canSeePersonalInfo() ? (
          <Card className="bg-blue-50 border-blue-200">
           <CardContent className="p-4">
            <div className="flex items-center justify-between">
             <div className="flex items-center space-x-3">
              {mockRequest.authorProfilePhoto && (
               <img src={mockRequest.authorProfilePhoto} alt={mockRequest.authorName} className="w-12 h-12 rounded-full object-cover" />
              )}
              <div>
               <h4 className="font-semibold text-gray-900">{mockRequest.authorName}</h4>
               <p className="text-sm text-gray-600">Demandeur</p>
              </div>
             </div>
             <Button onClick={handleContactAuthor} size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contacter
             </Button>
            </div>
           </CardContent>
          </Card>
         ) : (
          <Card className="bg-gray-50 border-gray-200">
           <CardContent className="p-4">
            <div className="flex items-center justify-between">
             <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
               <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
               <h4 className="font-semibold text-gray-700">Informations du demandeur</h4>
               <p className="text-sm text-gray-500">Abonnement professionnel requis</p>
              </div>
             </div>
             <Button onClick={() => alert('Abonnement professionnel requis pour accéder aux informations de contact')} variant="outline" size="sm" disabled>
              <Phone className="h-4 w-4 mr-2" />
              Contacter
             </Button>
            </div>
           </CardContent>
          </Card>
         )}
        </div>
       </div>
      </CardContent>
     </Card>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     {/* Responses */}
     <div className="lg:col-span-2">
      <Card>
       <CardHeader>
        <CardTitle className="flex items-center justify-between">
         <span>Réponses des professionnels ({mockRequest.responseCount})</span>
         <Badge variant="secondary">{mockRequest.status === 'active' ? 'Demande active' : 'Terminée'}</Badge>
        </CardTitle>
       </CardHeader>
       <CardContent>
        <div className="space-y-6">
         {mockRequest.responses.map((resp, index) => (
          <motion.div key={resp.id} className="border rounded-lg p-6" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: index * 0.1}}>
           <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
             <img src={resp.professionalPhoto} alt={resp.professionalName} className="w-12 h-12 rounded-full object-cover" />
             <div>
              <h4 className="font-semibold text-gray-900">{resp.professionalName}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
               <Star className="h-4 w-4 text-yellow-400 fill-current" />
               <span>{resp.rating}</span>
               <span>•</span>
               <span>Répond {resp.responseTime}</span>
              </div>
             </div>
            </div>
            <div className="text-right">
             <div className="text-2xl font-bold text-green-600">{resp.price}</div>
             <div className="text-sm text-gray-500">{resp.postedTime}</div>
            </div>
           </div>
           <p className="text-gray-700 mb-4">{resp.message}</p>
           <div className="flex gap-2">
            <Button size="sm" variant="outline">
             <User className="h-4 w-4 mr-2" />
             Voir le profil
            </Button>
            <Button size="sm">
             <Mail className="h-4 w-4 mr-2" />
             Contacter
            </Button>
           </div>
          </motion.div>
         ))}
        </div>
       </CardContent>
      </Card>
     </div>

     {/* Response Form - Only for professionals */}
     <div className="lg:col-span-1">
      {canRespond() ? (
       <Card className="sticky top-8">
        <CardHeader>
         <CardTitle>Proposer mes services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Votre tarif</label>
          <div className="relative">
           <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex: 75" className="pr-8" />
           <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
          </div>
         </div>
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Votre message</label>
          <Textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="Décrivez votre solution, vos garanties, délais..." rows={6} />
         </div>
         <Button onClick={handleResponse} className="w-full bg-blue-600 hover:bg-blue-700">
          <Send className="h-4 w-4 mr-2" />
          Envoyer ma proposition
         </Button>
        </CardContent>
       </Card>
      ) : (
       <Card className="sticky top-8">
        <CardHeader>
         <CardTitle>Accès professionnel</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
         <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
         <h3 className="font-semibold text-gray-900 mb-2">Réservé aux professionnels</h3>
         <p className="text-gray-600 text-sm mb-6">Un abonnement professionnel est requis pour répondre aux demandes</p>
         <Button onClick={() => navigate('/join-as-professional')} className="w-full">
          Devenir professionnel
         </Button>
        </CardContent>
       </Card>
      )}
     </div>
    </div>
   </div>
  </div>
 )
}