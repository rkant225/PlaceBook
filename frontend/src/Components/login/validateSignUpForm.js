const validateSignUpForm = (values) => {
    const errors = {}
    const requiredFields = ['name', 'email', 'password', 'confirmPassword'];
  
    const field_label = {
      name: 'Name',  
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    }
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = `${field_label[field]} is required.`
      }
    })
  
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (values.password &&  values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = 'There is mismatch in password.'
    }

    return errors
  };
  
  export default validateSignUpForm;