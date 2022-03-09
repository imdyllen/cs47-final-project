export interface Child {
  id: string;
  name: string;
  gender: "boy" | "girl" | "other";
  photo: string | null;
  birthday: Date | string;
}
export interface Parent {
  id: string;
  name: string;
  photo: string | null;
  expert: false;
  gender: "female" | "male" | "other";
  children: Child[];
}
export interface Expert {
  id: string;
  name: string;
  photo: string | null;
  expert: true;
  description: string;
}
export type User = Parent | Expert;
export interface Profile {
  user: Parent | Child;
  role: string;
  spouse?: Profile | null;
  children?: Profile[];
}

export interface Reply {
  id: string;
  author: User;
  content: string;
  image: string | null;
  likeCount: number;
  likers: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
export interface Post {
  id: string;
  title: string;
  author: User;
  content: string;
  image: string | null;
  likeCount: number;
  likers: string[];
  replies: Reply[];
  topics: string[];
  anonymous: boolean;
  expertsOnly: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Question {
  question: string;
  source: string;
  choices: {
    content: string;
    explanation: string;
  }[];
  answerIndex: number;
}
export interface Practice {
  id: string;
  topic: string;
  description: string;
  source: string;
  questions: Question[];
}

export interface Agreement {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  people: [Profile, Profile];
  createdAt: Date | string;
  updatedAt: Date | string;
}
