import {useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Label} from '@/components/ui/label'
import {Checkbox} from '@/components/ui/checkbox'
import {Star, Shield, TrendingUp, Users, CheckCircle, Plus, X, Zap, Award} from 'lucide-react'
import {motion} from 'framer-motion'
import {Logo} from '@/components/ui/logo'
import {ImageUpload} from '@/components/ui/image-upload'
import {LocationInput} from '@/components/ui/location-input'

const categories = ['Téléphones & Tablettes', 'Ordinateurs & Informatique', 'Automobiles & Motos', 'Électroménager', 'Textiles & Couture', 'Horlogerie & Bijouterie', 'Audio & Vidéo', 'Imprimantes & Bureautique', 'Appareils photo']

const benefits = [
 {
  icon: Users,
  title: 'Accès à des milliers de clients',
  description: 'Recevez des demandes qualifiées dans votre zone'
 },
 {
  icon: TrendingUp,
  title: 'Développez votre activité',
  description: "Augmentez votre chiffre d'affaires et votre visibilité"
 },
 {
  icon: Shield,
  title: 'Paiements sécurisés',
  description: 'Transactions protégées et paiements garantis'
 },
 {
  icon: Zap,
  title: 'Outils professionnels',
  description: 'Dashboard et outils de gestion intégrés'
 }
]

