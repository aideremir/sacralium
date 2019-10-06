import ServerDate from '/imports/modules/Core/lib/date';

export default class {
  static hasOutstandingRequest(character) {
    return character.combatRequest?.timeout > ServerDate.Date();
  }

  static isCharacterLocked(character) {
    return this.hasOutstandingRequest(character) || !!character.combat?._id;
  }
}
