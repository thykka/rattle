import { useGameView } from '../../hooks/useGameView.js';
import { Name } from '../../../components/Name.js';
import { Money } from '../../../components/Money.js';
import { Flex } from '../Flex/Flex.js';

export function PlayerStats() {
  const [[_player, components]] = useGameView(Name, Money);
  const name = components.get(Name).text;
  const money = components.get(Money).value;
  return (
    <Flex horizontal>
      <Flex pad fit type="h2">
        {name}
      </Flex>
      <Flex center type="span">
        money: {money}
      </Flex>
    </Flex>
  );
}
