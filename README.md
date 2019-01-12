The `lootable` behavior allows you to specify one or more pools of items for an NPC to drop along with any currencies
and the range each will drop. Currencies are automatically given to the player, or distributed evently among party
members if the player is in a party. For items a "corpse" container item is generated and the items that are generated
from the loot pools will be placed inside. The corpse has a `decay` behavior which causes it to disappear after 3
minutes.

## Installation

Inside your ranvier project

```
npm run install-bundle https://github.com/RanvierMUD/lootable-npcs
```

## Configuration

Next you need to configure how the loot pools are loaded. The easiest is YAML. In `ranvier.json` add the following under
`entityLoaders`

```
"loot-pools": {
  "source": "Yaml",
  "config": {
    "path": "bundles/[BUNDLE]/areas/[AREA]/loot-pools.yml"
  }
}
```

> **Note**: `[BUNDLE]` and `[AREA]` are tokens used by the engine, do not replace them with an actual bundle or area name

This will set up the bundle to look for a `loot-pools.yml` file inside each area folder.

## Loot Pools

When configuring an NPC to drop loot in naddition to specific items to drop or you can specify one or more pools of loot
to drop from. This lets you do things like have a 'global' loot pool that every npc in the area can drop, or maybe an
NPC can drop any of a list of different potions.

Using the configuration above, next to the `npcs.yml` file for an area we'll create a `loot-pools.yml` file. This
example will be applicable to the NPC defined in the next section:

```yaml
---
# each pool has a name and lists the items in that pool and their % drop rate
potions:
  - "limbo:potionhealth1": 10
  - "limbo:potionstrength1": 5
junk:
  - "limbo:scraps": 50
```

## Usage

To make an NPC drop loot give it the `lootable` behavior and configure it like so:

```yaml
- id: trainingdummy
  name: "Training Dummy"
  # ...
  behaviors:
    lootable:
      # currencies is a list of currencies this npc can possibly drop and the
      # amount range # the currency key is arbitrary so if you want a new
      # currency just add a new key # the key must be formatted_like_this
      # though, for rendering/saving purposes
      currencies:
        gold:
          min: 10
          max: 20
      # each pool specified can be the name of a pool defined in one of the
      # loot-pools.yml files or a specific `item entityReference: percentage` pair
      pools:
        - "limbo:junk"
        - "limbo:potions"
        - "limbo:sliceofcheese": 25
```

## Triggering

When an NPC uses the `lootable` behavior loot will be generated on the `killed`
event. This is not a core event so you can emit this any time you want. For
example, the `bundle-example-combat` bundle emits `killed` when an NPC's
`health` attribute is `damaged` and it is `<= 0`. But this may be different for
your game.
