import {useState, useRef} from 'react'
import {Button} from '@/components/ui/button'
import {Upload, X, Camera} from 'lucide-react'
import {motion} from 'framer-motion'

interface ImageUploadProps {
 value?: string
 onChange: (url: string) => void
 onRemove?: () => void
 className?: string
 placeholder?: string
}

export function ImageUpload({value, onChange, onRemove, className = '', placeholder = 'Ajouter une image'}: ImageUploadProps) {
 const [isUploading, setIsUploading] = useState(false)
 const fileInputRef = useRef<HTMLInputElement>(null)

 const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]
  if (!file) return

  setIsUploading(true)
  
  try {
   // Simulation d'upload - en production, utiliser un service réel
   const reader = new FileReader()
   reader.onload = (e) => {
    const result = e.target?.result as string
    onChange(result)
    setIsUploading(false)
   }
   reader.readAsDataURL(file)
  } catch (error) {
   console.error('Erreur upload:', error)
   setIsUploading(false)
  }
 }

 const handleClick = () => {
  fileInputRef.current?.click()
 }

 const handleRemove = () => {
  onChange('')
  onRemove?.()
  if (fileInputRef.current) {
   fileInputRef.current.value = ''
  }
 }

 if (value) {
  return (
   <div className={`relative group ${className}`}>
    <motion.div 
     className="relative overflow-hidden rounded-lg border-2 border-gray-200"
     whileHover={{ scale: 1.02 }}
     transition={{ duration: 0.2 }}
    >
     <img 
      src={value} 
      alt="Uploaded" 
      className="w-full h-48 object-cover"
     />
     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
       <Button
        size="sm"
        variant="secondary"
        onClick={handleClick}
        className="bg-white/90 hover:bg-white"
       >
        <Camera className="h-4 w-4 mr-1" />
        Changer
       </Button>
       <Button
        size="sm"
        variant="destructive"
        onClick={handleRemove}
        className="bg-red-500/90 hover:bg-red-600"
       >
        <X className="h-4 w-4" />
       </Button>
      </div>
     </div>
    </motion.div>
    <input
     ref={fileInputRef}
     type="file"
     accept="image/*"
     onChange={handleFileSelect}
     className="hidden"
    />
   </div>
  )
 }

 return (
  <div className={className}>
   <motion.div
    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
    onClick={handleClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
   >
    {isUploading ? (
     <div className="flex flex-col items-center">
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm text-gray-600">Upload en cours...</p>
     </div>
    ) : (
     <div className="flex flex-col items-center">
      <Upload className="h-10 w-10 text-gray-400 mb-3" />
      <p className="text-base font-medium text-gray-700 mb-1">{placeholder}</p>
      <p className="text-sm text-gray-500">PNG, JPG jusqu'à 5MB</p>
     </div>
    )}
   </motion.div>
   <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFileSelect}
    className="hidden"
   />
  </div>
 )
}