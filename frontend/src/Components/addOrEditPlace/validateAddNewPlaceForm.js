
const validateAddNewPlaceForm = (values) => {
    const errors = {}
    const requiredFields = ['title', 'address', 'description'];
  
    const field_label = {
        title: 'Title',
        address: 'Address',
        description : 'Description'
    }
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = `${field_label[field]} is required.`
      }
    })
  
    if (values.description && values.description.length < 10) {
      errors.description = 'Please enter at least 10 character.'
    }

    return errors
  };
  
  export default validateAddNewPlaceForm;