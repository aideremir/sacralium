<template lang="pug">
LayoutWrapper
  .PageProfile
    .PageProfile__content
      BaseTabs(
        mobile
        v-model="activeTab"
        class="PageProfile__tabs"
      )
        BaseTab(
          name="Персонаж"
          class="PageProfile__character"
        )
          CharacterLook(
            :character="character"
            @selectItem="selectItem"
          )
        BaseTab(
          name="Характеристики"
          class="PageProfile__attributes"
        )
          .PageProfile__attributesContainer
            FrameComponent
              CharacterAttributesList(
                :attributes="character.attributesPrimary"
                :distributedAttributes="character.distributedAttributes"
                :attributeTypes="attributeTypes"
                :freeAttributePoints="character.freeAttributePoints"
                changeable
                @change="setAttributePoints"
              )
            FrameComponent
              CharacterAttributesList(
                :attributes="character.attributesSecondary"
                :attributeTypes="attributeTypes"
              )
        BaseTab(
          name="Инвентарь"
          class="PageProfile__inventory"
        )
          ItemContainer(mode="inventory")
  BasePopup(
    v-if="selectedItem"
    @close="selectItem(null)"
  )
    ItemDetails(
      :item="selectedItem"
      :character="character"
      isOwned
      isEquipped
      @unequip="unequipItem"
    )
</template>

<script>
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import helpers from '/imports/client/ui/helpers/meteor';
import commonHelpers from '/imports/client/ui/helpers/common';
import CharacterManager from '/imports/modules/Character/lib/Manager';
import LayoutWrapper from '/imports/client/ui/layouts/LayoutWrapper';
import CharacterAttributesList from '/imports/client/ui/character/CharacterAttributesList';
import AttributeTypes from '/imports/content/Attribute';
import AttributesSecondary from '/imports/content/Attribute/Secondary';
import CharacterLook from '/imports/client/ui/character/CharacterLook';
import BaseTabs from '/imports/client/ui/components/BaseTabs';
import BaseTab from '/imports/client/ui/components/BaseTab';
import ItemContainer from '/imports/client/ui/layouts/ItemContainer';
import ItemDetails from '/imports/client/ui/inventory/ItemDetails';
import BasePopup from '/imports/client/ui/components/BasePopup';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame';

import ItemList from '/imports/content/Item';

const { displayError } = commonHelpers;

export default {
  name: 'PageProfile',
  components: {
    ItemContainer,
    BaseTab,
    BaseTabs,
    CharacterLook,
    CharacterAttributesList,
    LayoutWrapper,
    BasePopup,
    ItemDetails,
    FrameComponent,
  },
  data: () => ({
    selected: null,
    activeTab: 0,
  }),
  meteor: {
    character () {
      const user = Meteor.user();
      const attributeDetails = CharacterManager.getAttributesDetailed(user);
      return {
        ...user?.character || {},
        attributesPrimary: attributeDetails.primaryBaseWithEquipment,
        // TODO Отображать не только total, а и остальные срезы
        attributesSecondary: _.pick(attributeDetails.total, [
          'Attribute/Damage',
          ...Object.keys(AttributesSecondary),
        ]),
        calculated: attributeDetails.total,
        freeAttributePoints: CharacterManager.getFreeAttributePoints(),
      };
    },
  },
  computed: {
    selectedItem () {
      const { equipment } = this.character;

      if (!equipment) {
        return null;
      }

      const itemId = equipment[this.selected]?.typeId;
      return Object.values(ItemList).find(({ id }) => id === itemId) || null;
    },
  },
  created () {
    this.attributeTypes = AttributeTypes;
  },
  methods: {
    async setAttributePoints (attributePoints) {
      try {
        await helpers.meteorCallPromise('Character.setAttributes', attributePoints);
      } catch (e) {
        displayError.call(this, 'Не удалось изменить атрибуты', e.error);
      }
    },
    selectItem(item) {
      this.selected = item;
    },
    async unequipItem () {
      try {
        await helpers.meteorCallPromise('Inventory.unequipItem', this.selected);
      } catch (e) {
        displayError.call(this, 'Вы не смогли снять предмет', e.error);
      }
    },
  },
};
</script>

<style lang="stylus">
$inventoryWidth = (360px + 280px + 40px)

.PageProfile
  display block
  height 100%
  min-height 100%
  box-sizing border-box

  &__content
    display flex
    flex-direction column
    padding 25px 2px
    margin auto
    height 100%
    box-sizing border-box

    @media screen and (min-width: 1000px)
      flex-direction row
      max-width 100%

  &__tabs
    height 100%

    @media screen and (min-width: 1000px)
      width 100%

  &__attributes
    margin 0 auto

  &__attributesContainer
    max-width 360px
    margin 0 auto

  &__inventory
    @media screen and (min-width: 1000px)
      width "calc(100% - %s)" % $inventoryWidth
</style>
