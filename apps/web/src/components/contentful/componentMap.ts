import { AssetContentWidget } from './AssetContentWidget';
import { ContentGroupContainer } from './components/ContentGroupContainer';
import { StaticCSS } from './components/StaticCSS';
import { StaticHTML } from './components/StaticHTML';
import { StaticJS } from './components/StaticJS';
import { StaticMessageRibbon } from './components/StaticMessageRibbon';
import { FunctionalWidget } from './FunctionalWidget';

export const componentMap = {
  // FunctionalWidget
  AffirmPayJS: FunctionalWidget,
  // AssetContentWidget
  AssetContent: AssetContentWidget,
  // FunctionalWidget
  CRMOptIn: FunctionalWidget,
  // ContentGroup
  ContentGroupContainer,
  // FunctionalWidget
  FireWorkLiveStream: FunctionalWidget,
  FooterMenu: FunctionalWidget,
  GlobalHeader: FunctionalWidget,
  MessageRibbonRPP: FunctionalWidget,
  NewPLPFilter: FunctionalWidget,
  NewPLPHeader: FunctionalWidget,
  NewProductList: FunctionalWidget,
  RelatedProducts: FunctionalWidget,
  // StaticContentWidget
  StaticCSS,
  StaticHTML,
  StaticJS,
  StaticMessageRibbon,
  // FunctionalWidget
  UsableNetToggler: FunctionalWidget
};
