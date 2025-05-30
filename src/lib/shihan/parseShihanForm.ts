export const parseShihanForm = async (formData: FormData) => {
  const data: any = {};

  const get = (key: string) => formData.get(key);

  const fields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'place',
    'address',
    'pinCode',
    'clubName',
    'associationName',
    'grade',
    'password',
    'yearsExperience',
  ];

  for (const field of fields) {
    const value = get(field);
    if (value !== null && value !== '') {
      data[field] = value;
    }
  }

  const isAssociationMember = get('isAssociationMember');
  if (isAssociationMember !== null) {
    data.isAssociationMember = isAssociationMember === 'true';
  }

  const idProofFile = formData.get('idProof') as File | null;
  const teachingProofFile = formData.get('teachingProof') as File | null;

  if (idProofFile && idProofFile.size > 0) {
    const idProofBuffer = Buffer.from(await idProofFile.arrayBuffer());
    data.idProof = {
      buffer: idProofBuffer,
      type: idProofFile.type,
    };
  }

  if (teachingProofFile && teachingProofFile.size > 0) {
    const teachingProofBuffer = Buffer.from(await teachingProofFile.arrayBuffer());
    data.teachingProof = {
      buffer: teachingProofBuffer,
      type: teachingProofFile.type,
    };
  }

  return data;
};
