export const formMixin = {
  data() {
    return {
      errors: []
    };
  },
  methods: {
    validateState(name) {
      if (Array.isArray(this.errors)) {
        for (let error of this.errors) {
          if (error.field === name) {
            return false;
          }
        }
      }
      return null;
    },
    errorMessages(name) {
      if (Array.isArray(this.errors)) {
        for (let error of this.errors) {
          if (error.field === name) {
            return error.messages;
          }
        }
      }
      return [];
    }
  }
};
