import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {User, Settings, Eye, EyeOff, Save, Mail, Phone, MapPin, Calendar, Star, CheckCircle, Clock, AlertTriangle, Wrench, FileText, Plus, X} from 'lucide-react'
import {motion} from 'framer-motion'
import {useUser} from '@/contexts/UserContext'
import {ImageUpload} from '@/components/ui/image-upload'
import {EnhancedLocationInput} from '@/components/ui/enhanced-location-input'

const categories = ['Téléphones & Tablettes', 'Ordinateurs & Informatique', 'Automobiles & Motos', 'Électroménager', 'Textiles & Couture', 'Horlogerie & Bijouterie', 'Audio & Vidéo', 'Imprimantes & Bureautique', 'Appareils photo']

// Mock data for user activity
const mockRequests = [
 {id: 1, title: 'Réparation écran iPhone 13', status: 'completed', date: '2024-01-15', responses: 8, professional: 'Marc Dubois'},
 {id: 2, title: 'Machine à laver qui fuit', status: 'active', date: '2024-01-20', responses: 5, professional: null},
 {id: 3, title: 'Diagnostic voiture Peugeot', status: 'in-progress', date: '2024-01-22', responses: 12, professional: 'Sarah Martin'}
]

const mockJobs = [
 {id: 1, title: 'Réparation écran iPhone 12', client: 'Marie L.', status: 'completed', date: '2024-01-18', price: '75€'},
 {id: 2, title: 'Changement batterie Samsung', client: 'Thomas B.', status: 'in-progress', date: '2024-01-23', price: '55€'},
 {id: 3, title: 'Réparation caméra iPhone 11', client: 'Sophie R.', status: 'pending', date: '2024-01-25', price: '65€'}
]

