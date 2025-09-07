export interface TeacherType {
  id: string;
  name: string;
  surname: string;
  age: number;
  stackId: number;
  regionId: number;
  distirict: string;
  statusId: number;
  experience: string;
  gender: string;
  email: string;
  phone: string;
  isMarried: string;
  study: string;
  createAt: string;
  stack: {
    id: number;
    name: string;
    image: string;
    createAt: string;
  };
  region: {
    id: number;
    name: string;
    createdAt: string;
  };
  status: {
    id: number;
    name: string;
    createdAt: string;
  };
  workCompanies: [
    {
      teacherId: string;
      workCompanyId: number;
      workCompany: {
        id: number;
        name: string;
        createdAt: string;
      };
    }
  ];
  label?: string;
  value?: string;
}
