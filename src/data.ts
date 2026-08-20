export type CommonData = {
  id: string;
  title: string;
  // iconImage?: unknown;
  // image?: unknown;
};

export class StateData {
  dataId: string;
  data: null | CommonData;

  constructor(dataId: string, data) {
    this.dataId = dataId;
    this.data = data.find((d) => d.id === dataId);
  }

  toJSON() {
    // strip data when serializing state
    return Object.assign({}, this, { _data: null });
  }
}
