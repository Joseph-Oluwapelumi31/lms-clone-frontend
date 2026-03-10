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
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Student = {
  _id: string;
  name: string;
  email: string;
};

