export type View = {
  name: string;
  component: React.ComponentType;
};

export type Views = Record<string, View>;

export type ViewId<T extends Views> = keyof T & string;

type ViewListProps<T extends Views> = {
  views: T;
  current: ViewId<T>;
  onChange: (viewId: ViewId<T>) => void;
  renderItem?: (args: {
    viewId: ViewId<T>;
    view: View;
    isActive: boolean;
    select: () => void;
  }) => React.ReactNode;
};

export function ViewList<T extends Views>({
  views,
  current,
  onChange,
  renderItem = ({ viewId }) => <li key={viewId}>{viewId}</li>,
}: ViewListProps<T>) {
  return (
    <>
      {Object.entries(views).map(([viewId, view]) =>
        renderItem({
          viewId,
          view,
          isActive: viewId === current,
          select: () => onChange(viewId),
        })
      )}
    </>
  );
}

type ViewPanelProps<T extends Views> = {
  views: T;
  viewId: ViewId<T>;
};

export function ViewPanel<T extends Views>({
  views,
  viewId,
}: ViewPanelProps<T>) {
  const { component: View } = views[viewId];
  return <View />;
}
