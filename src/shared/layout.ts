import ComponentsData from '../data/ui.json';

export type ComponentName = keyof typeof ComponentsData;

type TitleComponent = {
  title: string;
};
function isTitleComponent(c: object): c is TitleComponent {
  return 'title' in c;
}
function initTitleComponent(c: TitleComponent) {
  const el = document.createElement('p');
  el.innerText = c.title;
  return el;
}

type GridComponent = {
  layout: 'grid-v' | 'grid-h';
  contents: Component[];
};
function isGridComponent(c: object): c is GridComponent {
  return 'layout' in c && 'contents' in c && Array.isArray(c.contents);
}
function initGridComponent(c: GridComponent) {
  const el = document.createElement('div');
  el.classList.add(c.layout);
  c.contents.forEach((inner) => {
    el.appendChild(initComponent(inner));
  });
  return el;
}

type SetterComponent = {
  setView: string;
  setComponent: ComponentName;
};
function isSetterComponent(c: object): c is SetterComponent {
  return 'setView' in c && 'setComponent' in c;
}
function initSetterComponent(c: SetterComponent) {
  const el = document.createElement('button');
  el.innerText = `${c.setView}>${c.setComponent}`;
  el.addEventListener('click', () => {
    const viewEl = document.querySelector(`[data-view="${c.setView}"]`);
    viewEl.innerHTML = '';
    viewEl.appendChild(initView(c.setComponent));
  });
  return el;
}

type SettableGridComponent = {
  view: string;
  defaultView?: ComponentName;
} & GridComponent;
function isSettableGridComponent(c: object): c is SettableGridComponent {
  return 'view' in c && isGridComponent(c);
}
function initSettableGridComponent(c: SettableGridComponent) {
  const el = initGridComponent(c);
  el.dataset.view = c.view;
  if (c.defaultView && c.contents.length === 0) {
    el.appendChild(initView(c.defaultView));
  }
  return el;
}

type Component =
  TitleComponent | GridComponent | SetterComponent | SettableGridComponent;

export function initComponent(component: Component): HTMLElement {
  if (isTitleComponent(component)) {
    return initTitleComponent(component);
  } else if (isSetterComponent(component)) {
    return initSetterComponent(component);
  } else if (isSettableGridComponent(component)) {
    return initSettableGridComponent(component);
  } else if (isGridComponent(component)) {
    return initGridComponent(component);
  }
  const el = document.createElement('span');
  el.innerText = `Unknown component ${JSON.stringify(component)}`;
  return el;
}

export function initView(componentId: ComponentName): HTMLElement {
  return initComponent(
    (ComponentsData as Record<ComponentName, Component>)[componentId]
  );
}
