import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';

export const itemAnim = trigger(
  'item',
  [
    state('out', style({'border-left-width': '3px'})),
    state('in', style({'border-left-width': '8px'})),
    transition('in => out', animate('100ms ease-in')),
    transition('out => in', animate('100ms ease-out')),
  ]);
