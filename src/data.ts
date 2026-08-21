export type CommonData = {
  id: string;
  title: string;
  // iconImage?: unknown;
  // image?: unknown;
};

export class StateData<D extends CommonData = CommonData> {
  dataId: string;
  data: null | D;

  constructor(dataId: string, data: D[]) {
    this.dataId = dataId;
    this.data = data.find((d) => d.id === dataId);
    if (!this.data) {
      console.warn('Could not find dataId', dataId);
    }
  }

  toJSON() {
    // strip data when serializing state
    return Object.assign({}, this, { data: null });
  }
}
