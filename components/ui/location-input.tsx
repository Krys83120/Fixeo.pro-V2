import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {MapPin, Loader2} from 'lucide-react'

interface LocationInputProps {
 value: string
 onChange: (value: string) => void
 placeholder?: string
 className?: string
}

export function LocationInput({value, onChange, placeholder = 'Ville ou code postal', className = ''}: LocationInputProps) {
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
     const response = await fetch(
      `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}&type=municipality`
     )
     
     if (response.ok) {
      const data = await response.json()
      if (data.features && data.features.length > 0) {
       const feature = data.features[0]
       const city = feature.properties.name
       const postcode = feature.properties.postcode
       const context = feature.properties.context
       
       // Format: "Ville (Code postal)" ou "Ville, Département"
       let locationString = city
       if (postcode) {
        locationString = `${city} (${postcode})`
       } else if (context) {
        locationString = `${city}, ${context}`
       }
       
       onChange(locationString)
      } else {
       // Fallback avec coordonnées
       onChange(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`)
      }
     } else {
      // En cas d'erreur API, utiliser les coordonnées
      onChange(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`)
     }
    } catch (error) {
     console.error('Erreur géocodage:', error)
     // Fallback avec coordonnées brutes
     const {latitude, longitude} = position.coords
     onChange(`Position: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
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

 return (
  <div className={`relative ${className}`}>
   <div className="flex space-x-2">
    <div className="relative flex-1">
     <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
     <Input 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder} 
      className="pl-10" 
     />
    </div>
    <Button 
     type="button" 
     variant="outline" 
     onClick={handleGeolocation} 
     disabled={isLocating} 
     className="px-3 flex-shrink-0" 
     title="Utiliser ma position actuelle"
    >
     {isLocating ? (
      <Loader2 className="h-4 w-4 animate-spin" />
     ) : (
      <MapPin className="h-4 w-4" />
     )}
    </Button>
   </div>
   {isLocating && (
    <p className="text-xs text-blue-600 mt-1">
     📍 Détection de votre position en cours...
    </p>
   )}
  </div>
 )
}