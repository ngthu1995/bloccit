const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
  new() {
    return this.user != null || this._isAdmin();
  }

  create() {
    return this.user != null || this._isAdmin();
  }

  edit() {
    return (
      this.user != null && this.record && (this._isOwner() || this._isAdmin())
    );
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
};
