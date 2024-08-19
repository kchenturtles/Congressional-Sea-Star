  
  declare global {
    declare namespace Data {
      type Role = 'admin' | 'reviewer' | 'instructor' | 'student'
  
      type Token<T extends 'client' | 'server' | 'pojo'> = {
        role: Role
        expires: T extends 'client'
        ? ClientTimestamp
        : T extends 'server'
        ? ServerTimestamp
        : Date
        consumable: boolean
        consumers: Array<string>
      }
  
      namespace User {
        type Peek = {
          uid: string
          email: string
          emailVerified: boolean
          role: Role
        }
        type Profile = {
          firstName: string
          lastName: string
          id: string
          role: Role
        }
        type Store = {
          object: ClientUser
          profile: Profile
        }
      }
      
      type Quest = {
        id: string
        name: string
        description: string
        circles: Array<Circle>
        ownerId: string
        completion: boolean
      }

      type QuestTemplate = {
        id: string
        name: string
        description: string
        circles: Array<Circle>
        ownerId: string
      }

      type Circle = {
        id: string
        name: string
        content: string
        questId: string
        completed: boolean
      }

      type Collection = {
        id: string
        open: boolean
        name: string
        description: string
        ownerId: string
        quests: Array<Quest>
      }

    }
  }
  