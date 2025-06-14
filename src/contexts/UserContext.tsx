import {createContext, useContext, useState, ReactNode} from 'react'

export interface User {
 id: string
 firstName: string
 lastName: string
 email: string
 phone: string
 userType: 'client' | 'professional'
 profilePhoto?: string
 address: {
  street: string
  city: string
  postalCode: string
  department: string
  coordinates?: {lat: number, lng: number}
 }
 businessName?: string
 categories?: string[]
 description?: string
 isVerified: boolean
 joinedDate: string
 rating?: number
 reviewCount?: number
 completedJobs?: number
}

interface UserContextType {
 users: User[]
 currentUser: User | null
 addUser: (user: Omit<User, 'id' | 'joinedDate' | 'isVerified'>) => void
 loginUser: (email: string, password: string) => User | null
 logoutUser: () => void
 setCurrentUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({children}: {children: ReactNode}) {
 const [users, setUsers] = useState<User[]>([
  // Utilisateurs exemple existants
  {
   id: '1',
   firstName: 'Marc',
   lastName: 'Dubois',
   email: 'marc.dubois@gmail.com',
   phone: '06 12 34 56 78',
   userType: 'professional',
   profilePhoto: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=150&h=150&fit=crop&crop=face',
   address: {
    street: '15 rue de la République',
    city: 'Paris',
    postalCode: '75011',
    department: 'Paris'
   },
   businessName: 'TechRepar Pro',
   categories: ['Téléphones'],
   description: 'Spécialiste iPhone et Android. Réparation écran, batterie, caméra.',
   isVerified: true,
   joinedDate: '2023-01-15',
   rating: 4.8,
   reviewCount: 156,
   completedJobs: 247
  },
  {
   id: '2',
   firstName: 'Sarah',
   lastName: 'Martin',
   email: 'sarah.martin@gmail.com',
   phone: '06 23 45 67 89',
   userType: 'professional',
   profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=150&h=150&fit=crop&crop=face',
   address: {
    street: '8 avenue Jean Jaurès',
    city: 'Lyon',
    postalCode: '69006',
    department: 'Rhône'
   },
   businessName: 'FixIT Express',
   categories: ['Ordinateurs'],
   description: 'Réparation PC et Mac à domicile. Virus, écran, clavier.',
   isVerified: true,
   joinedDate: '2023-03-22',
   rating: 4.9,
   reviewCount: 203,
   completedJobs: 189
  },
  {
   id: '3',
   firstName: 'Marie',
   lastName: 'Leclerc',
   email: 'marie.leclerc@gmail.com',
   phone: '06 34 56 78 90',
   userType: 'client',
   address: {
    street: '25 boulevard des Batignolles',
    city: 'Paris',
    postalCode: '75017',
    department: 'Paris'
   },
   isVerified: true,
   joinedDate: '2024-01-10'
  }
 ])
 
 const [currentUser, setCurrentUser] = useState<User | null>(null)

 const addUser = (userData: Omit<User, 'id' | 'joinedDate' | 'isVerified'>) => {
  const newUser: User = {
   ...userData,
   id: Date.now().toString(),
   joinedDate: new Date().toISOString().split('T')[0],
   isVerified: true, // Auto-validation
   ...(userData.userType === 'professional' ? {
    rating: 5.0,
    reviewCount: 0,
    completedJobs: 0
   } : {})
  }
  
  setUsers(prev => [...prev, newUser])
  setCurrentUser(newUser)
  return newUser
 }

 const loginUser = (email: string, password: string) => {
  // Simulation de login - en production, vérifier le mot de passe
  const user = users.find(u => u.email === email)
  if (user) {
   setCurrentUser(user)
   return user
  }
  return null
 }

 const logoutUser = () => {
  setCurrentUser(null)
 }

 return (
  <UserContext.Provider value={{
   users,
   currentUser,
   addUser,
   loginUser,
   logoutUser,
   setCurrentUser
  }}>
   {children}
  </UserContext.Provider>
 )
}

export function useUser() {
 const context = useContext(UserContext)
 if (context === undefined) {
  throw new Error('useUser must be used within a UserProvider')
 }
 return context
}