module.exports = VALIDATION_CHECK = Object.freeze({
  isEmail: {
    isEmail: {
      bail: true,
    },
  },

  isFullName: {
    exists: {
      errorMessage: "FullName is required",
      bail: true
    },
    isLength: {
      errorMessage: 'FullName should be at least 5 chars long',
      options: {min: 5},
    },
  },

  isContact: {
    custom: {
      options: (value, {req, location, path}) => {
        if (!value.match(
            /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/
        )) {
          throw new Error("Invalid Contact Number");
        }
        return value
      },
    },
  },

  isPassword: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: {min: 7},
    },
    bail: true
  },

  isRequired: {
    custom: {
      options: (value, {req, location, path}) => {
        if (!value) {
          throw new Error(path + " is required!");
        }
        return value
      },
    },
    bail: true
  },

  isArray: {
    custom: {
      options: (value, {req, location, path}) => {
        if (!value) {
          throw new Error(path + " is required!");
        }
        if (!Array.isArray(value)) {
          throw new Error(path + " must be an array!");
        }
        if (!value.length > 0) {
          throw new Error(path + " is empty!");
        }
        return value
      },
    },
    bail: true
  },

  isValidDate: {
    isDate: {bail: true}
  }
})