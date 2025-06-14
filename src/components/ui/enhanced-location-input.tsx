import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {MapPin, Loader2} from 'lucide-react'

interface EnhancedLocationInputProps {
 street: string
 city: string
 postalCode: string
 department: string
 onChange: (location: {
  street: string
  city: string
  postalCode: string
  department: string
  coordinates?: {lat: number, lng: number}
 }) => void
}

export function EnhancedLocationInput({street, city, postalCode, department, onChange}: EnhancedLocationInputProps) {
 const [isLocating, setIsLocating] = useState(false)

 const handleGeolocation = () => {
  if (!navigator.geolocation) {
   alert("La géolocalisation n'est pas supportée par ce navigateur")
   return
  }

  setIsLocating(true)

  navigator.geolocation.getCurrentPosition(
   async position => {
    try {
     const {latitude, longitude} = position.coords

     // Utilisation de l'API de géocodage inversé français
     const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)

     if (response.ok) {
      const data = await response.json()
      if (data.features && data.features.length > 0) {
       const feature = data.features[0]
       const properties = feature.properties

       // Extraction des informations d'adresse
       const streetName = properties.name || ''
       const houseNumber = properties.housenumber || ''
       const cityName = properties.city || properties.municipality || ''
       const postal = properties.postcode || ''
       const dept = properties.context ? properties.context.split(',')[0] : ''

       // Construction de l'adresse de la rue
       let streetAddress = ''
       if (houseNumber && streetName) {
        streetAddress = `${houseNumber} ${streetName}`
       } else if (streetName) {
        streetAddress = streetName
       }

       onChange({
        street: streetAddress,
        city: cityName,
        postalCode: postal,
        department: dept,
        coordinates: {lat: latitude, lng: longitude}
       })
      } else {
       // Fallback si pas de résultat
       onChange({
        street: '',
        city: `Position: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        postalCode: '',
        department: '',
        coordinates: {lat: latitude, lng: longitude}
       })
      }
     } else {
      // En cas d'erreur API
      onChange({
       street: '',
       city: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
       postalCode: '',
       department: '',
       coordinates: {lat: latitude, lng: longitude}
      })
     }
    } catch (error) {
     console.error('Erreur géocodage:', error)
     const {latitude, longitude} = position.coords
     onChange({
      street: '',
      city: `Position détectée`,
      postalCode: '',
      department: '',
      coordinates: {lat: latitude, lng: longitude}
     })
    } finally {
     setIsLocating(false)
    }
   },
   error => {
    console.error('Erreur géolocalisation:', error)
    let message = 'Erreur de géolocalisation'

    switch (error.code) {
     case error.PERMISSION_DENIED:
      message = 'Permission de géolocalisation refusée. Autorisez la géolocalisation dans votre navigateur.'
      break
     case error.POSITION_UNAVAILABLE:
      message = 'Position non disponible. Vérifiez votre connexion et réessayez.'
      break
     case error.TIMEOUT:
      message = 'Délai de géolocalisation dépassé. Réessayez ou saisissez manuellement.'
      break
    }

    alert(message)
    setIsLocating(false)
   },
   {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 300000 // 5 minutes
   }
  )
 }

 const handleInputChange = (field: string, value: string) => {
  onChange({
   street,
   city,
   postalCode,
   department,
   [field]: value
  })
 }

 return (
  <div className="space-y-4">
   {/* Bouton de géolocalisation */}
   <div className="flex items-center justify-between">
    <Label className="text-base font-semibold">Adresse *</Label>
    <Button 
     type="button" 
     variant="outline" 
     onClick={handleGeolocation} 
     disabled={isLocating}
     className="flex items-center space-x-2"
    >
     {isLocating ? (
      <Loader2 className="h-4 w-4 animate-spin" />
     ) : (
      <MapPin className="h-4 w-4" />
     )}
     <span>{isLocating ? 'Localisation...' : 'Utiliser ma position'}</span>
    </Button>
   </div>

   {isLocating && (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
     <p className="text-sm text-blue-700">📍 Détection de votre position en cours...</p>
    </div>
   )}

   {/* Champs d'adresse */}
   <div className="grid grid-cols-1 gap-4">
    <div>
     <Label htmlFor="street" className="text-sm font-medium">Numéro et nom de rue</Label>
     <Input
      id="street"
      value={street}
      onChange={e => handleInputChange('street', e.target.value)}
      placeholder="Ex: 15 rue de la République"
      className="mt-1 h-12"
     />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
     <div>
      <Label htmlFor="city" className="text-sm font-medium">Ville *</Label>
      <Input
       id="city"
       value={city}
       onChange={e => handleInputChange('city', e.target.value)}
       placeholder="Paris"
       required
       className="mt-1 h-12"
      />
     </div>

     <div>
      <Label htmlFor="postalCode" className="text-sm font-medium">Code postal *</Label>
      <Input
       id="postalCode"
       value={postalCode}
       onChange={e => handleInputChange('postalCode', e.target.value)}
       placeholder="75001"
       required
       className="mt-1 h-12"
      />
     </div>

     <div>
      <Label htmlFor="department" className="text-sm font-medium">Département</Label>
      <Input
       id="department"
       value={department}
       onChange={e => handleInputChange('department', e.target.value)}
       placeholder="Paris"
       className="mt-1 h-12"
      />
     </div>
    </div>
   </div>

   {(city || postalCode) && (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
     <p className="text-sm text-green-700">
      ✅ Adresse: {street && `${street}, `}{city} {postalCode} {department}
     </p>
    </div>
   )}
  </div>
 )
}