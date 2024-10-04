import { NewPLPHeader } from '@/components/business';
import { NewPLPFilter } from '@/components/contentful/components/NewPLPFilter';
import { Products } from '@/components/plp';

import { AssetContentWidget } from './AssetContentWidget';
import { ContentGroupContainer } from './components/ContentGroupContainer';
import { GlobalHeader } from './components/GlobalHeader';
import { StaticCSS } from './components/StaticCSS';
import { StaticHTML } from './components/StaticHTML';
import { StaticJS } from './components/StaticJS';
// import { StaticMessageRibbon } from './components/StaticMessageRibbon';
import { FunctionalWidget } from './FunctionalWidget';

export const componentMap = {
  // FunctionalWidget
  // AffirmPayJS: FunctionalWidget,
  // AssetContentWidget
  AssetContent: AssetContentWidget,
  // FunctionalWidget
  // CRMOptIn: FunctionalWidget,
  // ContentGroup
  ContentGroupContainer,
  // FunctionalWidget
  FireWorkLiveStream: FunctionalWidget,
  FooterMenu: FunctionalWidget,
  GlobalHeader: GlobalHeader,
  // MessageRibbonRPP: FunctionalWidget,
  NewPLPFilter,
  NewPLPHeader,
  NewPLPSearchHeader: FunctionalWidget,
  NewProductList: Products,
  RelatedProducts: FunctionalWidget,
  // StaticContentWidget
  StaticCSS,
  StaticHTML,
  StaticJS
  // StaticMessageRibbon,
  // FunctionalWidget
  // UsableNetToggler: FunctionalWidget
};
