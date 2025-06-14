import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Phone, MessageCircle, X, Send, User} from 'lucide-react'
import {motion, AnimatePresence} from 'framer-motion'
import {useUser} from '@/contexts/UserContext'

interface ContactModalProps {
 type: 'call' | 'message'
 isOpen: boolean
 onClose: () => void
 professional: any
}

export function ContactModal({type, isOpen, onClose, professional}: ContactModalProps) {
 const {currentUser} = useUser()
 const [message, setMessage] = useState('')
 const [isSending, setIsSending] = useState(false)

 const handleCall = () => {
  window.location.href = `tel:${professional.phone}`
  onClose()
 }

 const handleSendMessage = async () => {
  if (!message.trim()) {
   alert('Veuillez saisir un message')
   return
  }

  if (!currentUser) {
   alert('Vous devez être connecté pour envoyer un message')
   return
  }

  setIsSending(true)

  // Simulation d'envoi de message
  setTimeout(() => {
   alert(`✅ Message envoyé à ${professional.businessName || 'le réparateur'} !

📧 Votre message a été transmis avec succès.

De: ${currentUser.firstName} ${currentUser.lastName} (${currentUser.email})
À: ${professional.businessName || 'Réparateur professionnel'}

Le professionnel recevra une notification et vous répondra directement sur la plateforme.`)

   setMessage('')
   setIsSending(false)
   onClose()
  }, 2000)
 }

 if (!isOpen) return null

 return (
  <AnimatePresence>
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.9}} transition={{duration: 0.3}} className="w-full max-w-md">
     <Card className="bg-white shadow-2xl" translate="no">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
       <div className="flex items-center justify-between">
        <CardTitle className="flex items-center">
         {type === 'call' ? <Phone className="h-5 w-5 mr-2 text-blue-600" /> : <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />}
         <span translate="yes">{type === 'call' ? 'Appeler le réparateur' : 'Contacter le réparateur'}</span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
         <X className="h-4 w-4" />
        </Button>
       </div>
      </CardHeader>

      <CardContent className="p-6">
       {/* Professional Info */}
       <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        {professional.profilePhoto ? (
         <img src={professional.profilePhoto} alt={professional.businessName} className="w-12 h-12 rounded-lg object-cover" />
        ) : (
         <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <User className="h-6 w-6 text-blue-600" />
         </div>
        )}
        <div className="flex-1">
         <h3 className="font-semibold text-gray-900" translate="yes">{professional.businessName || 'Réparateur professionnel'}</h3>
         <p className="text-sm text-gray-600" translate="no">
          {professional.address.city}, {professional.address.postalCode}
         </p>
         <div className="flex gap-2 mt-1">
          {professional.categories?.slice(0, 2).map((category, idx) => (
           <Badge key={idx} variant="outline" className="text-xs" translate="yes">
            {category}
           </Badge>
          ))}
         </div>
        </div>
       </div>

       {type === 'call' ? (
        // Call Modal Content
        <div className="space-y-4">
         <div className="text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
           <p className="text-sm text-blue-800 mb-2" translate="yes">Numéro de téléphone :</p>
           <p className="text-2xl font-bold text-blue-900" translate="no">{professional.phone}</p>
          </div>
          <p className="text-gray-600 text-sm mb-4" translate="yes">Cliquez sur le bouton ci-dessous pour lancer l'appel directement depuis votre téléphone.</p>
         </div>

         <div className="flex gap-3">
          <Button onClick={handleCall} className="flex-1 bg-green-600 hover:bg-green-700" translate="no">
           <Phone className="h-4 w-4 mr-2" />
           <span translate="yes">Lancer l'appel</span>
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1" translate="no">
           <span translate="yes">Annuler</span>
          </Button>
         </div>
        </div>
       ) : (
        // Message Modal Content
        <div className="space-y-4">
         {!currentUser ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
           <p className="text-yellow-800 text-sm" translate="yes">Vous devez être connecté pour envoyer un message.</p>
           <Button className="mt-2" onClick={() => (window.location.href = '/signup')} translate="no">
            <span translate="yes">Se connecter / S'inscrire</span>
           </Button>
          </div>
         ) : (
          <>
           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800" translate="yes">
             <strong>Messagerie sécurisée</strong> - Votre message sera envoyé directement au réparateur via notre plateforme.
            </p>
           </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" translate="yes">Votre message :</label>
            <Textarea 
             value={message} 
             onChange={e => setMessage(e.target.value)} 
             placeholder="Bonjour, j'aurais besoin de vos services pour..." 
             rows={4} 
             className="w-full" 
             translate="yes"
            />
           </div>

           <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            <p translate="yes">
             <strong>Expéditeur :</strong> <span translate="no">{currentUser.firstName} {currentUser.lastName}</span>
            </p>
            <p translate="yes">
             <strong>Email :</strong> <span translate="no">{currentUser.email}</span>
            </p>
            <p translate="yes">
             <strong>Téléphone :</strong> <span translate="no">{currentUser.phone}</span>
            </p>
           </div>

           <div className="flex gap-3">
            <Button onClick={handleSendMessage} disabled={!message.trim() || isSending} className="flex-1 bg-blue-600 hover:bg-blue-700" translate="no">
             {isSending ? (
              <>
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
               <span translate="yes">Envoi...</span>
              </>
             ) : (
              <>
               <Send className="h-4 w-4 mr-2" />
               <span translate="yes">Envoyer le message</span>
              </>
             )}
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1" translate="no">
             <span translate="yes">Annuler</span>
            </Button>
           </div>
          </>
         )}
        </div>
       )}
      </CardContent>
     </Card>
    </motion.div>
   </div>
  </AnimatePresence>
 )
}