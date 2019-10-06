import _ from 'lodash';

export default {
  validatorOptionalize(constraints) {
    return _.mapValues(constraints, (value) => {
      const result = _.cloneDeep(value);
      delete result.presence;
      return result;
    });
  },
  hasProperties(obj, props = []) {
    return props.every(prop => Object.prototype.hasOwnProperty.call(obj, prop));
  },
  displayError(head, text) {
    this.$root.$emit(
      'showModal',
      {
        head,
        text,
      },
    );
  },
  formatNumberWithISO(num) {
    // TODO: Добавить лимиты. На текущий момент лимит фиксирован - 4 символа
    const isoObj = {
      1E0: '',
      1E3: 'K',
      1E6: 'M',
      1E9: 'G',
      1E12: 'T',
      1E15: 'P',
      1E18: 'E',
      1E21: 'Z',
      1E24: 'Y',
    };

    let currentIso = 1;

    Object.keys(isoObj).forEach((key) => {
      if (num >= key) {
        currentIso = key;
      }
    });

    return (num / currentIso).toFixed() + isoObj[currentIso];
  },
};
