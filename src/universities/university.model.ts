export interface IUniversities {
  id: string;
  name: string;
  country: string;
  city: string;
  totalCourse: string;
  courses: {
    medical_courses: [
      {
        ug: [{ name: string; duration: string; fee: string }];
      },
      {
        pg: [{ name: string; duration: string; fee: string }];
      },
    ];
    non_medical: [
      {
        ug: [{ name: string; duration: string; fee: string }];
      },
      {
        pg?: [{ name: string; duration: string; fee: string }];
      },
    ];
    language_courses: string[];
  };
  hostel_fee: string;
  medical_insurance: string;
  foreign_students: string;
  notary: boolean;
  documents_required: string[];
}
