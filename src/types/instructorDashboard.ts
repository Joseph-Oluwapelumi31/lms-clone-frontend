export type Instructor = {
  _id: string;
  name: string;
  email: string;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  code: string;
  instructor: Instructor;
  thumbnail: {
    url: string;
    public_id: string;
  };
  isPublished: boolean;
  students: Student[];
  lessons: Lesson[];
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
    media?: {
      url: string;
      public_id: string;
    };
    mediaUrl?: string;
    duration?: number;
    order: number;
    course: string;
    createdAt: Date;
    updatedAt: Date
}

