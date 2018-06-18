import { initializeApp } from 'firebase'

export const app = initializeApp({
  apiKey: '{{placeholder}}',
  databaseURL: '{{placeholder}}',
  projectId: '{{placeholder}}'

})

export const connection = app.database()
export const plants = connection.ref('plants');
export const sellers = connection.ref('sellers');
