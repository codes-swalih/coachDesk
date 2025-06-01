export const parseSensaiForm = async (formData: FormData) => {
  const data: any = {};

  const get = (key: string) => formData.get(key);

  const fields = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'placeCity',
    'address',
    'grade',
    'dojos',
    'trainingExperience',
    'password',
  ];

  for (const field of fields) {
    const value = get(field);
    if (value !== null && value !== '') {
      // Convert trainingExperience to number
      if (field === 'trainingExperience') {
        data[field] = Number(value);
      } else {
        data[field] = value;
      }
    }
  }

  // Handle boolean field
  const isCertifiedToTeach = get('isCertifiedToTeach');
  if (isCertifiedToTeach !== null) {
    data.isCertifiedToTeach = isCertifiedToTeach === 'true';
  }

  // Handle file uploads
  const profilePhotoFile = formData.get('profilePhoto') as File | null;
  const idProofFile = formData.get('idProof') as File | null;

  if (profilePhotoFile && profilePhotoFile.size > 0) {
    const profilePhotoBuffer = Buffer.from(await profilePhotoFile.arrayBuffer());
    data.profilePhoto = {
      buffer: profilePhotoBuffer,
      type: profilePhotoFile.type,
    };
  }

  if (idProofFile && idProofFile.size > 0) {
    const idProofBuffer = Buffer.from(await idProofFile.arrayBuffer());
    data.idProof = {
      buffer: idProofBuffer,
      type: idProofFile.type,
    };
  }

  return data;
};
