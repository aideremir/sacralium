export default {
  id: 'Attribute/Health',
  title: 'Здоровье',
  calculate(sourceAttributes) {
    return sourceAttributes['Attribute/Primary/Endurance'] * 6;
  },
};