export function UserProfile() {
 const navigate = useNavigate()
 const {currentUser, setCurrentUser} = useUser()
 const [isEditing, setIsEditing] = useState(false)
 const [showPassword, setShowPassword] = useState(false)
 const [activeTab, setActiveTab] = useState('profile')

 const [formData, setFormData] = useState({
  firstName: currentUser?.firstName || '',
  lastName: currentUser?.lastName || '',
  email: currentUser?.email || '',
  phone: currentUser?.phone || '',
  profilePhoto: currentUser?.profilePhoto || '',
  street: currentUser?.address?.street || '',
  city: currentUser?.address?.city || '',
  postalCode: currentUser?.address?.postalCode || '',
  department: currentUser?.address?.department || '',
  businessName: currentUser?.businessName || '',
  categories: currentUser?.categories || [],
  description: currentUser?.description || '',
  newPassword: '',
  confirmPassword: ''
 })

 // Redirect if not logged in
 if (!currentUser) {
  navigate('/signup')
  return null
 }

 const handleInputChange = (field: string, value: any) => {
  setFormData(prev => ({...prev, [field]: value}))
 }

 const handleLocationChange = (location: {
  street: string
  city: string
  postalCode: string
  department: string
  coordinates?: {lat: number; lng: number}
 }) => {
  setFormData(prev => ({
   ...prev,
   street: location.street,
   city: location.city,
   postalCode: location.postalCode,
   department: location.department
  }))
 }

 const toggleCategory = (category: string) => {
  setFormData(prev => ({
   ...prev,
   categories: prev.categories.includes(category)
    ? prev.categories.filter(c => c !== category)
    : [...prev.categories, category]
  }))
 }

 const handleSave = () => {
  // Validation
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
   alert('Veuillez remplir tous les champs obligatoires')
   return
  }

  if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
   alert('Les mots de passe ne correspondent pas')
   return
  }

  if (formData.newPassword && formData.newPassword.length < 6) {
   alert('Le mot de passe doit contenir au moins 6 caractères')
   return
  }

  // Update user in context
  const updatedUser = {
   ...currentUser,
   firstName: formData.firstName,
   lastName: formData.lastName,
   email: formData.email,
   phone: formData.phone,
   profilePhoto: formData.profilePhoto,
   address: {
    street: formData.street,
    city: formData.city,
    postalCode: formData.postalCode,
    department: formData.department,
    coordinates: currentUser.address.coordinates
   },
   ...(currentUser.userType === 'professional' ? {
    businessName: formData.businessName,
    categories: formData.categories,
    description: formData.description
   } : {})
  }

  setCurrentUser(updatedUser)
  setIsEditing(false)
  alert('✅ Profil mis à jour avec succès !')
 }

 const getStatusBadge = (status: string) => {
  switch (status) {
   case 'completed':
    return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Terminé</Badge>
   case 'active':
    return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Active</Badge>
   case 'in-progress':
    return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />En cours</Badge>
   case 'pending':
    return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="h-3 w-3 mr-1" />En attente</Badge>
   default:
    return <Badge variant="outline">{status}</Badge>
  }
 }

 const isProfessional = currentUser.userType === 'professional'

 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Profile */}
    <motion.div 
     className="mb-8"
     initial={{opacity: 0, y: 20}}
     animate={{opacity: 1, y: 0}}
     transition={{duration: 0.6}}
    >
     <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-8">
       <div className="flex items-center gap-6">
        <div className="relative">
         {currentUser.profilePhoto ? (
          <img
           src={currentUser.profilePhoto}
           alt={currentUser.firstName}
           className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
         ) : (
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
           <User className="h-12 w-12 text-blue-600" />
          </div>
         )}
         {currentUser.isVerified && (
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
           <CheckCircle className="h-5 w-5 text-white" />
          </div>
         )}
        </div>

        <div className="flex-1">
         <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentUser.firstName} {currentUser.lastName}
         </h1>
         {isProfessional && currentUser.businessName && (
          <p className="text-xl text-blue-600 font-semibold mb-2">{currentUser.businessName}</p>
         )}
         <div className="flex items-center gap-4 mb-3">
          <Badge className={isProfessional ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
           {isProfessional ? <Wrench className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
           {isProfessional ? 'Professionnel' : 'Client'}
          </Badge>
          {currentUser.isVerified && (
           <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />Vérifié
           </Badge>
          )}
         </div>
         <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center">
           <Mail className="h-4 w-4 mr-2" />
           {currentUser.email}
          </div>
          <div className="flex items-center">
           <Phone className="h-4 w-4 mr-2" />
           {currentUser.phone}
          </div>
          <div className="flex items-center">
           <MapPin className="h-4 w-4 mr-2" />
           {currentUser.address.city} ({currentUser.address.postalCode})
          </div>
          <div className="flex items-center">
           <Calendar className="h-4 w-4 mr-2" />
           Depuis {currentUser.joinedDate}
          </div>
         </div>
        </div>

        <div className="text-right">
         <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "destructive" : "default"}
          className="mb-4"
         >
          {isEditing ? (
           <>
            <X className="h-4 w-4 mr-2" />
            Annuler
           </>
          ) : (
           <>
            <Settings className="h-4 w-4 mr-2" />
            Modifier le profil
           </>
          )}
         </Button>
         
         {isProfessional && (
          <div className="space-y-2">
           <div className="flex items-center justify-end">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-semibold">{currentUser.rating || 5.0}</span>
            <span className="text-gray-500 ml-1">({currentUser.reviewCount || 0} avis)</span>
           </div>
           <p className="text-sm text-gray-600">{currentUser.completedJobs || 0} interventions</p>
          </div>
         )}
        </div>
       </div>
      </CardContent>
     </Card>
    </motion.div>

    {/* Tabs Navigation */}
    <Tabs value={activeTab} onValueChange={setActiveTab}>
     <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="profile">
       <User className="h-4 w-4 mr-2" />
       Profil
      </TabsTrigger>
      <TabsTrigger value="activity">
       <FileText className="h-4 w-4 mr-2" />
       {isProfessional ? 'Mes interventions' : 'Mes demandes'}
      </TabsTrigger>
      <TabsTrigger value="settings">
       <Settings className="h-4 w-4 mr-2" />
       Paramètres
      </TabsTrigger>
      <TabsTrigger value="stats">
       <Star className="h-4 w-4 mr-2" />
       Statistiques
      </TabsTrigger>
     </TabsList>

     {/* Profile Tab */}
     <TabsContent value="profile" className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Personal Information */}
       <Card>
        <CardHeader>
         <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
         {isEditing ? (
          <>
           <div>
            <Label>Photo de profil</Label>
            <ImageUpload
             value={formData.profilePhoto}
             onChange={(url) => handleInputChange('profilePhoto', url)}
             className="mt-2"
            />
           </div>
           <div className="grid grid-cols-2 gap-4">
            <div>
             <Label htmlFor="firstName">Prénom *</Label>
             <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="mt-1"
             />
            </div>
            <div>
             <Label htmlFor="lastName">Nom *</Label>
             <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="mt-1"
             />
            </div>
           </div>
           <div>
            <Label htmlFor="email">Email *</Label>
            <Input
             id="email"
             type="email"
             value={formData.email}
             onChange={(e) => handleInputChange('email', e.target.value)}
             className="mt-1"
            />
           </div>
           <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
             id="phone"
             value={formData.phone}
             onChange={(e) => handleInputChange('phone', e.target.value)}
             className="mt-1"
            />
           </div>
          </>
         ) : (
          <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
            <div>
             <Label className="text-sm text-gray-600">Prénom</Label>
             <p className="font-medium">{currentUser.firstName}</p>
            </div>
            <div>
             <Label className="text-sm text-gray-600">Nom</Label>
             <p className="font-medium">{currentUser.lastName}</p>
            </div>
           </div>
           <div>
            <Label className="text-sm text-gray-600">Email</Label>
            <p className="font-medium">{currentUser.email}</p>
           </div>
           <div>
            <Label className="text-sm text-gray-600">Téléphone</Label>
            <p className="font-medium">{currentUser.phone}</p>
           </div>
          </div>
         )}
        </CardContent>
       </Card>

       {/* Address */}
       <Card>
        <CardHeader>
         <CardTitle>Adresse</CardTitle>
        </CardHeader>
        <CardContent>
         {isEditing ? (
          <EnhancedLocationInput
           street={formData.street}
           city={formData.city}
           postalCode={formData.postalCode}
           department={formData.department}
           onChange={handleLocationChange}
          />
         ) : (
          <div className="space-y-2">
           {currentUser.address.street && (
            <p className="font-medium">{currentUser.address.street}</p>
           )}
           <p className="font-medium">
            {currentUser.address.city} {currentUser.address.postalCode}
           </p>
           {currentUser.address.department && (
            <p className="text-gray-600">{currentUser.address.department}</p>
           )}
          </div>
         )}
        </CardContent>
       </Card>

       {/* Professional Information (if professional) */}
       {isProfessional && (
        <Card className="lg:col-span-2">
         <CardHeader>
          <CardTitle>Informations professionnelles</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
          {isEditing ? (
           <>
            <div>
             <Label htmlFor="businessName">Nom de l'entreprise</Label>
             <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="mt-1"
             />
            </div>
            <div>
             <Label>Catégories de service</Label>
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {categories.map(category => (
               <motion.div
                key={category}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                 formData.categories.includes(category)
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => toggleCategory(category)}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
               >
                <span className="text-sm font-medium">{category}</span>
               </motion.div>
              ))}
             </div>
            </div>
            <div>
             <Label htmlFor="description">Description de votre activité</Label>
             <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="mt-1"
             />
            </div>
           </>
          ) : (
           <>
            <div>
             <Label className="text-sm text-gray-600">Entreprise</Label>
             <p className="font-medium">{currentUser.businessName || 'Non renseigné'}</p>
            </div>
            <div>
             <Label className="text-sm text-gray-600">Catégories</Label>
             <div className="flex flex-wrap gap-2 mt-2">
              {currentUser.categories && currentUser.categories.length > 0 ? (
               currentUser.categories.map((category, index) => (
                <Badge key={index} variant="outline">{category}</Badge>
               ))
              ) : (
               <p className="text-gray-500">Aucune catégorie définie</p>
              )}
             </div>
            </div>
            <div>
             <Label className="text-sm text-gray-600">Description</Label>
             <p className="mt-1">{currentUser.description || 'Aucune description'}</p>
            </div>
           </>
          )}
         </CardContent>
        </Card>
       )}

       {/* Save Button */}
       {isEditing && (
        <div className="lg:col-span-2">
         <Button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les modifications
         </Button>
        </div>
       )}
      </div>
     </TabsContent>

     {/* Activity Tab */}
     <TabsContent value="activity" className="mt-6">
      <Card>
       <CardHeader>
        <CardTitle>
         {isProfessional ? 'Mes interventions récentes' : 'Mes demandes récentes'}
        </CardTitle>
       </CardHeader>
       <CardContent>
        <div className="space-y-4">
         {(isProfessional ? mockJobs : mockRequests).map((item, index) => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
           <div className="flex-1">
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600">
             {isProfessional ? `Client: ${item.client}` : `Professionnel: ${item.professional || 'En attente'}`}
            </p>
            <p className="text-xs text-gray-500">{item.date}</p>
           </div>
           <div className="flex items-center gap-4">
            {isProfessional && item.price && (
             <span className="font-semibold text-green-600">{item.price}</span>
            )}
            {!isProfessional && item.responses && (
             <span className="text-sm text-gray-600">{item.responses} réponses</span>
            )}
            {getStatusBadge(item.status)}
           </div>
          </div>
         ))}
         
         {(isProfessional ? mockJobs : mockRequests).length === 0 && (
          <div className="text-center py-8 text-gray-500">
           <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
           <p>Aucune {isProfessional ? 'intervention' : 'demande'} pour le moment</p>
           <Button 
            className="mt-4" 
            onClick={() => navigate(isProfessional ? '/requests' : '/create-request')}
           >
            <Plus className="h-4 w-4 mr-2" />
            {isProfessional ? 'Voir les demandes' : 'Créer une demande'}
           </Button>
          </div>
         )}
        </div>
       </CardContent>
      </Card>
     </TabsContent>

     {/* Settings Tab */}
     <TabsContent value="settings" className="mt-6">
      <Card>
       <CardHeader>
        <CardTitle>Paramètres de sécurité</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
        <div>
         <Label htmlFor="newPassword">Nouveau mot de passe</Label>
         <div className="relative">
          <Input
           id="newPassword"
           type={showPassword ? 'text' : 'password'}
           value={formData.newPassword}
           onChange={(e) => handleInputChange('newPassword', e.target.value)}
           className="mt-1 pr-10"
           placeholder="Nouveau mot de passe"
          />
          <button
           type="button"
           onClick={() => setShowPassword(!showPassword)}
           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
         </div>
        </div>
        <div>
         <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
         <Input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className="mt-1"
          placeholder="Confirmer le mot de passe"
         />
        </div>
        <Button 
         onClick={handleSave}
         disabled={!formData.newPassword || formData.newPassword !== formData.confirmPassword}
         className="w-full"
        >
         <Save className="h-4 w-4 mr-2" />
         Changer le mot de passe
        </Button>
       </CardContent>
      </Card>
     </TabsContent>

     {/* Stats Tab */}
     <TabsContent value="stats" className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <Card>
        <CardContent className="p-6 text-center">
         <div className="text-3xl font-bold text-blue-600 mb-2">
          {isProfessional ? (currentUser.completedJobs || 0) : mockRequests.length}
         </div>
         <p className="text-gray-600">
          {isProfessional ? 'Interventions terminées' : 'Demandes créées'}
         </p>
        </CardContent>
       </Card>
       
       <Card>
        <CardContent className="p-6 text-center">
         <div className="text-3xl font-bold text-green-600 mb-2">
          {isProfessional ? (currentUser.rating || 5.0) : '4.8'}
         </div>
         <p className="text-gray-600">
          {isProfessional ? 'Note moyenne' : 'Satisfaction moyenne'}
         </p>
        </CardContent>
       </Card>
       
       <Card>
        <CardContent className="p-6 text-center">
         <div className="text-3xl font-bold text-purple-600 mb-2">
          {isProfessional ? (currentUser.reviewCount || 0) : mockRequests.filter(r => r.status === 'completed').length}
         </div>
         <p className="text-gray-600">
          {isProfessional ? 'Avis reçus' : 'Réparations réussies'}
         </p>
        </CardContent>
       </Card>
       
       <Card>
        <CardContent className="p-6 text-center">
         <div className="text-3xl font-bold text-orange-600 mb-2">
          {currentUser.joinedDate ? 
           Math.floor((new Date().getTime() - new Date(currentUser.joinedDate).getTime()) / (1000 * 60 * 60 * 24)) 
           : 0}
         </div>
         <p className="text-gray-600">Jours sur la plateforme</p>
        </CardContent>
       </Card>
      </div>
     </TabsContent>
    </Tabs>
   </div>
  </div>
 )
}