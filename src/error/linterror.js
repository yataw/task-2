
class LintError {
    constructor({code, error, location}) {
        this.code = code;
        this.error = error;
        this.location = location;
    }
}

export default LintError;