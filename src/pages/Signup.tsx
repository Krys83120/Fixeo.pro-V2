import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Label} from '@/components/ui/label'
import {Checkbox} from '@/components/ui/checkbox'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Badge} from '@/components/ui/badge'
import {User, Wrench, MapPin, Plus, X, CheckCircle} from 'lucide-react'
import {motion} from 'framer-motion'
import {Logo} from '@/components/ui/logo'
import {ImageUpload} from '@/components/ui/image-upload'
import {EnhancedLocationInput} from '@/components/ui/enhanced-location-input'
import {useUser} from '@/contexts/UserContext'

const categories = ['Téléphones & Tablettes', 'Ordinateurs & Informatique', 'Automobiles & Motos', 'Électroménager', 'Textiles & Couture', 'Horlogerie & Bijouterie', 'Audio & Vidéo', 'Imprimantes & Bureautique', 'Appareils photo']

export function Signup() {
 const navigate = useNavigate()
 const {addUser} = useUser()
 
 const [formData, setFormData] = useState({
  // Informations personnelles
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  profilePhoto: '',
  userType: 'client' as 'client' | 'professional',
  
  // Adresse
  street: '',
  city: '',
  postalCode: '',
  department: '',
  coordinates: undefined as {lat: number, lng: number} | undefined,
  
  // Professionnel uniquement
  businessName: '',
  categories: [] as string[],
  description: '',
  
  // Conditions
  acceptTerms: false,
  acceptMarketing: false
 })

 const [isSubmitted, setIsSubmitted] = useState(false)

 const handleInputChange = (field: string, value: any) => {
  setFormData(prev => ({...prev, [field]: value}))
 }

 const handleLocationChange = (location: {
  street: string
  city: string
  postalCode: string
  department: string
  coordinates?: {lat: number, lng: number}
 }) => {
  setFormData(prev => ({
   ...prev,
   street: location.street,
   city: location.city,
   postalCode: location.postalCode,
   department: location.department,
   coordinates: location.coordinates
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

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  // Validation
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
   alert('Veuillez remplir tous les champs obligatoires')
   return
  }

  if (formData.password !== formData.confirmPassword) {
   alert('Les mots de passe ne correspondent pas')
   return
  }

  if (formData.password.length < 6) {
   alert('Le mot de passe doit contenir au moins 6 caractères')
   return
  }

  if (!formData.city || !formData.postalCode) {
   alert('Veuillez renseigner votre adresse complète')
   return
  }

  if (formData.userType === 'professional' && (!formData.businessName || formData.categories.length === 0)) {
   alert('Veuillez remplir les informations professionnelles')
   return
  }

  if (!formData.acceptTerms) {
   alert('Vous devez accepter les conditions générales')
   return
  }

  // Créer le nouvel utilisateur
  const newUser = addUser({
   firstName: formData.firstName,
   lastName: formData.lastName,
   email: formData.email,
   phone: formData.phone,
   userType: formData.userType,
   profilePhoto: formData.profilePhoto,
   address: {
    street: formData.street,
    city: formData.city,
    postalCode: formData.postalCode,
    department: formData.department,
    coordinates: formData.coordinates
   },
   ...(formData.userType === 'professional' ? {
    businessName: formData.businessName,
    categories: formData.categories,
    description: formData.description
   } : {})
  })

  setIsSubmitted(true)

  // Redirection après 3 secondes
  setTimeout(() => {
   navigate('/')
  }, 3000)
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Inscription réussie !</h2>
        <p className="text-gray-600 mb-8 text-lg">
         Bienvenue {formData.firstName} ! Votre compte {formData.userType === 'professional' ? 'professionnel' : 'client'} a été créé et validé.
        </p>
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
         <h3 className="font-semibold mb-2">Votre profil :</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div>📧 Email : {formData.email}</div>
          <div>📱 Téléphone : {formData.phone}</div>
          <div>📍 Ville : {formData.city} ({formData.postalCode})</div>
          {formData.userType === 'professional' && (
           <div>🔧 Entreprise : {formData.businessName}</div>
          )}
         </div>
        </div>
        <p className="text-gray-500">Redirection automatique vers l'accueil...</p>
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
    {/* Header */}
    <motion.div className="text-center mb-8" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
     <div className="flex justify-center mb-6">
      <Logo size="lg" animated={true} />
     </div>
     <h1 className="text-4xl font-bold text-gray-900 mb-2">Rejoignez Fixeo.Pro</h1>
     <p className="text-xl text-gray-600">Créez votre compte en quelques minutes</p>
    </motion.div>

    <form onSubmit={handleSubmit} className="space-y-8">
     {/* Type de compte */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.1}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Type de compte</CardTitle>
       </CardHeader>
       <CardContent className="p-8">
        <RadioGroup value={formData.userType} onValueChange={(value: 'client' | 'professional') => handleInputChange('userType', value)}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${formData.userType === 'client' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
           <RadioGroupItem value="client" id="client" className="sr-only" />
           <label htmlFor="client" className="cursor-pointer">
            <div className="flex items-center mb-4">
             <User className="h-8 w-8 text-blue-600 mr-3" />
             <h3 className="text-lg font-semibold">Client</h3>
            </div>
            <p className="text-gray-600">Je cherche des réparateurs pour mes objets</p>
           </label>
          </div>

          <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${formData.userType === 'professional' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
           <RadioGroupItem value="professional" id="professional" className="sr-only" />
           <label htmlFor="professional" className="cursor-pointer">
            <div className="flex items-center mb-4">
             <Wrench className="h-8 w-8 text-blue-600 mr-3" />
             <h3 className="text-lg font-semibold">Professionnel</h3>
            </div>
            <p className="text-gray-600">Je suis réparateur et je propose mes services</p>
           </label>
          </div>
         </div>
        </RadioGroup>
       </CardContent>
      </Card>
     </motion.div>

     {/* Informations personnelles */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.2}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Informations personnelles</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6 p-8">
        {/* Photo de profil */}
        <div>
         <Label className="text-base font-semibold">Photo de profil</Label>
         <div className="mt-2">
          <ImageUpload 
           value={formData.profilePhoto} 
           onChange={url => handleInputChange('profilePhoto', url)} 
           placeholder="Ajouter votre photo" 
           className="max-w-sm" 
          />
         </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <Label htmlFor="firstName" className="text-base font-semibold">Prénom *</Label>
          <Input 
           id="firstName" 
           value={formData.firstName} 
           onChange={e => handleInputChange('firstName', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>
         <div>
          <Label htmlFor="lastName" className="text-base font-semibold">Nom *</Label>
          <Input 
           id="lastName" 
           value={formData.lastName} 
           onChange={e => handleInputChange('lastName', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>
         <div>
          <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
          <Input 
           id="email" 
           type="email" 
           value={formData.email} 
           onChange={e => handleInputChange('email', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>
         <div>
          <Label htmlFor="phone" className="text-base font-semibold">Téléphone *</Label>
          <Input 
           id="phone" 
           type="tel" 
           value={formData.phone} 
           onChange={e => handleInputChange('phone', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>
         <div>
          <Label htmlFor="password" className="text-base font-semibold">Mot de passe *</Label>
          <Input 
           id="password" 
           type="password" 
           value={formData.password} 
           onChange={e => handleInputChange('password', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>
         <div>
          <Label htmlFor="confirmPassword" className="text-base font-semibold">Confirmer le mot de passe *</Label>
          <Input 
           id="confirmPassword" 
           type="password" 
           value={formData.confirmPassword} 
           onChange={e => handleInputChange('confirmPassword', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>
        </div>
       </CardContent>
      </Card>
     </motion.div>

     {/* Adresse */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.3}}>
      <Card className="shadow-lg border-0">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-gray-900">Adresse</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6 p-8">
        <EnhancedLocationInput
         street={formData.street}
         city={formData.city}
         postalCode={formData.postalCode}
         department={formData.department}
         onChange={handleLocationChange}
        />
       </CardContent>
      </Card>
     </motion.div>

     {/* Informations professionnelles (conditionnelles) */}
     {formData.userType === 'professional' && (
      <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.4}}>
       <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
         <CardTitle className="text-xl font-bold text-gray-900">Informations professionnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
         <div>
          <Label htmlFor="businessName" className="text-base font-semibold">Nom de l'entreprise/atelier *</Label>
          <Input 
           id="businessName" 
           value={formData.businessName} 
           onChange={e => handleInputChange('businessName', e.target.value)} 
           required 
           className="mt-2 h-12" 
          />
         </div>

         <div>
          <Label className="text-base font-semibold">Catégories de service *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
           {categories.map(category => (
            <motion.div
             key={category}
             className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${formData.categories.includes(category) ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
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
          <Label htmlFor="description" className="text-base font-semibold">Description de votre activité</Label>
          <Textarea 
           id="description" 
           value={formData.description} 
           onChange={e => handleInputChange('description', e.target.value)} 
           placeholder="Décrivez votre expertise, vos spécialités..." 
           rows={4} 
           className="mt-2" 
          />
         </div>
        </CardContent>
       </Card>
      </motion.div>
     )}

     {/* Conditions */}
     <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.5}}>
      <Card className="shadow-lg border-0">
       <CardContent className="space-y-4 p-8">
        <div className="flex items-start space-x-3">
         <Checkbox 
          id="terms" 
          checked={formData.acceptTerms} 
          onCheckedChange={checked => handleInputChange('acceptTerms', checked)} 
          className="mt-1" 
         />
         <Label htmlFor="terms" className="text-sm leading-relaxed">
          J'accepte les <a href="#" className="text-blue-600 hover:underline font-medium">conditions générales</a> et la <a href="#" className="text-blue-600 hover:underline font-medium">politique de confidentialité</a> de Fixeo.Pro *
         </Label>
        </div>

        <div className="flex items-start space-x-3">
         <Checkbox 
          id="marketing" 
          checked={formData.acceptMarketing} 
          onCheckedChange={checked => handleInputChange('acceptMarketing', checked)} 
          className="mt-1" 
         />
         <Label htmlFor="marketing" className="text-sm leading-relaxed">
          J'accepte de recevoir des communications marketing de Fixeo.Pro
         </Label>
        </div>
       </CardContent>
      </Card>
     </motion.div>

     {/* Submit Button */}
     <motion.div className="flex justify-center" initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.6}}>
      <Button 
       type="submit" 
       size="lg" 
       className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
       disabled={!formData.acceptTerms}
      >
       Créer mon compte
      </Button>
     </motion.div>
    </form>
   </div>
  </div>
 )
}