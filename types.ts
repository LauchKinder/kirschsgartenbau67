export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}