<template lang="pug">
.ItemContainer
  .ItemContainer__categories.no-swipe
    FrameComponent.Frame_noSideBorders
      .ItemContainer__categoriesBox
        .ItemContainer__backButton(
          v-if="category"
          @click="reset"
        )
        transition(name="fade" mode="out-in")
          ItemCategories.ItemContainer__animated(
            v-if="!category"
            key="categories"
            :categories="categories"
            :selectedCategory="category"
            @select="selectCategory"
            @reset="reset"
          )
          ItemCategories.ItemContainer__animated(
            v-else
            key="subCategories"
            :categories="subCategories"
            :selectedCategory="subCategory"
            @select="selectSubCategory"
            @reset="selectSubCategory('')"
          )
  .ItemContainer__items
    ItemFilter(
      v-if="!isInventoryMode"
      :characterLevel="character.calculated['Attribute/Level']"
      v-model="filter"
    )
    Items(
      :items="itemList"
      :mode="mode"
      @select="selectItem"
    )
  BasePopup(v-if="selectedItem" @close="selectItem(null)")
    ItemDetails(
      :item="selectedItem"
      :character="character"
      :isOwned="isInventoryMode"
      @buy="buyItem"
      @scrap="scrapItem"
      @equip="equipItem"
    )
</template>

<script>
import { Meteor } from 'meteor/meteor';
import helpers from '/imports/client/ui/helpers/meteor';
import _ from 'lodash';

import FrameComponent from '/imports/client/ui/layouts/LayoutFrame';
import LayoutWrapper from '/imports/client/ui/layouts/LayoutWrapper';
import ItemCategories from '/imports/client/ui/inventory/ItemCategories';
import Items from '/imports/client/ui/inventory/Items';
import ItemDetails from '/imports/client/ui/inventory/ItemDetails';
import BasePopup from '/imports/client/ui/components/BasePopup';

import ItemList from '/imports/content/Item';
import InventoryCollection from '/imports/modules/Inventory/lib/collection';
import CharacterManager from '/imports/modules/Character/lib/Manager';
import ItemFilter from '/imports/client/ui/inventory/ItemFilter.vue';

export default {
  name: 'ItemContainer',
  components: {
    ItemFilter,
    FrameComponent,
    BasePopup,
    ItemCategories,
    LayoutWrapper,
    Items,
    ItemDetails,
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'shop',
      validator (value) {
        return ['shop', 'inventory'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      category: '',
      subCategory: '',
      selectedItem: null,
      filter: {
        level: '',
        element: '',
      },
    };
  },
  mounted() {
    this.filter.level = this.character.level;
  },
  computed: {
    categories() {
      return _.uniq(Object.keys(ItemList).map((itemId) => {
        const parts = itemId.split('/');
        return `${parts[0]}/${parts[1]}`;
      }));
    },
    subCategories() {
      if (!this.category) {
        return [];
      }

      return _.uniq(Object.keys(ItemList).filter(itemId => itemId.startsWith(this.category))
        .map((itemId) => {
          const parts = itemId.split('/');
          return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }));
    },
    itemList() {
      const category = this.subCategory || this.category;
      let itemsCollection = Object.values(ItemList);

      if (this.isInventoryMode) {
        itemsCollection = itemsCollection
          .filter(item => !this.equipmentTypeIds.includes(item.id)
            && this.inventoryItemIds.includes(item.id));
      }

      if (this.filter.element) {
        itemsCollection = itemsCollection.filter(item => item.element === this.filter.element);
      }

      if (this.filter.level !== '') {
        itemsCollection = itemsCollection.filter(item => item.level === this.filter.level);
      }

      if (!category) {
        return itemsCollection;
      }

      return itemsCollection.filter(item => item.id.startsWith(category));
    },
    isInventoryMode() {
      return this.mode === 'inventory';
    },
    equipmentTypeIds() {
      return Object.values(this.character.equipment || {}).map(({ typeId }) => typeId);
    },
  },
  meteor: {
    $subscribe: {
      inventory: [],
    },
    inventoryItemIds () {
      return InventoryCollection.find({}).map(item => item.typeId);
    },
    character() {
      return Object.assign(
        {
          calculated: CharacterManager.getAttributesDetailed(this.currentUser).total,
        },
        Meteor.user()?.character,
      );
    },
  },
  methods: {
    selectCategory(category) {
      this.category = category;
    },
    selectSubCategory(subCategory) {
      this.subCategory = subCategory;
    },
    reset() {
      this.category = '';
      this.subCategory = '';
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    async buyItem(item) {
      this.selectItem(null);
      try {
        await helpers.meteorCallPromise('Inventory.buyItem', item.id);
        this.showModal('Успех', `Вещь «${item.title}» куплена`);
      } catch (error) {
        this.showModal('Ошибка покупки', error.message);
      }
    },
    async scrapItem(item) {
      this.selectItem(null);
      try {
        await helpers.meteorCallPromise('Inventory.scrapItem', InventoryCollection.findOne({ typeId: item.id })._id);
        this.showModal('Успех', `Вещь «${item.title}» выброшена`);
      } catch (error) {
        this.showModal('Ошибка выбрасывания', error.message);
      }
    },
    async equipItem(item) {
      this.selectItem(null);
      try {
        await helpers.meteorCallPromise('Inventory.equipItem', InventoryCollection.findOne({ typeId: item.id })._id);
        this.showModal('Успех', `Вещь «${item.title}» надета`);
      } catch (error) {
        this.showModal('Ошибка надевания', error.message);
      }
    },
    showModal(head, text) {
      this.$root.$emit(
        'showModal',
        {
          head,
          text,
        },
      );
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'
@require '~imports/client/ui/styles/mixins/all'

fadingBlockbg()
  background linear-gradient(270deg, #D0D0D0 0%, rgba(234, 234, 234, 0) 100%)

.ItemContainer
  display flex
  flex-direction column
  height 100%

  &__animated
    &.fade-enter-active, &.fade-leave-active
      transition all .2s
    &.fade-enter, &.fade-leave-to
      transform translateY(100%)

  &__categoriesBox
    position relative
    overflow hidden
    background-color $color_background
    background-image url('/images/layouts/layouts__contentBG_bottom.png')
    background-position 50% 100%
    background-repeat repeat-x
    &:before, &:after
      content ''
      position absolute
      top 0
      height 100%
      width 60px
      pointer-events none
      z-index 9
    &:before
      left 0
      fadingBlockbg()
      transform rotate(-180deg)
    &:after
      right 0
      fadingBlockbg()

  &__backButton
    position absolute
    top 50%
    left 10px
    width 44px
    height 32px
    transform translateY(-50%)
    background url(/images/ui/btnBack.png) 50% no-repeat
    box-shadow 0 4px 4px rgba(0, 0, 0, 0.25)
    z-index 20

    @media screen and (min-width: 800px)
      cursor pointer

  &__items
    flex-basis 100%
    height 100%
    overflow-x hidden
    overflow-y auto
    overflow-scrolling touch
    scroll-bar()
</style>
