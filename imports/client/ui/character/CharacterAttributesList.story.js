import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import CharacterAttributesList from './CharacterAttributesList';
import AttributeTypes from '/imports/content/Attribute';
import LayoutFrame from '/imports/client/ui/layouts/LayoutFrame';

storiesOf('Персонаж', module)
  .addDecorator(withReadme(CharacterAttributesList.__docs))
  .add('Характеристики персонажа (CharacterAttributesList)', () => ({
    components: { CharacterAttributesList, LayoutFrame },
    template: `
      <div
        class="sb-page sb-page_withPaddings"
        style="
          height: auto;
          padding-bottom: 50px;
        "
      >
        <h2 class="sb-head">
          Характеристики персонажа
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Изменяемые
          </h3>          
          <LayoutFrame>
            <CharacterAttributesList
              :attributes="attributes"
              :attributeTypes="attributeTypes"
              :freeAttributePoints="freeAttributePoints"
              changeable
              @change="changeAttributePoints"
            />
          </LayoutFrame>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Неизменяемые
          </h3>          
          <LayoutFrame>
            <CharacterAttributesList
              :attributes="attributes"
              :attributeTypes="attributeTypes"
            />
          </LayoutFrame>
        </div>
      </div>
    `,
    data: () => (
      {
        attributeTypes: AttributeTypes,
        freeAttributePoints: 5,
        attributes: {
          'Attribute/Primary/Dexterity': 3,
          'Attribute/Primary/Endurance': 3,
          'Attribute/Primary/Intuition': 3,
          'Attribute/Primary/Strength': 3,
        },
      }
    ),
    computed: {
      overallAttributePoints () {
        return Object.values(this.attributes).reduce((sum, value) => sum + value, 0);
      },
    },
    methods: {
      changeAttributePoints (data) {
        const prevAttributePointsSum = this.overallAttributePoints;
        this.attributes = { ...this.attributes, ...data };
        this.freeAttributePoints += prevAttributePointsSum - this.overallAttributePoints;
      },
    },
  }));
