export type Instructor = {
  _id: string;
  name: string;
  email: string;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  instructor: Instructor;
  isPublished: boolean;
  students: Student[];
  lessons: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Student = {
  _id: string;
  name: string;
  email: string;
};

export type Lesson = {
    _id: string;
    title: string;
    type: 'text' | 'video' | 'image' | 'pdf';
    content?: string;
    mediaUrl?: string;
    thumbnailUrl?: string;
    duration?: number;
    order: number;
    course: string;
    createdAt: Date;
    updatedAt: Date
}