export function ProfessionalSignup() {
 const [currentStep, setCurrentStep] = useState(1)
 const [formData, setFormData] = useState({
  // Personal info
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  profilePhoto: '',

  // Business info
  businessName: '',
  categories: [] as string[],
  description: '',
  location: '',

  // Services
  services: [{name: '', price: '', duration: ''}],

  // Terms
  acceptTerms: false,
  acceptMarketing: false
 })

 const handleInputChange = (field: string, value: any) => {
  setFormData(prev => ({...prev, [field]: value}))
 }

 const addService = () => {
  setFormData(prev => ({
   ...prev,
   services: [...prev.services, {name: '', price: '', duration: ''}]
  }))
 }

 const removeService = (index: number) => {
  setFormData(prev => ({
   ...prev,
   services: prev.services.filter((_, i) => i !== index)
  }))
 }

 const updateService = (index: number, field: string, value: string) => {
  setFormData(prev => ({
   ...prev,
   services: prev.services.map((service, i) => (i === index ? {...service, [field]: value} : service))
  }))
 }

 const toggleCategory = (category: string) => {
  setFormData(prev => ({
   ...prev,
   categories: prev.categories.includes(category) ? prev.categories.filter(c => c !== category) : [...prev.categories, category]
  }))
 }

 const nextStep = () => {
  if (currentStep < 3) setCurrentStep(currentStep + 1)
 }

 const prevStep = () => {
  if (currentStep > 1) setCurrentStep(currentStep - 1)
 }

 const handleSubmit = () => {
  // Validation basique
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
   alert('Veuillez remplir tous les champs obligatoires des informations personnelles')
   return
  }
  
  if (!formData.businessName || !formData.location || formData.categories.length === 0) {
   alert('Veuillez remplir tous les champs obligatoires des informations professionnelles')
   return
  }
  
  if (!formData.acceptTerms) {
   alert('Vous devez accepter les conditions générales pour vous inscrire')
   return
  }

  // Simulation d'inscription réussie
  alert(`✅ Inscription réussie !

Félicitations ${formData.firstName} ${formData.lastName} !

Votre entreprise "${formData.businessName}" a été enregistrée avec succès.

📧 Un email de confirmation a été envoyé à : ${formData.email}
📱 SMS de validation envoyé au : ${formData.phone}

Prochaines étapes :
1. Vérification de votre profil sous 24h
2. Activation de votre compte professionnel  
3. Formation gratuite à la plateforme

Vous recevrez vos premiers clients bientôt !`)

  // Reset du formulaire
  setFormData({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   profilePhoto: '',
   businessName: '',
   categories: [],
   description: '',
   location: '',
   services: [{name: '', price: '', duration: ''}],
   acceptTerms: false,
   acceptMarketing: false
  })
  setCurrentStep(1)
 }

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <motion.div className="text-center mb-12" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
     <div className="flex justify-center mb-6">
      <Logo size="lg" animated={true} />
     </div>
     <h1 className="text-5xl font-bold text-gray-900 mb-4">Rejoignez Fixeo.Pro</h1>
     <p className="text-xl text-gray-600 mb-8">Développez votre activité de réparation avec la première plateforme française professionnelle</p>

     {/* Benefits */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {benefits.map((benefit, index) => {
       const IconComponent = benefit.icon
       return (
        <motion.div key={index} initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: index * 0.1}}>
         <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
           <motion.div whileHover={{scale: 1.1}} transition={{duration: 0.2}}>
            <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-3" />
           </motion.div>
           <h3 className="font-semibold mb-2 text-gray-900">{benefit.title}</h3>
           <p className="text-sm text-gray-600">{benefit.description}</p>
          </CardContent>
         </Card>
        </motion.div>
       )
      })}
     </div>
    </motion.div>

    {/* Progress Steps */}
    <motion.div className="flex justify-center mb-8" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
     <div className="flex items-center space-x-4">
      {[1, 2, 3].map(step => (
       <div key={step} className="flex items-center">
        <motion.div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step <= currentStep ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-300 text-gray-600'}`} whileHover={{scale: 1.1}}>
         {step < currentStep ? <CheckCircle className="h-6 w-6" /> : step}
        </motion.div>
        {step < 3 && <div className={`w-16 h-1 transition-all duration-300 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />}
       </div>
      ))}
     </div>
    </motion.div>

    {/* Form Steps */}
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.4}}>
     <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-8">
       {currentStep === 1 && (
        <div className="space-y-6">
         <CardHeader className="px-0">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
           <Users className="h-6 w-6 mr-3 text-blue-600" />
           Informations personnelles
          </CardTitle>
         </CardHeader>

         {/* Photo de profil */}
         <div>
          <Label className="text-base font-semibold">Photo de profil</Label>
          <div className="mt-2">
           <ImageUpload value={formData.profilePhoto} onChange={url => handleInputChange('profilePhoto', url)} placeholder="Ajouter votre photo de profil" className="max-w-sm" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Une photo professionnelle augmente la confiance des clients</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
           <Label htmlFor="firstName" className="text-base font-semibold">
            Prénom *
           </Label>
           <Input id="firstName" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} required className="mt-2 h-12" />
          </div>
          <div>
           <Label htmlFor="lastName" className="text-base font-semibold">
            Nom *
           </Label>
           <Input id="lastName" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} required className="mt-2 h-12" />
          </div>
          <div>
           <Label htmlFor="email" className="text-base font-semibold">
            Email *
           </Label>
           <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required className="mt-2 h-12" />
          </div>
          <div>
           <Label htmlFor="phone" className="text-base font-semibold">
            Téléphone *
           </Label>
           <Input id="phone" type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} required className="mt-2 h-12" />
          </div>
         </div>
        </div>
       )}

       {currentStep === 2 && (
        <div className="space-y-6">
         <CardHeader className="px-0">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
           <Award className="h-6 w-6 mr-3 text-blue-600" />
           Informations professionnelles
          </CardTitle>
         </CardHeader>

         <div className="space-y-6">
          <div>
           <Label htmlFor="businessName" className="text-base font-semibold">
            Nom de l'entreprise/atelier *
           </Label>
           <Input id="businessName" value={formData.businessName} onChange={e => handleInputChange('businessName', e.target.value)} required className="mt-2 h-12" />
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
           <Label htmlFor="location" className="text-base font-semibold">
            Localisation *
           </Label>
           <LocationInput value={formData.location} onChange={value => handleInputChange('location', value)} placeholder="Ville, code postal" className="mt-2" />
          </div>

          <div>
           <Label htmlFor="description" className="text-base font-semibold">
            Description de votre activité
           </Label>
           <Textarea id="description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="Décrivez votre expertise, vos spécialités..." rows={4} className="mt-2" />
          </div>
         </div>
        </div>
       )}

       {currentStep === 3 && (
        <div className="space-y-6">
         <CardHeader className="px-0">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
           <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
           Finalisation
          </CardTitle>
         </CardHeader>

         <div className="space-y-6">
          <div>
           <Label className="text-base font-semibold">Services proposés (optionnel)</Label>
           <div className="space-y-4 mt-3">
            {formData.services.map((service, index) => (
             <motion.div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-2 border-gray-200 rounded-lg bg-gray-50" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3, delay: index * 0.1}}>
              <div>
               <Label className="text-sm font-semibold">Nom du service</Label>
               <Input value={service.name} onChange={e => updateService(index, 'name', e.target.value)} placeholder="Ex: Réparation écran" className="mt-1 h-10" />
              </div>
              <div>
               <Label className="text-sm font-semibold">Prix</Label>
               <Input value={service.price} onChange={e => updateService(index, 'price', e.target.value)} placeholder="Ex: 45€" className="mt-1 h-10" />
              </div>
              <div>
               <Label className="text-sm font-semibold">Durée</Label>
               <Input value={service.duration} onChange={e => updateService(index, 'duration', e.target.value)} placeholder="Ex: 30 min" className="mt-1 h-10" />
              </div>
              <div className="flex items-end">
               {formData.services.length > 1 && (
                <Button type="button" variant="outline" size="sm" onClick={() => removeService(index)} className="w-full">
                 <X className="h-4 w-4" />
                </Button>
               )}
              </div>
             </motion.div>
            ))}

            <Button type="button" variant="outline" onClick={addService} className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50">
             <Plus className="h-4 w-4 mr-2" />
             Ajouter un service
            </Button>
           </div>
          </div>

          <div className="space-y-4">
           <div className="flex items-start space-x-3">
            <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={checked => handleInputChange('acceptTerms', checked)} className="mt-1" />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
             J'accepte les{' '}
             <a href="#" className="text-blue-600 hover:underline font-medium">
              conditions générales
             </a>{' '}
             et la{' '}
             <a href="#" className="text-blue-600 hover:underline font-medium">
              politique de confidentialité
             </a>{' '}
             de Fixeo.Pro *
            </Label>
           </div>

           <div className="flex items-start space-x-3">
            <Checkbox id="marketing" checked={formData.acceptMarketing} onCheckedChange={checked => handleInputChange('acceptMarketing', checked)} className="mt-1" />
            <Label htmlFor="marketing" className="text-sm leading-relaxed">
             J'accepte de recevoir des communications marketing de Fixeo.Pro
            </Label>
           </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
           <h4 className="font-semibold mb-3 text-blue-900">Prochaines étapes :</h4>
           <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-center">
             <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
             Vérification de votre profil sous 24h
            </li>
            <li className="flex items-center">
             <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
             Activation de votre compte professionnel
            </li>
            <li className="flex items-center">
             <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
             Formation gratuite à la plateforme
            </li>
            <li className="flex items-center">
             <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
             Première demande de réparation
            </li>
           </ul>
          </div>
         </div>
        </div>
       )}

       {/* Navigation Buttons */}
       <div className="flex justify-between mt-10 pt-6 border-t">
        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1} className="px-8 font-medium">
         Précédent
        </Button>

        {currentStep < 3 ? (
         <Button type="button" onClick={nextStep} className="px-8 font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          Suivant
         </Button>
        ) : (
         <Button type="button" onClick={handleSubmit} disabled={!formData.acceptTerms} className="px-8 font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
          Finaliser mon inscription
         </Button>
        )}
       </div>
      </CardContent>
     </Card>
    </motion.div>
   </div>
  </div>
 )
}