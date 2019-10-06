export default {
  id: 'Attribute/Weight',
  title: 'Грузоподъёмность',
  calculate(sourceAttributes) {
    return sourceAttributes['Attribute/Primary/Endurance'] * 3;
  },
};
