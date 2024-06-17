# Vend

## Outline

Simulation Idle Management game

### Player

- Player represents the user's assets in the game world
- Player has an Account of Money
- Player has a Portfolio of Contracts
- Player has a Reserve of Machines
- Player has an Inventory of Products
- Player has Modifiers, which may alter properties in a global fashion

### Locations

- Locations are spots into which Player can Deploy a Machine
- Locations have predefined stats (some hidden from UI?)

  - Traffic: How often does someone walk by the machine
  - Rent: How much Money does this Location cost per ?? (TODO: time units?)
  - Wealth: How much Money do people spend at this Location compared to others
  - Competition: Rival vending machines may eat into profits, if they provide similar Products

- Unlocking locations is the primary method of progression
- Late-game location stats are improved by orders of magnitude

#### Contracts

- Contracts allow access to Locations in exchange for Money and/or Rent
- Contracts

#### (Vending) Machines

-
- Machines have different amounts of Slots

##### Slots

- Products are Placed into and Sold from Slots
- Each Slot can contain a Product
